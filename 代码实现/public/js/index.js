///////////////////////////////////////////DB

var REST_DATA = 'api/favorites';
var KEY_ENTER = 13;
var defaultItems = [
  
];
var number=0;
var result;
var person=new Object();
function loadItems(){
  xhrGet(REST_DATA, function(data){
    
    //stop showing loading message
    stopLoadingMessage();
    
    var receivedItems = data || [];
    var items = [];
    var i;
    // Make sure the received items have correct format
    for(i = 0; i < receivedItems.length; ++i){
      var item = receivedItems[i];
      if(item && 'id' in item){
        items.push(item);
      }
    }
    var hasItems = items.length;
    if(!hasItems){
      items = defaultItems;
    }
    for(i = 0; i < items.length; ++i){
      addItem(items[i], !hasItems);
    }
    if(!hasItems){
      var table = document.getElementById('notes');
      var nodes = [];
      for(i = 0; i < table.rows.length; ++i){
        nodes.push(table.rows[i].firstChild.firstChild);
      }
      function save(){
        if(nodes.length){
          saveChange(nodes.shift(), save);
        }
      }
      save();
    }
  }, function(err){
    console.error(err);
  });
}

function startProgressIndicator(row)
{ 
  row.innerHTML="<td class='content'>Uploading file... <img height=\"50\" width=\"50\" src=\"images/loading.gif\"></img></td>"; 
}

function removeProgressIndicator(row)
{
  row.innerHTML="<td class='content'>uploaded...</td>";
}

function addNewRow(table)
{
  var newRow = document.createElement('tr');
  table.appendChild(newRow);
  return table.lastChild;
}

function uploadFile(node)
{
  
  var file = node.previousSibling.files[0];
  
  //if file not selected, throw error
  if(!file)
  {
    alert("File not selected for upload... \t\t\t\t \n\n - Choose a file to upload. \n - Then click on Upload button.");
    return;
  }
  
  var row = node.parentNode.parentNode;
  
  var form = new FormData();
  form.append("file", file);
  
  var id = row.getAttribute('data-id');
  
  var queryParams = "id=" + (id==null?-1:id);
  queryParams+= "&name="+row.firstChild.firstChild.value;
  queryParams+="&value="+row.firstChild.nextSibling.firstChild.firstChild.firstChild.firstChild.firstChild.value;
  
  
  var table = row.firstChild.nextSibling.firstChild;  
  var newRow = addNewRow(table);  
  
  startProgressIndicator(newRow);
  
  xhrAttach(REST_DATA+"/attach?"+queryParams, form, function(item){ 
    console.log('Item id - ' + item.id);
    console.log('attached: ', item);
    row.setAttribute('data-id', item.id);
    removeProgressIndicator(row);
    setRowContent(item, row);
  }, function(err){
    console.error(err);
  });
  
}
    
function setRowContent(item, row)
{
    var innerHTML = "<td class='content'><textarea id='nameText' onkeydown='onKey(event)'>"+item.name+"</textarea></td><td class='content'><table border=\"0\">"; 
    
    var valueTextArea = "<textarea id='valText' onkeydown='onKey(event)' placeholder=\"输入备注...\"></textarea>";    
    if(item.value)
    {
      valueTextArea="<textarea id='valText' onkeydown='onKey(event)'>"+item.value+"</textarea>";
    }
    
    innerHTML+="<tr border=\"0\" ><td class='content'>"+valueTextArea+"</td></tr>";
              
    
    var attachments = item.attachements;
    if(attachments && attachments.length>0)
    {
      
      for(var i = 0; i < attachments.length; ++i){
        var attachment = attachments[i];
        if(attachment.content_type.indexOf("image/")==0)
        {
          innerHTML+= "<tr border=\"0\" ><td class='content'>"+attachment.key+"<br><img width=\"200\" src=\""+attachment.url+"\" onclick='window.open(\""+attachment.url+"\")'></img></td></tr>" ;


        } else if(attachment.content_type.indexOf("audio/")==0)
        {
          innerHTML+= "<tr border=\"0\" ><td class='content'>"+attachment.key+"<br><AUDIO  height=\"50\" width=\"200\" src=\""+attachment.url+"\" controls></AUDIO></td></tr>" ;


        } else if(attachment.content_type.indexOf("video/")==0)
        {
          innerHTML+= "<tr border=\"0\" ><td class='content'>"+attachment.key+"<br><VIDEO  height=\"100\" width=\"200\" src=\""+attachment.url+"\" controls></VIDEO></td></tr>" ;


        } else if(attachment.content_type.indexOf("text/")==0 || attachment.content_type.indexOf("application/")==0)
        {
          innerHTML+= "<tr border=\"0\" ><td class='content'><a href=\""+attachment.url+"\" target=\"_blank\">"+attachment.key+"</a></td></tr>" ;

        } 
      } 
      
    }
    
    row.innerHTML = innerHTML+"</table>"+attachButton+"</td><td class = 'contentAction'><span class='deleteBtn' onclick='deleteItem(this)' title='delete me'></span></td>";
  
}

function addItem(item, isNew){

  var row = document.createElement('tr');
  row.className = "tableRows";
  var id = item && item.id;
  if(id){
    row.setAttribute('data-id', id);
  }

 
var script = 'http://coolshell.cn/asyncjs/alert.js';
loadjs(script);
  
  if(item) // if not a new row
  {
    setRowContent(item, row);
  }
  else //if new row
  {
        
    row.innerHTML = "<div class=\"item row\"><div class=\"col-md-2\"><img id=\"userImg\" src=\"images/user.png\"></div><div class=\"col-md-4 name\"><span><img id='user' src=\"images/admin.jpg\"></span><textarea id='nameText' class='form-control' onkeydown='onKey(event)' placeholder=\"输入姓名...\"></textarea><div id=\"star\"><ul><li><a href=\"javascript:;\">1</a></li><li><a href=\"javascript:;\">2</a></li><li><a href=\"javascript:;\">3</a></li><li><a href=\"javascript:;\">4</a></li><li><a href=\"javascript:;\">5</a></li></ul><span></span><p></p></div></div><div class=\"col-md-5\"><textarea id='valText' class='form-control' onkeydown='onKey(event)' placeholder=\"输入备注...\"></textarea></div><div class=\"col-md-1 tool\"><span class='deleteBtn' onclick='deleteItem(this)' title='delete me'><img src=\"images/delete.png\"></span><br><span class='commitBtn' onclick='saveChange(this)' title='load me'><img  src=\"images/save.jpg\" style=\"margin-top: 10px;\"></span></div></div>"
  }

  function loadjs(view) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', '/js/view.js');
    script.setAttribute('id', 'coolshell_script_id');
 
    script_id = document.getElementById('coolshell_script_id');
    if(script_id){
        document.getElementsByTagName('head')[0].removeChild(script_id);
    }
    document.getElementsByTagName('head')[0].appendChild(script);
}

  var table = document.getElementById('notes');
  table.lastChild.appendChild(row);
  row.isNew = !item || isNew;
  
  if(row.isNew)
  {
    var textarea = row.firstChild.firstChild;
    //alert(textarea);
    textarea.focus();
  }
  
}

function deleteItem(deleteBtnNode){
  var row = deleteBtnNode.parentNode.parentNode;
  row.remove();
  if(row.getAttribute('data-id'))
  {
    xhrDelete(REST_DATA + '?id=' + row.getAttribute('data-id'), function(){
      row.remove();
    }, function(err){
      console.error(err);
    });
  } 
}


