"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mailgun = require('mailgun-js')({ 
    apiKey: '305c50803daa3afeacdac228cf6fe5ed-7bbbcb78-9bd5022c',
    domain: 'sandboxa466a01624994ab79d8e05f6a35e69a1.mailgun.org' 
    });
    
const data = {
        from: 'postmaster@sandboxa466a01624994ab79d8e05f6a35e69a1.mailgun.org',
        to: 'tkaur@covalience.com',
        subject: 'Hello',
        text: 'Testing some Mailgun awesomeness!'
    };

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function (req, res) {
  var email =  req.body.result && req.body.result.parameters && req.body.result.parameters.email ? req.body.result.parameters.email : "Empty response";
  var returnString='';
  mailgun.messages().send(data, (error, body) => {
    returnString=body;
  });

  return res.json({
    "fulfillmentText":'hello'
    ,"fulfillmentMessages":[
        {
            "text": {
                "text": [
                    "Hello I m Responding to intent"
                ]
            }
        }
    ]
  });
});

restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});
