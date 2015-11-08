/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*global $:false, BUFFERSIZE */

'use strict';

var models = require('./data/models.json').models;
var utils = require('./utils');
utils.initPubSub();
var initViews = require('./views').initViews;
var showerror = require('./views/showerror');
var showError = showerror.showError;
var getModels = require('./models').getModels;

window.BUFFERSIZE = 8192;

$(document).ready(function() {
  var tokenGenerator = utils.createTokenGenerator();

  // Make call to API to try and get token
  tokenGenerator.getToken(function(err, token) {
    window.onbeforeunload = function() {
      localStorage.clear();
    };

    if (!token) {
      console.error('No authorization token available');
      console.error('Attempting to reconnect...');

      if (err && err.code)
        showError('Server error ' + err.code + ': '+ err.error);
      else
        showError('Server error ' + err.code + ': please refresh your browser and try again');
    }

    var viewContext = {
      currentModel: 'en-US_BroadbandModel',
      models: models,
      token: token,
      bufferSize: BUFFERSIZE
    };

    initViews(viewContext);

    // Save models to localstorage
    localStorage.setItem('models', JSON.stringify(models));
/*    var text = JSON.stringify(models));
    console.log(text);*/


    //翻译接口
    //var url = 'http://openapi.baidu.com/public/2.0/bmt/translate?client_id=hdwA2dB6tBe1F6WvsQLDDflu&q='+text+'&from=auto&to=en';
/*    var request = require('request');
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
         console.log(body);
      }else{
        console.log(error);
      }
});*/


//  居然watson的翻译接口没有中文
/*  language_translation.translate({
    text: 'hello',
    source: 'en',
    target: 'es'
  }, function(err, translation) {
    if (err)
      console.log(err)
    else
      console.log(translation);
  });
*/
    // Set default current model
    localStorage.setItem('currentModel', 'en-US_BroadbandModel');
    localStorage.setItem('sessionPermissions', 'true');
    
    getModels(token);
    
    $.subscribe('clearscreen', function() {
      $('#resultsText').text('');
      $('#resultsJSON').text('');
      $('.error-row').hide();
      $('.notification-row').hide();
      $('.hypotheses > ul').empty();
      $('#metadataTableBody').empty();
    });

  });

});
