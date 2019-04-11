"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function (req, res) {
  var email =
    req.body.result &&
      req.body.result.parameters &&
      req.body.result.parameters.email
      ? req.body.result.parameters.email
      : "Empty response";

      var API_KEY = '305c50803daa3afeacdac228cf6fe5ed-7bbbcb78-9bd5022c';
      var DOMAIN = 'sandboxa466a01624994ab79d8e05f6a35e69a1.mailgun.org';
      var mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });

        const data = {
          from: 'postmaster@sandboxa466a01624994ab79d8e05f6a35e69a1.mailgun.org',
          to: 'tkaur@covalienc.com',
          subject: 'Hello',
          text: 'Testing some Mailgun awesomeness!'
        };

  mailgun.messages().send(data, (error, body) => {
    console.log(body);
  });

  return res.json({
    speech: email,
    displayText: email,
    source: "webhook-echo-sample"
  });
});

restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});
