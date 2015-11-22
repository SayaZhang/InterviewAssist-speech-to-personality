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
    watson       = require('watson-developer-cloud'),
    routes = require('./routes'),
    user = require('./routes/user'), 
    http = require('http'), 
    path = require('path'), 
    fs = require('fs');


	//i18n settings
require('./config/i18n')(app);

// Bootstrap application settings
require('./config/express')(app);

// For local development, replace username and password
var config = extend({
  version: 'v1',
  url: 'https://stream.watsonplatform.net/speech-to-text/api',
  username: 'cf35131e-9b16-418b-af2e-085d5d54ff94',
  password: 'n3wlLTf9ND74'
}, vcapServices.getCredentials('speech_to_text'));

/*var language_translation = watson.language_translation({
  //url: 'https://stream.watsonplatform.net/speech-to-text/api',
  username: '5dfe9b2f-6029-4b57-b73a-e8539e4e354f',
  password: '0zoR4HYFjira',
  version: 'v2'
});*/

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
  username: "7c612c8e-ab34-46e9-9c20-9447e71459ce",
  password: "qHCOh5u1Hego"
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


////////////////DB
var db;

var cloudant;

var fileToUpload;

var dbCredentials = {
  dbName : 'my_sample_dbzhang001'
};

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart();

// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/style', express.static(path.join(__dirname, '/views/style')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

function initDBConnection() {
  
  if(process.env.VCAP_SERVICES) {
    var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
    if(vcapServices.cloudantNoSQLDB) {
      dbCredentials.host = vcapServices.cloudantNoSQLDB[0].credentials.host;
      dbCredentials.port = vcapServices.cloudantNoSQLDB[0].credentials.port;
      dbCredentials.user = vcapServices.cloudantNoSQLDB[0].credentials.username;
      dbCredentials.password = vcapServices.cloudantNoSQLDB[0].credentials.password;
      dbCredentials.url = vcapServices.cloudantNoSQLDB[0].credentials.url;

      cloudant = require('cloudant')(dbCredentials.url);
      
      // check if DB exists if not create
      cloudant.db.create(dbCredentials.dbName, function (err, res) {
        if (err) { console.log('could not create db ', err); }
        });
      
      db = cloudant.use(dbCredentials.dbName);
      
    } else {
      console.warn('Could not find Cloudant credentials in VCAP_SERVICES environment variable - data will be unavailable to the UI');
    }
  } else{
    console.warn('VCAP_SERVICES environment variable not set - data will be unavailable to the UI');
    // For running this app locally you can get your Cloudant credentials 
    // from Bluemix (VCAP_SERVICES in "cf env" output or the Environment 
    // Variables section for an app in the Bluemix console dashboard).
    // Alternately you could point to a local database here instead of a 
    // Bluemix service
      dbCredentials.host = '00064234-62a0-426c-8449-cc9b9285133d-bluemix.cloudant.com';
      dbCredentials.port = 443;
      dbCredentials.user = '00064234-62a0-426c-8449-cc9b9285133d-bluemix';
      dbCredentials.password = '6cade75e05aa84aafc57f199d0c8eefe9ba541e10c4920491e9e5203461eb838';
      dbCredentials.url = 'https://00064234-62a0-426c-8449-cc9b9285133d-bluemix:6cade75e05aa84aafc57f199d0c8eefe9ba541e10c4920491e9e5203461eb838@00064234-62a0-426c-8449-cc9b9285133d-bluemix.cloudant.com';
    	
      cloudant = require('cloudant')(dbCredentials.url);
      cloudant.db.create(dbCredentials.dbName, function (err, res) {if (err) { console.log('could not create db ', err); }});
      db = cloudant.use(dbCredentials.dbName);
      console.log(dbCredentials.host);

    }
         //"name": "testList-cloudantNoSQLDB",
        //"label": "cloudantNoSQLDB",
       // "plan": "Shared",
      ///"credentials": {
       // "username": "1ef1860f-8192-4681-965e-44b18638fb0b-bluemix",
        //"password": "ce966f0be9fc40a4439c950506f0d471f021c24c1352a0e850843c976c7772da",
       // "host": "1ef1860f-8192-4681-965e-44b18638fb0b-bluemix.cloudant.com",
        //"port": 443,
      //  "url": "https://1ef1860f-8192-4681-965e-44b18638fb0b-bluemix:ce966f0be9fc40a4439c950506f0d471f021c24c1352a0e850843c976c7772da@1ef1860f-8192-4681-965e-44b18638fb0b-bluemix.cloudant.com"
     
}

