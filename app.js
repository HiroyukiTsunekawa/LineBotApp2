/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// ----------ここから----------
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// --------ここまで追加--------
// ----------ここから2----------
var request = require('request');

app.post('/api', function(req, res) {
  var options = {
    method: 'POST',
    uri: 'https://api.line.me/v2/bot/message/reply',
    body: {
      replyToken: req.body.events[0].replyToken,
      messages: [{
        type: "text",
        //text: req.body.events[0].message.text
        text: 'ここに返却するメッセージ書くといいんだ'
      }]
    },
    auth: {
      bearer: 'IZ5WinYpt9+ngEMIo+fl3ue7WwtVJ1B1gsieu4zCtgXGT42xkfhR+BLIZrQXi5Q6y4O8LEuEEiiGTj5SkG3zTqJBQx4jnYZCr80FpaJx1oozAiERg9HOAKv/g/ac4mAeDjuJnhE2uQHmWCIc9VtrUAdB04t89/1O/w1cDnyilFU=' // ここは自分のtokenに書き換える
    },
    json: true
  };
  request(options, function(err, res, body) {
    console.log(JSON.stringify(res));
  });
  res.send('OK');
});
// --------ここまで追加2--------


// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
