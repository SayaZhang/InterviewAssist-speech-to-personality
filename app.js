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

'use strict';

var express      =
 require('express'),
    app          = express(),
    vcapServices = require('vcap_services'),
    bluemix    = require('./config/bluemix'),
    extend       = require('util')._extend,
    i18n       = require('i18next'),
    watson       = require('watson-developer-cloud');

	//i18n settings
require('./config/i18n')(app);

// Bootstrap application settings
require('./config/express')(app);

// For local development, replace username and password
var config = extend({
  version: 'v1',
  url: 'https://stream.watsonplatform.net/speech-to-text/api',
  username: '8a3bfc85-7cf4-4526-89e0-68503f76e506',
  password: 'LOIrfU5hukKM'
}, vcapServices.getCredentials('speech_to_text'));

var language_translation = watson.language_translation({
  //url: 'https://stream.watsonplatform.net/speech-to-text/api',
  username: '5dfe9b2f-6029-4b57-b73a-e8539e4e354f',
  password: '0zoR4HYFjira',
  version: 'v2'
});

var authService = watson.authorization(config);

app.get('/', function(req, res) {
  res.render('index', { ct: req._csrfToken });
});
app.get('/convert', function(req, res) {
  res.render('convert', { ct: req._csrfToken });
});


// Get token using your credentials
app.post('/api/token', function(req, res, next) {
  authService.getToken({url: config.url}, function(err, token) {
    if (err)
      next(err);
    else
      res.send(token);
  });
});
// ------------------------personality_insights

// if bluemix credentials exists, then override local
var credentials = extend({
  version: 'v2',
  url: "https://gateway.watsonplatform.net/personality-insights/api",
  username: "2061fad3-d165-4b25-9e67-d342d3f23ede",
  password: "E7l2HYYhjR66"
}, bluemix.getServiceCreds('personality_insights')); // VCAP_SERVICES

// Create the service wrapper
var personalityInsights = watson.personality_insights(credentials);

app.post('/personality', function(req, res, next) {
  var parameters = extend(req.body, { acceptLanguage : i18n.lng() });

  personalityInsights.profile(parameters, function(err, profile) {
    if (err)
      return next(err);
    else
      return res.json(profile);
  });
});
// error-handler settings
require('./config/error-handler')(app);

var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('listening at:', port);