initDBConnection();

app.get('/', routes.index);

function createResponseData(id, name, value, attachments) {

  var responseData = {
    id : id,
    name : name,
    value : value,
    attachements : []
  };
  
   
  attachments.forEach (function(item, index) {
    var attachmentData = {
      content_type : item.type,
      key : item.key,
      url : 'http://' + dbCredentials.user + ":" + dbCredentials.password
          + '@' + dbCredentials.host + '/' + dbCredentials.dbName
          + "/" + id + '/' + item.key
    };
    responseData.attachements.push(attachmentData);
    
  });
  return responseData;
}


var saveDocument = function(id, name, value, response) {
  
  if(id === undefined) {
    // Generated random id
    id = '';
  }
  
  db.insert({
    name : name,
    value : value
  }, id, function(err, doc) {
    if(err) {
      console.log(err);
      response.sendStatus(500);
    } else
      response.sendStatus(200);
    response.end();
  });
  
}

app.post('/api/favorites/attach', multipartMiddleware, function(request, response) {

  console.log("Upload File Invoked..");
  console.log('Request: ' + JSON.stringify(request.headers));
  
  var id;
  
  db.get(request.query.id, function(err, existingdoc) {   
    
    var isExistingDoc = false;
    if (!existingdoc) {
      id = '-1';
    } else {
      id = existingdoc.id;
      isExistingDoc = true;
    }

    var name = request.query.name;
    var value = request.query.value;

    var file = request.files.file;
    var newPath = './public/uploads/' + file.name;    
    
    var insertAttachment = function(file, id, rev, name, value, response) {
      
      fs.readFile(file.path, function(err, data) {
        if (!err) {
            
          if (file) {
              
            db.attachment.insert(id, file.name, data, file.type, {rev: rev}, function(err, document) {
              if (!err) {
                console.log('Attachment saved successfully.. ');
  
                db.get(document.id, function(err, doc) {
                  console.log('Attachements from server --> ' + JSON.stringify(doc._attachments));
                    
                  var attachements = [];
                  var attachData;
                  for(var attachment in doc._attachments) {
                    if(attachment == value) {
                      attachData = {"key": attachment, "type": file.type};
                    } else {
                      attachData = {"key": attachment, "type": doc._attachments[attachment]['content_type']};
                    }
                    attachements.push(attachData);
                  }
                  var responseData = createResponseData(
                      id,
                      name,
                      value,
                      attachements);
                  console.log('Response after attachment: \n'+JSON.stringify(responseData));
                  response.write(JSON.stringify(responseData));
                  response.end();
                  return;
                });
              } else {
                console.log(err);
              }
            });
          }
        }
      });
    }

    if (!isExistingDoc) {
      existingdoc = {
        name : name,
        value : value,
        create_date : new Date()
      };
      
      // save doc
      db.insert({
        name : name,
        value : value
      }, '', function(err, doc) {
        if(err) {
          console.log(err);
        } else {
          
          existingdoc = doc;
          console.log("New doc created ..");
          console.log(existingdoc);
          insertAttachment(file, existingdoc.id, existingdoc.rev, name, value, response);
          
        }
      });
      
    } else {
      console.log('Adding attachment to existing doc.');
      console.log(existingdoc);
      insertAttachment(file, existingdoc._id, existingdoc._rev, name, value, response);
    }
    
  });

});

app.post('/api/favorites', function(request, response) {

  console.log("Create Invoked..");
  console.log("Name: " + request.body.name);
  console.log("Value: " + request.body.value);
  
  // var id = request.body.id;
  var name = request.body.name;
  var value = request.body.value;
  
  saveDocument(null, name, value, response);

});

app.delete('/api/favorites', function(request, response) {

  console.log("Delete Invoked..");
  var id = request.query.id;
  // var rev = request.query.rev; // Rev can be fetched from request. if
  // needed, send the rev from client
  console.log("Removing document of ID: " + id);
  console.log('Request Query: '+JSON.stringify(request.query));
  
  db.get(id, { revs_info: true }, function(err, doc) {
    if (!err) {
      db.destroy(doc._id, doc._rev, function (err, res) {
           // Handle response
         if(err) {
           console.log(err);
           response.sendStatus(500);
         } else {
           response.sendStatus(200);
         }
      });
    }
  });

});

