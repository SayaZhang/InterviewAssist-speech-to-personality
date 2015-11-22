
/*
$(document).ready(function() {
  	var familyName = $('#nameText').val();
  	console.log(familyName);
	$('#familyName').value = familyName;
});*/


/*//console.log('hello');
function getElementsByClassName(node,classname) {
  if (node.getElementsByClassName) { // use native implementation if available
    return node.getElementsByClassName(classname);
  } else {
    return (function getElementsByClass(searchClass,node) {
        if ( node == null )
          node = document;
        var classElements = [],
            els = node.getElementsByTagName("*"),
            elsLen = els.length,
            pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"), i, j;

        for (i = 0, j = 0; i < elsLen; i++) {
          if ( pattern.test(els[i].className) ) {
              classElements[j] = els[i];
              j++;
          }
        }
        return classElements;
    })(classname, node);
  }
}*/

  var oStar = document.getElementById("star");
  
  var aLi = oStar.getElementsByTagName("li");
  var oUl = oStar.getElementsByTagName("ul")[0];
  var oSpan = oStar.getElementsByTagName("span")[0];
  var oP = oStar.getElementsByTagName("p")[0];
  var i = iScore = iStar = 0;
  var aMsg = [
        "很不满意",
        "不满意",
        "一般",
        "满意",
        "非常满意"
        ]
  
  for (i = 1; i <= aLi.length; i++){
    aLi[i - 1].index = i;
    
    //鼠标移过
    aLi[i - 1].onmouseover = function (){
     fnPoint(this.index);
      
    };
    
    //鼠标离开后恢复上次评分
    aLi[i - 1].onmouseout = function (){
      fnPoint();
      //关闭浮动层
      oP.style.display = "none"
    };
    
    //点击后进行评分处理
    aLi[i - 1].onclick = function (){
      iStar = this.index;
      oP.style.display = "none";
     /* oSpan.innerHTML = "<strong>" + (this.index) + " 分</strong> (" + aMsg[this.index - 1].match(/\|(.+)/)[1] + ")";*/
    }
  }
  
  //评分处理
  function fnPoint(iArg){
    //分数赋值
    iScore = iArg || iStar;
    for (i = 0; i < aLi.length; i++) aLi[i].className = i < iScore ? "on" : ""; 
  }

///////////////////lefthalf
$('.view').bind('click', function(contentNode) {
    var row = contentNode.parentNode.parentNode;

});
  