function onKey(evt){
  
  if(evt.keyCode == KEY_ENTER && !evt.shiftKey){
    
    evt.stopPropagation();
    evt.preventDefault();
    var nameV, valueV;
    var row ;     
    
    if(evt.target.id=="nameText")
    {
      row = evt.target.parentNode.parentNode;
      nameV = evt.target.value;
      valueV = row.firstChild.nextSibling.firstChild.firstChild.firstChild.firstChild.firstChild.value ;
      //alert(valueV,nameV)
      
    }
    else
    {
      row = evt.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
      nameV = row.firstChild.firstChild.value;
      valueV = evt.target.value;
    }
    
    var data = {
        name: nameV,
        value: valueV
      };      
    
      if(row.isNew){
        delete row.isNew;
        xhrPost(REST_DATA, data, function(item){
          row.setAttribute('data-id', item.id);
        }, function(err){
          console.error(err);
        });
      }else{
        data.id = row.getAttribute('data-id');
        xhrPut(REST_DATA, data, function(){
          console.log('updated: ', data);
        }, function(err){
          console.error(err);
        });
      }
    
  
    if(row.nextSibling){
      row.nextSibling.firstChild.firstChild.focus();
    }else{
      addItem();
    }
  }
}

function saveChange(contentNode, callback){
  var row = contentNode.parentNode.parentNode;
  //alert(row.innerHTML);

//  alert(result);

  var data = {
    name: row.firstChild.nextSibling.firstChild.nextSibling.value,
	  value: row.firstChild.nextSibling.nextSibling.firstChild.value
    //resultPerson: result 
  };

/*  alert(data.name);
  alert(data.value);*/
  
  if(row.isNew){
    delete row.isNew;
    xhrPost(REST_DATA, data, function(item){
      row.setAttribute('data-id', item.id);
      callback && callback();
    }, function(err){
      console.error(err);
    });
  }else{
    data.id = row.getAttribute('data-id');
    xhrPut(REST_DATA, data, function(){
      console.log('updated: ', data);
    }, function(err){
      console.error(err);
    });
  }
}

function toggleServiceInfo(){
  var node = document.getElementById('vcapservices');
  node.style.display = node.style.display == 'none' ? '' : 'none';
}

function toggleAppInfo(){
  var node = document.getElementById('appinfo');
  node.style.display = node.style.display == 'none' ? '' : 'none';
}


function showLoadingMessage()
{
  document.getElementById('loadingImage').innerHTML = "Loading data "+"<img height=\"100\" width=\"100\" src=\"images/loading.gif\"></img>";
}
function stopLoadingMessage()
{
  document.getElementById('loadingImage').innerHTML = "";
}

showLoadingMessage();
//updateServiceInfo();
//loadItems();
/////////////////////////////////////////////PERSONALITY
 var widgetId = 'vizcontainer', // Must match the ID in index.jade
    widgetWidth = 600, widgetHeight = 700, // Default width and height
    personImageUrl = 'images/app.png', // Can be blank
    language = 'en'; // language selection
	
	var demo = {
		getTooltip : undefined // Loaded later
	};
  i18nProvider.getJson('json', 'tooltipdata',
    function(tooltipdata) {
      demo.getTooltip = i18nTranslatorFactory.createTranslator(tooltipdata);
    }
  );
var $results   = $('.results'),
    $error     = $('.error'),
    $loading   = $('.loading'),
    $traits    = $('.traits')
   /**
   * Displays the traits received from the
   * Personality Insights API in a table,
   * just trait names and values.
   */
  function showTraits(data) {
    console.log('showTraits()');
    $traits.show();

    var traitList = flatten(data.tree),
      table = $traits;

    table.empty();

    // Header
    $('#header-template').clone().appendTo(table);

    // For each trait
    for (var i = 0; i < traitList.length; i++) {
      var elem = traitList[i];

      var Klass = 'row';
      Klass += (elem.title) ? ' model_title' : ' model_trait';
      Klass += (elem.value === '') ? ' model_name' : '';

      if (elem.value !== '') { // Trait child name
        $('#trait-template').clone()
          .attr('class', Klass)
          .find('.tname')
          .find('span').html(elem.id).end()
          .end()
          .find('.tvalue')
            .find('span').html(elem.value === '' ?  '' : elem.value)
            .end()
          .end()
          .appendTo(table);
      } else {
        // Model name
        $('#model-template').clone()
          .attr('class', Klass)
          .find('.col-lg-12')
          .find('span').html(elem.id).end()
          .end()
          .appendTo(table);
      }
    }
  }
   /**
   * Returns a 'flattened' version of the traits tree, to display it as a list
   * @return array of {id:string, title:boolean, value:string} objects
   */
  function flatten( /*object*/ tree) {
    var arr = [],
      f = function(t, level) {
        if (!t) return;
        if (level > 0 && (!t.children || level !== 2)) {
          arr.push({
            'id': t.name,
            'title': t.children ? true : false,
            'value': (typeof (t.percentage) !== 'undefined') ? Math.floor(t.percentage * 100) + '%' : '',
            'sampling_error': (typeof (t.sampling_error) !== 'undefined') ? Math.floor(t.sampling_error * 100) + '%' : ''
          });
        }
        if (t.children && t.id !== 'sbh') {
          for (var i = 0; i < t.children.length; i++) {
            f(t.children[i], level + 1);
          }
        }
      };
    f(tree, 0);
    return arr;
  }
  
  /**
 * Renders the sunburst visualization. The parameter is the tree as returned
 * from the Personality Insights JSON API.
 * It uses the arguments widgetId, widgetWidth, widgetHeight and personImageUrl
 * declared on top of this .
 */
function showVizualization(theProfile) {
  console.log('showVizualization()');

  $('#' + widgetId).empty();
  var d3vis = d3.select('#' + widgetId)
      .append('svg:svg'),
    tooltip = {
      element : d3.select('body')
        .append('div')
        .classed('tooltip', true),
      target: undefined
    };
  var widget = {
    d3vis: d3vis,
    tooltip: tooltip,
    data: theProfile,
    loadingDiv: 'dummy',
    switchState: function() {
      console.log('[switchState]');
    },
    _layout: function() {
      console.log('[_layout]');
    },
    showTooltip: function(d, context, d3event) {
      if (d.id) {
        this.tooltip.target = d3event.currentTarget;
        console.debug('[showTooltip]');
        var
          tooltip = demo.getTooltip(d.id.replace('_parent', '')),
          tooltipText = d.name + ' (' + d.category + '): ' + tooltip.msg;
        console.debug(tooltipText);
        this.tooltip.element
          .text(tooltipText)
          .classed('in', true);
      }

      d3event.stopPropagation();
    },
    updateTooltipPosition: function(d3event) {
      this.tooltip.element
        .style('top', (d3event.pageY - 16) + 'px')
        .style('left', (d3event.pageX - 16) + 'px');
      d3event.stopPropagation();
    },
    hideTooltip: function () {
      console.debug('[hideTooltip]');
      this.tooltip.element
        .classed('in', false)
      ;
    },
    id: 'SystemUWidget',
    COLOR_PALLETTE: ['#1b6ba2', '#488436', '#d52829', '#F53B0C', '#972a6b', '#8c564b', '#dddddd'],
    expandAll: function() {
      this.vis.selectAll('g').each(function() {
        var g = d3.select(this);
        if (g.datum().parent && // Isn't the root g object.
          g.datum().parent.parent && // Isn't the feature trait.
          g.datum().parent.parent.parent) { // Isn't the feature dominant trait.
          g.attr('visibility', 'visible');
        }
      });
    },
    collapseAll: function() {
      this.vis.selectAll('g').each(function() {
        var g = d3.select(this);
        if (g.datum().parent !== null && // Isn't the root g object.
          g.datum().parent.parent !== null && // Isn't the feature trait.
          g.datum().parent.parent.parent !== null) { // Isn't the feature dominant trait.
          g.attr('visibility', 'hidden');
        }
      });
    },
    addPersonImage: function(url) {
      if (!this.vis || !url) {
        return;
      }
      var icon_defs = this.vis.append('defs');
      var width = this.dimW,
        height = this.dimH;

      // The flower had a radius of 640 / 1.9 = 336.84 in the original, now is 3.2.
      var radius = Math.min(width, height) / 16.58; // For 640 / 1.9 -> r = 65
      var scaled_w = radius * 2.46; // r = 65 -> w = 160

      var id = 'user_icon_' + this.id;
      icon_defs.append('pattern')
        .attr('id', id)
        .attr('height', 1)
        .attr('width', 1)
        .attr('patternUnits', 'objectBoundingBox')
        .append('image')
        .attr('width', scaled_w)
        .attr('height', scaled_w)
        .attr('x', radius - scaled_w / 2) // r = 65 -> x = -25
        .attr('y', radius - scaled_w / 2)
        .attr('xlink:href', url)
        .attr('opacity', 1.0)
        .on('dblclick.zoom', null);
      this.vis.append('circle')
        .attr('r', radius)
        .attr('stroke-width', 0)
        .attr('fill', 'url(#' + id + ')');
    }
  };

  d3vis.on("mousemove", function () {
    if (d3.event.target.tagName != 'g') {
      widget.hideTooltip();
    }
  });

  widget.dimH = widgetHeight;
  widget.dimW = widgetWidth;
  widget.d3vis.attr('width', widget.dimW).attr('height', widget.dimH);
  widget.d3vis.attr('viewBox', '90 75 ' + widget.dimW + ', ' + widget.dimH);
  renderChart.call(widget);
  widget.expandAll.call(widget);
  if (personImageUrl)
    widget.addPersonImage.call(widget, personImageUrl);
}

