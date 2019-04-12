"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mailgun = require('mailgun-js')({
  apiKey: '305c50803daa3afeacdac228cf6fe5ed-7bbbcb78-9bd5022c',
  domain: 'sandboxa466a01624994ab79d8e05f6a35e69a1.mailgun.org'
});


const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function (req, res) {
  var email =
    req.body.queryResult &&
      req.body.queryResult.queryText
      ? req.body.queryResult.queryText
      : "Empty response";

  var name = req.body.queryResult &&
    req.body.queryResult.queryText
    ? req.body.queryResult.queryText
    : "Empty response";


  const data = {
    from: 'postmaster@sandboxa466a01624994ab79d8e05f6a35e69a1.mailgun.org',
    to: 'tkaur@covalience.com',
    subject: 'Hello',
    text: 'Hi, A person with name' + name + 'and email address' + email + 'is a potential lead'
  };

  mailgun.messages().send(data, (error, body) => {
    console.log(body);
  });


  return res.json({
    "fulfillmentText": email + "" + name,
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            "Okay,our representative will email you shortly !"
          ]
        }
      }
    ]
  });
});

restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});