app.put('/api/favorites', function(request, response) {

  console.log("Update Invoked..");
  
  var id = request.body.id;
  var name = request.body.name;
  var value = request.body.value;
  
  console.log("ID: " + id);
  
  db.get(id, { revs_info: true }, function(err, doc) {
    if (!err) {
      console.log(doc);
      doc.name = name;
      doc.value = value;
      db.insert(doc, doc.id, function(err, doc) {
        if(err) {
          console.log('Error inserting data\n'+err);
          return 500;
        }
        return 200;
      });
    }
  });
});

app.get('/api/favorites', function(request, response) {

  console.log("Get method invoked.. ")
  
  db = cloudant.use(dbCredentials.dbName);
  var docList = [];
  var i = 0;
  db.list(function(err, body) {
    if (!err) {
      var len = body.rows.length;
      console.log('total # of docs -> '+len);
      if(len == 0) {
        // push sample data
        // save doc
        var docName = '张三';
        var docDesc = '测试数据';
        db.insert({
          name : docName,
          value : 'A sample Document'
        }, '', function(err, doc) {
          if(err) {
            console.log(err);
          } else {
            
            console.log('Document : '+JSON.stringify(doc));
            var responseData = createResponseData(
              doc.id,
              docName,
              docDesc,
              []);
            docList.push(responseData);
            response.write(JSON.stringify(docList));
            console.log(JSON.stringify(docList));
            console.log('ending response...');
            response.end();
          }
        });
      } else {

        body.rows.forEach(function(document) {
          
          db.get(document.id, { revs_info: true }, function(err, doc) {
            if (!err) {
              if(doc['_attachments']) {
              
                var attachments = [];
                for(var attribute in doc['_attachments']){
                
                  if(doc['_attachments'][attribute] && doc['_attachments'][attribute]['content_type']) {
                    attachments.push({"key": attribute, "type": doc['_attachments'][attribute]['content_type']});
                  }
                  console.log(attribute+": "+JSON.stringify(doc['_attachments'][attribute]));
                }
                var responseData = createResponseData(
                    doc._id,
                    doc.name,
                    doc.value,
                    attachments);
              
              } else {
                var responseData = createResponseData(
                    doc._id,
                    doc.name,
                    doc.value,
                    []);
              } 
            
              docList.push(responseData);
              i++;
              if(i >= len) {
                response.write(JSON.stringify(docList));
                console.log('ending response...');
                response.end();
              }
            } else {
              console.log(err);
            }
          });
          
        });
      }
      
    } else {
      console.log(err);
    }
  });

});


/////////////Alchemy Language
var consolidate = require('consolidate');

var server = require('http').createServer(app);

//Create the AlchemyAPI object
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();

// all environments
app.engine('dust',consolidate.dust);
app.set('views',__dirname + '/views');

//自己加的
app.get("/dust", function(req, res) {
    res.render('dust_template.dust', {header: 'DUST - TEST OK'});
});
app.get("/ejs", function(req, res) {
    res.render('ejs_template.ejs', {header: 'EJS - TEST OK'});
});
/*app.set('view engine', 'dust');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}*/

app.get('/', example);

var demo_text = 'It is really my honor to have this opportunity for an interview,I hope i can make a good performance today. I\m confident that I can succeed.Now i will introduce myself brieflyI am 26 years old,born in shandong province .I was graduated from qingdao university. my major is electronic.and i got my bachelor degree after my graduation in the year of 20xx.I spend most of my time on study,i have passed CET4/6 . and i have acquired basic knowledge of my major during my school time.In July 20xx, I began work for a small private company as a technical support engineer in QingDao city.Because I\m capable of more responsibilities, so I decided to change my job.And in August 2004,I left QingDao to BeiJing and worked for a foreign enterprise as a automation software test engineer.Because I want to change my working environment, I\d like to find a job which is more challenging. Morover Motorola is a global company, so I feel I can gain the most from working in this kind of company ennvironment. That is the reason why I come here to compete for this position.I think I\m a good team player and I\m a person of great honesty to others. Also I am able to work under great pressure.That’s all. Thank you for giving me the chance.';

function example(req, res) {
  var output = {};

  //Start the analysis chain
  entities(req, res, output);
}

function keywords(req, res, output) {
  alchemyapi.keywords('text', demo_text, { 'sentiment':1 }, function(response) {
    output['keywords'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['keywords'] };
    concepts(req, res, output);
  });
  console.log();
}



var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('listening at:', port);