/**
   * Construct a text representation for big5 traits crossing, facets and
   * values.
   */
  function showTextSummary(data) {
    console.log('showTextSummary()');
    var paragraphs = textSummary.assemble(data.tree);
    var div = $('.summary-div');
    $('.outputMessageFootnote').text(data.word_count_message ? '**' + data.word_count_message + '.' : '');
    div.empty();
    paragraphs.forEach(function(sentences) {
      $('<p></p>').text(sentences.join(' ')).appendTo(div);
    });
  }
///////////////////////////////personality
! function e(t, n, r) {
	function s(o, u) {
		if (!n[o]) {
			if (!t[o]) {
				var a = "function" == typeof require && require;
				if (!u && a) return a(o, !0);
				if (i) return i(o, !0);
				var f = new Error("Cannot find module '" + o + "'");
				throw f.code = "MODULE_NOT_FOUND", f
			}
			var l = n[o] = {
				exports: {}
			};
			t[o][0].call(l.exports, function(e) {
				var n = t[o][1][e];
				return s(n ? n : e)
			}, l, l.exports, e, t, n, r)
		}
		return n[o].exports
	}
	for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) s(r[o]);
	return s
}({
	1: [function(require, module) {
		"use strict";

		function Microphone(_options) {
			var options = _options || {};
			this.bufferSize = options.bufferSize || 8192, this.inputChannels = options.inputChannels || 1, this.outputChannels = options.outputChannels || 1, this.recording = !1, this.requestedAccess = !1, this.sampleRate = 16e3, this.bufferUnusedSamples = new Float32Array(0), navigator.getUserMedia || (navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)
		}
		var utils = require("./utils");
		Microphone.prototype.onPermissionRejected = function() {
			console.log("Microphone.onPermissionRejected()"), this.requestedAccess = !1, this.onError("Permission to access the microphone rejeted.")
		}, Microphone.prototype.onError = function(error) {
			console.log("Microphone.onError():", error)
		}, Microphone.prototype.onMediaStream = function(stream) {
			var AudioCtx = window.AudioContext || window.webkitAudioContext;
			if (!AudioCtx) throw new Error("AudioContext not available");
			this.audioContext || (this.audioContext = new AudioCtx);
			var gain = this.audioContext.createGain(),
				audioInput = this.audioContext.createMediaStreamSource(stream);
			audioInput.connect(gain), this.mic = this.audioContext.createScriptProcessor(this.bufferSize, this.inputChannels, this.outputChannels), console.log("Microphone.onMediaStream(): sampling rate is:", this.sampleRate), this.mic.onaudioprocess = this._onaudioprocess.bind(this), this.stream = stream, gain.connect(this.mic), this.mic.connect(this.audioContext.destination), this.recording = !0, this.requestedAccess = !1, this.onStartRecording()
		}, Microphone.prototype._onaudioprocess = function(data) {
			if (this.recording) {
				var chan = data.inputBuffer.getChannelData(0);
				this.onAudio(this._exportDataBufferTo16Khz(new Float32Array(chan)))
			}
		}, Microphone.prototype.record = function() {
			return navigator.getUserMedia ? void(this.requestedAccess || (this.requestedAccess = !0, navigator.getUserMedia({
				audio: !0
			}, this.onMediaStream.bind(this), this.onPermissionRejected.bind(this)))) : void this.onError("Browser doesn't support microphone input")
		}, Microphone.prototype.stop = function() {
			this.recording && (this.recording = !1, this.stream.getTracks()[0].stop(), this.requestedAccess = !1, this.mic.disconnect(0), this.mic = null, this.onStopRecording())
		}, Microphone.prototype._exportDataBufferTo16Khz = function(bufferNewSamples) {
			var buffer = null,
				newSamples = bufferNewSamples.length,
				unusedSamples = this.bufferUnusedSamples.length;
			if (unusedSamples > 0) {
				buffer = new Float32Array(unusedSamples + newSamples);
				for (var i = 0; unusedSamples > i; ++i) buffer[i] = this.bufferUnusedSamples[i];
				for (i = 0; newSamples > i; ++i) buffer[unusedSamples + i] = bufferNewSamples[i]
			} else buffer = bufferNewSamples;
			for (var filter = [-.037935, -89024e-8, .040173, .019989, .0047792, -.058675, -.056487, -.0040653, .14527, .26927, .33913, .26927, .14527, -.0040653, -.056487, -.058675, .0047792, .019989, .040173, -89024e-8, -.037935], samplingRateRatio = this.audioContext.sampleRate / 16e3, nOutputSamples = Math.floor((buffer.length - filter.length) / samplingRateRatio) + 1, pcmEncodedBuffer16k = new ArrayBuffer(2 * nOutputSamples), dataView16k = new DataView(pcmEncodedBuffer16k), index = 0, volume = 32767, nOut = 0, i = 0; i + filter.length - 1 < buffer.length; i = Math.round(samplingRateRatio * nOut)) {
				for (var sample = 0, j = 0; j < filter.length; ++j) sample += buffer[i + j] * filter[j];
				sample *= volume, dataView16k.setInt16(index, sample, !0), index += 2, nOut++
			}
			var indexSampleAfterLastUsed = Math.round(samplingRateRatio * nOut),
				remaining = buffer.length - indexSampleAfterLastUsed;
			if (remaining > 0)
				for (this.bufferUnusedSamples = new Float32Array(remaining), i = 0; remaining > i; ++i) this.bufferUnusedSamples[i] = buffer[indexSampleAfterLastUsed + i];
			else this.bufferUnusedSamples = new Float32Array(0);
			return new Blob([dataView16k], {
				type: "audio/l16"
			})
		};
		Microphone.prototype._exportDataBuffer = function(buffer) {
			utils.exportDataBuffer(buffer, this.bufferSize)
		}, Microphone.prototype.onStartRecording = function() {}, Microphone.prototype.onStopRecording = function() {}, Microphone.prototype.onAudio = function() {}, module.exports = Microphone
	}, {
		"./utils": 8
	}],
	2: [function(require, module) {
		module.exports = {
			models: [{
				url: "https://stream.watsonplatform.net/speech-to-text/api/v1/models/en-US_BroadbandModel",
				rate: 16e3,
				name: "en-US_BroadbandModel",
				language: "en-US",
				description: "US English broadband model (16KHz)"
			}, {
				url: "https://stream.watsonplatform.net/speech-to-text/api/v1/models/en-US_NarrowbandModel",
				rate: 8e3,
				name: "en-US_NarrowbandModel",
				language: "en-US",
				description: "US English narrowband model (8KHz)"
			}, {
				url: "https://stream.watsonplatform.net/speech-to-text/api/v1/models/es-ES_BroadbandModel",
				rate: 16e3,
				name: "es-ES_BroadbandModel",
				language: "es-ES",
				description: "Spanish broadband model (16KHz)"
			}, {
				url: "https://stream.watsonplatform.net/speech-to-text/api/v1/models/es-ES_NarrowbandModel",
				rate: 8e3,
				name: "es-ES_NarrowbandModel",
				language: "es-ES",
				description: "Spanish narrowband model (8KHz)"
			}, {
				url: "https://stream.watsonplatform.net/speech-to-text/api/v1/models/pt-BR_BroadbandModel",
				rate: 16e3,
				name: "pt-BR_BroadbandModel",
				language: "pt-BR",
				description: "Brazilian Portuguese broadband model (16KHz)"
			}, {
				url: "https://stream.watsonplatform.net/speech-to-text/api/v1/models/pt-BR_NarrowbandModel",
				rate: 8e3,
				name: "pt-BR_NarrowbandModel",
				language: "pt-BR",
				description: "Brazilian Portuguese narrowband model (8KHz)"
			}, {
				url: "https://stream.watsonplatform.net/speech-to-text/api/v1/models/zh-CN_BroadbandModel",
				rate: 16e3,
				name: "zh-CN_BroadbandModel",
				language: "zh-CN",
				description: "Mandarin broadband model (16KHz)"
			}, {
				url: "https://stream.watsonplatform.net/speech-to-text/api/v1/models/zh-CN_NarrowbandModel",
				rate: 8e3,
				name: "zh-CN_NarrowbandModel",
				language: "zh-CN",
				description: "Mandarin narrowband model (8KHz)"
			}]
		}
	}, {}],
	3: [function(require, module, exports) {
		"use strict";
		var display = require("./views/displaymetadata"),
			initSocket = require("./socket").initSocket;
		exports.handleFileUpload = function(type, token, model, file, contentType, callback, onend) {
			function onOpen() {
				console.log("Socket opened")
			}

			function onListening(socket) {
				console.log("Socket listening"), callback(socket)
			}

			function onMessage(msg) {
				msg.results && (baseString = display.showResult(msg, baseString, model), baseJSON = display.showJSON(msg, baseJSON))
			}

			function onError(evt) {
				localStorage.setItem("currentlyDisplaying", "false"), onend(evt), console.log("Socket err: ", evt.code)
			}

			function onClose(evt) {
				localStorage.setItem("currentlyDisplaying", "false"), onend(evt), console.log("Socket closing: ", evt)
			}
			localStorage.setItem("currentlyDisplaying", type), $.subscribe("progress", function(evt, data) {
				console.log("progress: ", data)
			}), console.log("contentType", contentType);
			var baseString = "",
				baseJSON = "";
			$.subscribe("showjson", function() {
				var $resultsJSON = $("#resultsJSON");
				$resultsJSON.empty(), $resultsJSON.append(baseJSON)
			});
			var options = {};
			options.token = token, options.message = {
				action: "start",
				"content-type": contentType,
				interim_results: !0,
				continuous: !0,
				word_confidence: !0,
				timestamps: !0,
				max_alternatives: 3,
				inactivity_timeout: 600
			}, options.model = model, initSocket(options, onOpen, onListening, onMessage, onError, onClose)
		}
	}, {
		"./socket": 7,
		"./views/displaymetadata": 10
	}],
	4: [function(require, module, exports) {
		"use strict";
		var initSocket = require("./socket").initSocket,
			display = require("./views/displaymetadata");
		exports.handleMicrophone = function(token, model, mic, callback) {
			function onOpen(socket) {
				console.log("Mic socket: opened"), callback(null, socket)
			}

			function onListening(socket) {
				mic.onAudio = function(blob) {
					socket.readyState < 2 && socket.send(blob)
				}
			}

			function onMessage(msg) {
				msg.results && (baseString = display.showResult(msg, baseString, model), baseJSON = display.showJSON(msg, baseJSON))
			}

			function onError() {
				console.log("Mic socket err: ", err)
			}

			function onClose(evt) {
				console.log("Mic socket close: ", evt)
				

        var txt = document.getElementById('resultsText').value;
				//alert(222222);
				 // check if the captcha is active and the user complete it
    //var recaptcha = grecaptcha.getResponse();

    // reset the captcha
    //grecaptcha.reset();
				$loading.show();
				//$captcha.hide();
				$error.hide();
				$traits.hide();
				$results.hide();
				
				 $.ajax({
					type: 'POST',
					data: {
							//recaptcha: recaptcha,
					text: txt,/*"It is really my honor to have this opportunity for an interview,"+
　　"I hope i can make a good performance today. I\m confident that I can succeed."+
　　"Now i will introduce myself briefly"+
　　"I am 26 years old,born in shandong province ."+
　　"I was graduated from qingdao university. my major is electronic.and i got my bachelor degree after my graduation in the year of 20xx."+
　　"I spend most of my time on study,i have passed CET4/6 . and i have acquired basic knowledge of my major during my school time."+
　　"In July 20xx, I began work for a small private company as a technical support engineer in QingDao city.Because I\m capable of more responsibilities, so I decided to change my job."+
　　"And in August 2004,I left QingDao to BeiJing and worked for a foreign enterprise as a automation software test engineer.Because I want to change my working environment, I\d like to find a job which is more challenging. Morover Motorola is a global company, so I feel I can gain the most from working in this kind of company ennvironment. That is the reason why I come here to compete for this position."+
　　"I think I\m a good team player and I\m a person of great honesty to others. Also I am able to work under great pressure."+
　　"That’s all. Thank you for giving me the chance.",*/
							language: 'en'
						},
					  url: '/personality',
					  dataType: 'json',
					  success: function(response) {
					result=response;
	$loading.hide();
						if (response.error) {
						   alert("error");
						} else {
              $('#introNew').hide();
							$results.show();
							//showTraits(response);
							showVizualization(response);
							showTextSummary(response);
						   //alert("success");
						}

					  },
					  error: function(xhr) {
						

						var error;
						try {
						  error = JSON.parse(xhr.responseText || {});
						} catch(e) {}

						if (xhr && xhr.status === 429){
						} else {
						 
						}

					   
					  }
					});
					//alert(111111);
 
			}
			if (model.indexOf("Narrowband") > -1) {
				var err = new Error("Microphone transcription cannot accomodate narrowband models, please select another");
				return callback(err, null), !1
			}
			$.publish("clearscreen");
			var baseString = "",
				baseJSON = "";
			$.subscribe("showjson", function() {
				var $resultsJSON = $("#resultsJSON");
				$resultsJSON.empty(), $resultsJSON.append(baseJSON)
			});
			var options = {};
			options.token = token, options.message = {
				action: "start",
				"content-type": "audio/l16;rate=16000",
				interim_results: !0,
				continuous: !0,
				word_confidence: !0,
				timestamps: !0,
				max_alternatives: 3,
				inactivity_timeout: 600
			}, options.model = model, initSocket(options, onOpen, onListening, onMessage, onError, onClose)
		}
	}, {
		"./socket": 7,
		"./views/displaymetadata": 10
	}],
	5: [function(require) {
		"use strict";
		var models = require("./data/models.json").models,
			utils = require("./utils");
		utils.initPubSub();
		var initViews = require("./views").initViews,
			showerror = require("./views/showerror"),
			showError = showerror.showError,
			getModels = require("./models").getModels;
		window.BUFFERSIZE = 8192, $(document).ready(function() {
			var tokenGenerator = utils.createTokenGenerator();
			tokenGenerator.getToken(function(err, token) {
				window.onbeforeunload = function() {
					localStorage.clear()
				}, token || (console.error("No authorization token available"), console.error("Attempting to reconnect..."), showError(err && err.code ? "Server error " + err.code + ": " + err.error : "Server error " + err.code + ": please refresh your browser and try again"));
				var viewContext = {
					currentModel: "en-US_BroadbandModel",
					models: models,
					token: token,
					bufferSize: BUFFERSIZE
				};
				initViews(viewContext), localStorage.setItem("models", JSON.stringify(models)), localStorage.setItem("currentModel", "en-US_BroadbandModel"), localStorage.setItem("sessionPermissions", "true"), getModels(token), $.subscribe("clearscreen", function() {
					$("#resultsText").text(""), $("#resultsJSON").text(""), $(".error-row").hide(), $(".notification-row").hide(), $(".hypotheses > ul").empty(), $("#metadataTableBody").empty()
				})
			})
		})
	}, {
		"./data/models.json": 2,
		"./models": 6,
		"./utils": 8,
		"./views": 14,
		"./views/showerror": 19
	}],
	6: [function(require, module, exports) {
		"use strict";
		exports.getModels = function(token) {
			var modelUrl = "https://stream.watsonplatform.net/speech-to-text/api/v1/models",
				sttRequest = new XMLHttpRequest;
			sttRequest.open("GET", modelUrl, !0), sttRequest.withCredentials = !0, sttRequest.setRequestHeader("Accept", "application/json"), sttRequest.setRequestHeader("X-Watson-Authorization-Token", token), sttRequest.onload = function() {
				var response = JSON.parse(sttRequest.responseText),
					sorted = response.models.sort(function(a, b) {
						return a.name > b.name ? 1 : a.name < b.name ? -1 : 0
					});
				response.models = sorted, localStorage.setItem("models", JSON.stringify(response.models));
				var viewContext1 = {
					currentModel: "en-US_BroadbandModel",
					models: response.models,
					token: token,
					bufferSize: BUFFERSIZE
				};
				require("./views/selectmodel").initSelectModel(viewContext1)
			}, sttRequest.send()
		}
	}, {
		"./views/selectmodel": 17
	}],
	7: [function(require, module, exports) {
		"use strict";
		var utils = require("./utils"),
			showerror = require("./views/showerror"),
			showError = showerror.showError,
			tokenGenerator = utils.createTokenGenerator(),
			initSocket = exports.initSocket = function(options, onopen, onlistening, onmessage, onerror, onclose) {
				function withDefault(val, defaultVal) {
					return "undefined" == typeof val ? defaultVal : val
				}
				var listening, socket, token = options.token,
					model = options.model || localStorage.getItem("currentModel"),
					message = options.message || {
						action: "start"
					},
					sessionPermissions = withDefault(options.sessionPermissions, JSON.parse(localStorage.getItem("sessionPermissions"))),
					sessionPermissionsQueryParam = sessionPermissions ? "0" : "1",
					url = options.serviceURI || "wss://stream.watsonplatform.net/speech-to-text/api/v1/recognize?watson-token=";
				url += token + "&X-WDC-PL-OPT-OUT=" + sessionPermissionsQueryParam + "&model=" + model, console.log("URL model", model);
				try {
					socket = new WebSocket(url)
				} catch (err) {
					console.error("WS connection error: ", err)
				}
				socket.onopen = function() {
					listening = !1, $.subscribe("hardsocketstop", function() {
						console.log("MICROPHONE: close."), socket.send(JSON.stringify({
							action: "stop"
						})), socket.close()
					}), $.subscribe("socketstop", function() {
						console.log("MICROPHONE: close."), socket.close()
					}), socket.send(JSON.stringify(message)), onopen(socket)
				}, socket.onmessage = function(evt) {
					var msg = JSON.parse(evt.data);
					return msg.error ? (showError(msg.error), void $.publish("hardsocketstop")) : ("listening" === msg.state && (listening ? (console.log("MICROPHONE: Closing socket."), socket.close()) : (onlistening(socket), listening = !0)), void onmessage(msg, socket))
				}, socket.onerror = function(evt) {
					console.log("WS onerror: ", evt), showError("Application error " + evt.code + ": please refresh your browser and try again"), $.publish("clearscreen"), onerror(evt)
				}, socket.onclose = function(evt) {
					if (console.log("WS onclose: ", evt), 1006 === evt.code) {
						if (console.log("generator count", tokenGenerator.getCount()), tokenGenerator.getCount() > 1) throw $.publish("hardsocketstop"), new Error("No authorization token is currently available");
						return tokenGenerator.getToken(function(err, token) {
							return err ? ($.publish("hardsocketstop"), !1) : (console.log("Fetching additional token..."), options.token = token, void initSocket(options, onopen, onlistening, onmessage, onerror, onclose))
						}), !1
					}
					return 1011 === evt.code ? (console.error("Server error " + evt.code + ": please refresh your browser and try again"), !1) : evt.code > 1e3 ? (console.error("Server error " + evt.code + ": please refresh your browser and try again"), !1) : ($.unsubscribe("hardsocketstop"), $.unsubscribe("socketstop"), void onclose(evt))
				}
			}
	}, {
		"./utils": 8,
		"./views/showerror": 19
	}],
	8: [function(require, module, exports) {
		(function(global) {
			"use strict";
			var $ = "undefined" != typeof window ? window.jQuery : "undefined" != typeof global ? global.jQuery : null,
				fileBlock = function(_offset, length, _file, readChunk) {
					var r = new FileReader,
						blob = _file.slice(_offset, length + _offset);
					r.onload = readChunk, r.readAsArrayBuffer(blob)
				};
			exports.onFileProgress = function(options, ondata, running, onerror, onend, samplingRate) {
				var file = options.file,
					fileSize = file.size,
					chunkSize = options.bufferSize || 16e3,
					offset = 0,
					readChunk = function(evt) {
						if (offset >= fileSize) return console.log("Done reading file"), void onend();
						if (running()) {
							if (null != evt.target.error) {
								var errorMessage = evt.target.error;
								return console.log("Read error: " + errorMessage), void onerror(errorMessage)
							}
							var buffer = evt.target.result,
								len = buffer.byteLength;
							offset += len, ondata(buffer), samplingRate ? setTimeout(function() {
								fileBlock(offset, chunkSize, file, readChunk)
							}, 1e3 * chunkSize / (2 * samplingRate)) : fileBlock(offset, chunkSize, file, readChunk)
						}
					};
				fileBlock(offset, chunkSize, file, readChunk)
			}, exports.createTokenGenerator = function() {
				var hasBeenRunTimes = 0;
				return {
					getToken: function(callback) {
						if (++hasBeenRunTimes, hasBeenRunTimes > 5) {
							var err = new Error("Cannot reach server");
							return void callback(null, err)
						}
						var url = "/api/token",
							tokenRequest = new XMLHttpRequest;
						tokenRequest.open("POST", url, !0), tokenRequest.setRequestHeader("csrf-token", $('meta[name="ct"]').attr("content")), tokenRequest.onreadystatechange = function() {
							if (4 === tokenRequest.readyState)
								if (200 === tokenRequest.status) {
									var token = tokenRequest.responseText;
									callback(null, token)
								} else {
									var error = "Cannot reach server";
									if (tokenRequest.responseText) try {
										error = JSON.parse(tokenRequest.responseText)
									} catch (e) {
										error = tokenRequest.responseText
									}
									callback(error)
								}
						}, tokenRequest.send()
					},
					getCount: function() {
						return hasBeenRunTimes
					}
				}
			}, exports.initPubSub = function() {
				var o = $({});
				$.subscribe = o.on.bind(o), $.unsubscribe = o.off.bind(o), $.publish = o.trigger.bind(o)
			}
		}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
	}, {}],
	9: [function(require, module, exports) {
		"use strict";
		exports.initAnimatePanel = function() {
			$(".panel-heading span.clickable").on("click", function() {
				$(this).hasClass("panel-collapsed") ? ($(this).parents(".panel").find(".panel-body").slideDown(), $(this).removeClass("panel-collapsed"), $(this).find("i").removeClass("caret-down").addClass("caret-up")) : ($(this).parents(".panel").find(".panel-body").slideUp(), $(this).addClass("panel-collapsed"), $(this).find("i").removeClass("caret-up").addClass("caret-down"))
			})
		}
	}, {}],
	10: [function(require, module, exports) {
		"use strict";

		function updateTextScroll() {
			if (!scrolled) {
				var element = $("#resultsText").get(0);
				element.scrollTop = element.scrollHeight
			}
		}

		function updateScroll() {
			if (!scrolled) {
				var element = $(".table-scroll").get(0);
				element.scrollTop = element.scrollHeight
			}
		}
		var scrolled = !1,
			textScrolled = !1,
			showTimestamp = function(timestamps, confidences) {
				var word = timestamps[0],
					t0 = timestamps[1],
					t1 = timestamps[2],
					displayConfidence = confidences ? confidences[1].toString().substring(0, 3) : "n/a";
				$("#metadataTable > tbody:last-child").append("<tr><td>" + word + "</td><td>" + t0 + "</td><td>" + t1 + "</td><td>" + displayConfidence + "</td></tr>")
			},
			showMetaData = function(alternative) {
				var confidenceNestedArray = alternative.word_confidence,
					timestampNestedArray = alternative.timestamps;
				if (confidenceNestedArray && confidenceNestedArray.length > 0)
					for (var i = 0; i < confidenceNestedArray.length; i++) {
						var timestamps = timestampNestedArray[i],
							confidences = confidenceNestedArray[i];
						showTimestamp(timestamps, confidences)
					} else timestampNestedArray && timestampNestedArray.length > 0 && timestampNestedArray.forEach(function(timestamp) {
						showTimestamp(timestamp)
					})
			},
			Alternatives = function() {
				var stringOne = "",
					stringTwo = "",
					stringThree = "";
				this.clearString = function() {
					stringOne = "", stringTwo = "", stringThree = ""
				}, this.showAlternatives = function(alternatives) {
					var $hypotheses = $(".hypotheses ol");
					$hypotheses.empty(), alternatives.forEach(function(alternative, idx) {
						var $alternative;
						if (alternative.transcript) {
							var transcript = alternative.transcript.replace(/%HESITATION\s/g, "");
							switch (transcript = transcript.replace(/(.)\1{2,}/g, ""), idx) {
								case 0:
									stringOne += transcript, $alternative = $("<li data-hypothesis-index=" + idx + " >" + stringOne + "</li>");
									break;
								case 1:
									stringTwo += transcript, $alternative = $("<li data-hypothesis-index=" + idx + " >" + stringTwo + "</li>");
									break;
								case 2:
									stringThree += transcript, $alternative = $("<li data-hypothesis-index=" + idx + " >" + stringThree + "</li>")
							}
							$hypotheses.append($alternative)
						}
					})
				}
			},
			alternativePrototype = new Alternatives;
		exports.showJSON = function(msg, baseJSON) {
			var json = JSON.stringify(msg, null, 2);
			return baseJSON += json, baseJSON += "\n", "JSON" === $(".nav-tabs .active").text() && ($("#resultsJSON").append(baseJSON), baseJSON = "", console.log("updating json")), baseJSON
		};

		var Buffer = 'start:';
		var initTextScroll = function() {
				$("#resultsText").on("scroll", function() {
					textScrolled = !0
				})
			},
			initScroll = function() {
				$(".table-scroll").on("scroll", function() {
					scrolled = !0
				})
			};
		exports.initDisplayMetadata = function() {
			initScroll(), initTextScroll()
		}, exports.showResult = function(msg, baseString) {
				if (msg.results && msg.results.length > 0) {
					var alternatives = msg.results[0].alternatives,
						text = msg.results[0].alternatives[0].transcript || "";
					if (text = text.replace(/%HESITATION\s/g, ""), text = text.replace(/(.)\1{2,}/g, ""), msg.results[0]["final"] && console.log("-> " + text), text = text.replace(/D_[^\s]+/g, ""), 0 === text.length || /^\s+$/.test(text)) return baseString;
					msg.results && msg.results[0] && msg.results[0]["final"] ? (text = text.slice(0, -1), text = text.charAt(0).toUpperCase() + text.substring(1), text = text.trim() + ". ", baseString += text, $("#resultsText").val(baseString), showMetaData(alternatives[0]), alternativePrototype.showAlternatives(alternatives)) : (text = text.charAt(0).toUpperCase() + text.substring(1), $("#resultsText").val(baseString + text))
				}
				/*Buffer = Buffer + text;
				alert(Buffer);*/
			return updateScroll(), updateTextScroll(), baseString
		},/*exports.saveBuffer = function(text){
			var Buffer = Buffer + text;
			alert(Buffer);
		},*/$.subscribe("clearscreen", function() {
			var $hypotheses = $(".hypotheses ul");
			scrolled = !1, $hypotheses.empty(), alternativePrototype.clearString()
		})
	}, {}],
	11: [function(require, module, exports) {
		"use strict";
		var handleSelectedFile = require("./fileupload").handleSelectedFile;
		exports.initDragDrop = function(ctx) {
			function handleFileUploadEvent(evt) {
				var file = evt.dataTransfer.files[0];
				handleSelectedFile(ctx.token, file)
			}
			var dragAndDropTarget = $(document);
			dragAndDropTarget.on("dragenter", function(e) {
				e.stopPropagation(), e.preventDefault()
			}), dragAndDropTarget.on("dragover", function(e) {
				e.stopPropagation(), e.preventDefault()
			}), dragAndDropTarget.on("drop", function(e) {
				console.log("File dropped"), e.preventDefault();
				var evt = e.originalEvent;
				handleFileUploadEvent(evt)
			})
		}
	}, {
		"./fileupload": 13
	}],
	12: [function(require, module, exports) {
		"use strict";
		exports.flashSVG = function(el) {
			function loop() {
				el.animate({
					fill: "#A53725"
				}, 1e3, "linear").animate({
					fill: "white"
				}, 1e3, "linear")
			}
			el.css({
				fill: "#A53725"
			});
			var timer = setTimeout(loop, 2e3);
			return timer
		}, exports.stopFlashSVG = function(timer) {
			el.css({
				fill: "white"
			}), clearInterval(timer)
		}, exports.toggleImage = function(el, name) {
			el.attr("src") === "images/" + name + ".svg" ? el.attr("src", "images/recording.png") : el.attr("src", "images/recording.png")
		};
		var restoreImage = exports.restoreImage = function(el, name) {
			el.attr("src", "images/" + name + ".svg")
		};
		exports.stopToggleImage = function(timer, el, name) {
			clearInterval(timer), restoreImage(el, name)
		}
	}, {}],
	13: [function(require, module, exports) {
		"use strict";
		var showError = require("./showerror").showError,
			showNotice = require("./showerror").showNotice,
			handleFileUpload = require("../handlefileupload").handleFileUpload,
			effects = require("./effects"),
			utils = require("../utils"),
			handleSelectedFile = exports.handleSelectedFile = function() {
				var running = !1;
				return localStorage.setItem("currentlyDisplaying", "false"),
					function(token, file) {
						function restoreUploadTab() {
							clearInterval(timer), effects.restoreImage(uploadImageTag, "upload"), uploadText.text("Select File")
						}
						$.publish("clearscreen"), localStorage.setItem("currentlyDisplaying", "fileupload"), running = !0;
						var uploadImageTag = $("#fileUploadTarget > img"),
							timer = setInterval(effects.toggleImage, 750, uploadImageTag, "stop"),
							uploadText = $("#fileUploadTarget > span");
						uploadText.text("Stop Transcribing"), $.subscribe("hardsocketstop", function() {
							restoreUploadTab(), running = !1
						});
						var currentModel = localStorage.getItem("currentModel");
						console.log("currentModel", currentModel);
						var blobToText = new Blob([file]).slice(0, 4),
							r = new FileReader;
						r.readAsText(blobToText), r.onload = function() {
							var contentType;
							if ("fLaC" === r.result) contentType = "audio/flac", showNotice("Notice: browsers do not support playing FLAC audio, so no audio will accompany the transcription");
							else if ("RIFF" === r.result) {
								contentType = "audio/wav";
								var audio = new Audio,
									wavBlob = new Blob([file], {
										type: "audio/wav"
									}),
									wavURL = URL.createObjectURL(wavBlob);
								audio.src = wavURL, audio.play(), $.subscribe("hardsocketstop", function() {
									audio.pause(), audio.currentTime = 0
								})
							} else {
								if ("OggS" !== r.result) return restoreUploadTab(), showError("Only WAV or FLAC or Opus files can be transcribed, please try another file format"), void localStorage.setItem("currentlyDisplaying", "false");
								contentType = "audio/ogg; codecs=opus";
								var audio = new Audio,
									opusBlob = new Blob([file], {
										type: "audio/ogg; codecs=opus"
									}),
									opusURL = URL.createObjectURL(opusBlob);
								audio.src = opusURL, audio.play(), $.subscribe("hardsocketstop", function() {
									audio.pause(), audio.currentTime = 0
								})
							}
							handleFileUpload("fileupload", token, currentModel, file, contentType, function(socket) {
								var blob = new Blob([file]),
									parseOptions = {
										file: blob
									};
								utils.onFileProgress(parseOptions, function(chunk) {
									socket.send(chunk)
								}, function() {
									return running ? !0 : !1
								}, function(evt) {
									console.log("Error reading file: ", evt.message), showError("Error: " + evt.message)
								}, function() {
									socket.send(JSON.stringify({
										action: "stop"
									}))
								})
							}, function() {
								effects.stopToggleImage(timer, uploadImageTag, "upload"), uploadText.text("Select File"), localStorage.setItem("currentlyDisplaying", "false")
							})
						}
					}
			}();
		exports.initFileUpload = function(ctx) {
			var fileUploadDialog = $("#fileUploadDialog");
			fileUploadDialog.change(function() {
				var file = fileUploadDialog.get(0).files[0];
				handleSelectedFile(ctx.token, file)
			}), $("#fileUploadTarget").click(function() {
				var currentlyDisplaying = localStorage.getItem("currentlyDisplaying");
				return "fileupload" == currentlyDisplaying ? (console.log("HARD SOCKET STOP"), $.publish("hardsocketstop"), void localStorage.setItem("currentlyDisplaying", "false")) : "sample" == currentlyDisplaying ? void showError("Currently another file is playing, please stop the file or wait until it finishes") : "record" == currentlyDisplaying ? void showError("Currently audio is being recorded, please stop recording before playing a sample") : (fileUploadDialog.val(null), void fileUploadDialog.trigger("click"))
			})
		}
	}, {
		"../handlefileupload": 3,
		"../utils": 8,
		"./effects": 12,
		"./showerror": 19
	}],
	14: [function(require, module, exports) {
		"use strict";
		var initSessionPermissions = require("./sessionpermissions").initSessionPermissions,
			initAnimatePanel = require("./animatepanel").initAnimatePanel,
			initShowTab = require("./showtab").initShowTab,
			initDragDrop = require("./dragdrop").initDragDrop,
			initPlaySample = require("./playsample").initPlaySample,
			initRecordButton = require("./recordbutton").initRecordButton,
			initFileUpload = require("./fileupload").initFileUpload,
			initDisplayMetadata = require("./displaymetadata").initDisplayMetadata;
		exports.initViews = function(ctx) {
			console.log("Initializing views..."), initPlaySample(ctx), initDragDrop(ctx), initRecordButton(ctx), initFileUpload(ctx), initSessionPermissions(), initShowTab(), initAnimatePanel(), initShowTab(), initDisplayMetadata()
		}
	}, {
		"./animatepanel": 9,
		"./displaymetadata": 10,
		"./dragdrop": 11,
		"./fileupload": 13,
		"./playsample": 15,
		"./recordbutton": 16,
		"./sessionpermissions": 18,
		"./showtab": 20
	}],
	15: [function(require, module, exports) {
		"use strict";
		var utils = require("../utils"),
			onFileProgress = utils.onFileProgress,
			handleFileUpload = require("../handlefileupload").handleFileUpload,
			showError = require("./showerror").showError,
			effects = require("./effects"),
			LOOKUP_TABLE = {
				"en-US_BroadbandModel": ["Us_English_Broadband_Sample_1.wav", "Us_English_Broadband_Sample_2.wav"],
				"en-US_NarrowbandModel": ["Us_English_Narrowband_Sample_1.wav", "Us_English_Narrowband_Sample_2.wav"],
				"es-ES_BroadbandModel": ["Es_ES_spk24_16khz.wav", "Es_ES_spk19_16khz.wav"],
				"es-ES_NarrowbandModel": ["Es_ES_spk24_8khz.wav", "Es_ES_spk19_8khz.wav"],
				"pt-BR_BroadbandModel": ["pt-BR_Sample1-16KHz.wav", "pt-BR_Sample2-16KHz.wav"],
				"pt-BR_NarrowbandModel": ["pt-BR_Sample1-8KHz.wav", "pt-BR_Sample2-8KHz.wav"],
				"zh-CN_BroadbandModel": ["zh-CN_sample1_for_16k.wav", "zh-CN_sample2_for_16k.wav"],
				"zh-CN_NarrowbandModel": ["zh-CN_sample1_for_8k.wav", "zh-CN_sample2_for_8k.wav"]
			},
			playSample = function() {
				var running = !1;
				return localStorage.setItem("currentlyDisplaying", "false"), localStorage.setItem("samplePlaying", "false"),
					function(token, imageTag, sampleNumber, iconName, url) {
						$.publish("clearscreen");
						var currentlyDisplaying = localStorage.getItem("currentlyDisplaying"),
							samplePlaying = localStorage.getItem("samplePlaying");
						if (samplePlaying === sampleNumber) return console.log("HARD SOCKET STOP"), $.publish("socketstop"), localStorage.setItem("currentlyDisplaying", "false"), localStorage.setItem("samplePlaying", "false"), effects.stopToggleImage(timer, imageTag, iconName), effects.restoreImage(imageTag, iconName), void(running = !1);
						if ("record" === currentlyDisplaying) return void showError("Currently audio is being recorded, please stop recording before playing a sample");
						if ("fileupload" === currentlyDisplaying || "false" !== samplePlaying) return void showError("Currently another file is playing, please stop the file or wait until it finishes");
						localStorage.setItem("currentlyDisplaying", "sample"), localStorage.setItem("samplePlaying", sampleNumber), running = !0, $("#resultsText").val("");
						var timer = setInterval(effects.toggleImage, 750, imageTag, iconName),
							xhr = new XMLHttpRequest;
						xhr.open("GET", url, !0), xhr.responseType = "blob", xhr.onload = function() {
							var blob = xhr.response,
								currentModel = localStorage.getItem("currentModel") || "en-US_BroadbandModel",
								reader = new FileReader,
								blobToText = new Blob([blob]).slice(0, 4);
							reader.readAsText(blobToText), reader.onload = function() {
								var contentType = "fLaC" === reader.result ? "audio/flac" : "audio/wav";
								console.log("Uploading file", reader.result);
								var mediaSourceURL = URL.createObjectURL(blob),
									audio = new Audio;
								audio.src = mediaSourceURL, audio.play(), $.subscribe("hardsocketstop", function() {
									audio.pause(), audio.currentTime = 0
								}), $.subscribe("socketstop", function() {
									audio.pause(), audio.currentTime = 0
								}), handleFileUpload("sample", token, currentModel, blob, contentType, function(socket) {
									var parseOptions = {
											file: blob
										},
										samplingRate = -1 !== currentModel.indexOf("Broadband") ? 16e3 : 8e3;
									onFileProgress(parseOptions, function(chunk) {
										socket.send(chunk)
									}, function() {
										return running ? !0 : !1
									}, function(evt) {
										console.log("Error reading file: ", evt.message)
									}, function() {
										socket.send(JSON.stringify({
											action: "stop"
										}))
									}, samplingRate)
								}, function() {
									effects.stopToggleImage(timer, imageTag, iconName), effects.restoreImage(imageTag, iconName), localStorage.getItem("currentlyDisplaying", "false"), localStorage.setItem("samplePlaying", "false")
								})
							}
						}, xhr.send()
					}
			}();
		exports.initPlaySample = function(ctx) {
			! function() {
				var fileName = "audio/" + LOOKUP_TABLE[ctx.currentModel][0],
					el = $(".play-sample-1");
				el.off("click");
				var iconName = "play",
					imageTag = el.find("img");
				el.click(function() {
					playSample(ctx.token, imageTag, "sample-1", iconName, fileName, function(result) {
						console.log("Play sample result", result)
					})
				})
			}(ctx, LOOKUP_TABLE),
			function() {
				var fileName = "audio/" + LOOKUP_TABLE[ctx.currentModel][1],
					el = $(".play-sample-2");
				el.off("click");
				var iconName = "play",
					imageTag = el.find("img");
				el.click(function() {
					playSample(ctx.token, imageTag, "sample-2", iconName, fileName, function(result) {
						console.log("Play sample result", result)
					})
				})
			}(ctx, LOOKUP_TABLE)
		}
	}, {
		"../handlefileupload": 3,
		"../utils": 8,
		"./effects": 12,
		"./showerror": 19
	}],
	16: [function(require, module, exports) {
		"use strict";
		var Microphone = require("../Microphone"),
			handleMicrophone = require("../handlemicrophone").handleMicrophone,
			showError = require("./showerror").showError;
		exports.initRecordButton = function(ctx) {
			var recordButton = $("#recordButton");
			recordButton.click(function() {
				var running = !1,
					token = ctx.token,
					micOptions = {
						bufferSize: ctx.buffersize
					},
					mic = new Microphone(micOptions);
				return function(evt) {
					evt.preventDefault();
					var currentModel = localStorage.getItem("currentModel"),
						currentlyDisplaying = localStorage.getItem("currentlyDisplaying");
					return "sample" == currentlyDisplaying || "fileupload" == currentlyDisplaying ? void showError("Currently another file is playing, please stop the file or wait until it finishes") : (localStorage.setItem("currentlyDisplaying", "record"), void(running ? (console.log("Stopping microphone, sending stop action message"), recordButton.removeAttr("style"), recordButton.find("img").attr("src", "images/record.png"), $.publish("hardsocketstop"), mic.stop(), running = !1, localStorage.setItem("currentlyDisplaying", "false")) : ($("#resultsText").val(""), console.log("Not running, handleMicrophone()"), handleMicrophone(token, currentModel, mic, function(err) {
						if (err) {
							var msg = "Error: " + err.message;
							console.log(msg), showError(msg), running = !1, localStorage.setItem("currentlyDisplaying", "false")
						} else recordButton.css("background-color", "#fff"), recordButton.find("img").attr("src", "images/recording.png"), console.log("starting mic"), mic.record(), running = !0
					}))))
				}
			}())
		}
	}, {
		"../Microphone": 1,
		"../handlemicrophone": 4,
		"./showerror": 19
	}],
	17: [function(require, module, exports) {
		"use strict";
		var initPlaySample = require("./playsample").initPlaySample;
		exports.initSelectModel = function(ctx) {
			ctx.models.forEach(function(model) {
				model.name.indexOf("JP") > -1 || $("#dropdownMenuList").append($("<li>").attr("role", "presentation").append($("<a>").attr("role", "menu-item").attr("href", "/").attr("data-model", model.name).append(model.description.substring(0, model.description.length - 1), 8e3 == model.rate ? " (8KHz)" : " (16KHz)")))
			}), $("#dropdownMenuList").click(function(evt) {
				evt.preventDefault(), evt.stopPropagation(), console.log("Change view", $(evt.target).text());
				var newModelDescription = $(evt.target).text(),
					newModel = $(evt.target).data("model");
				$("#dropdownMenuDefault").empty().text(newModelDescription), $("#dropdownMenu1").dropdown("toggle"), localStorage.setItem("currentModel", newModel), ctx.currentModel = newModel, initPlaySample(ctx), $.publish("clearscreen")
			})
		}
	}, {
		"./playsample": 15
	}],
	18: [function(require, module, exports) {
		"use strict";
		exports.initSessionPermissions = function() {
			console.log("Initializing session permissions handler");
			var sessionPermissionsRadio = $("#sessionPermissionsRadioGroup input[type='radio']");
			sessionPermissionsRadio.click(function() {
				var checkedValue = sessionPermissionsRadio.filter(":checked").val();
				console.log("checkedValue", checkedValue), localStorage.setItem("sessionPermissions", checkedValue);

			})
		}
	}, {}],
	19: [function(require, module, exports) {
		"use strict";
		exports.showError = function(msg) {
			console.log("Error: ", msg);
			var errorAlert = $(".error-row");
			errorAlert.hide(), errorAlert.css("background-color", "#d74108"), errorAlert.css("color", "white");
			var errorMessage = $("#errorMessage");
			errorMessage.text(msg), errorAlert.show(), $("#errorClose").click(function(e) {
				return e.preventDefault(), errorAlert.hide(), !1
			})
		}, exports.showNotice = function(msg) {
			console.log("Notice: ", msg);
			var noticeAlert = $(".notification-row");
			noticeAlert.hide(), noticeAlert.css("border", "2px solid #ececec"), noticeAlert.css("background-color", "#f4f4f4"), noticeAlert.css("color", "black");
			var noticeMessage = $("#notificationMessage");
			noticeMessage.text(msg), noticeAlert.show(), $("#notificationClose").click(function(e) {
				return e.preventDefault(), noticeAlert.hide(), !1
			})
		}, exports.hideError = function() {
			var errorAlert = $(".error-row");
			errorAlert.hide()
		}
	}, {}],
	20: [function(require, module, exports) {
		"use strict";
		exports.initShowTab = function() {
			$('.nav-tabs a[data-toggle="tab"]').on("shown.bs.tab", function(e) {
				var target = $(e.target).text();
				"JSON" === target && $.publish("showjson")
			})
		}
	}, {}]
}, {}, [5]);