const express = require("express");
const router = express.Router();
const request = require('request');
const convert = require('xml-js');

const covidAPIurl = require('../config/covidAPIurl.json');
const day = require('./day');

// XML
const requestUrl = covidAPIurl.URL+
"GenAgeCaseInfJson?serviceKey=" + covidAPIurl.SERVICE_KEY + 
"&pageNo=1&numOfRows=10&startCreateDt=20200108&endCreateDt="+day().today;

router.get("/gender", (req, res, next) => {
  request.get(requestUrl, (err, resp, body) => {
    if (err) {
      console.log(`err => ${err}`);
    } else {
      if (resp.statusCode == 200) {
        const xml = body;
        const result = convert.xml2json(xml, {
          compact: true,
          spaces: 4
        });
        const jsonData = JSON.parse(result);
        const genderData = [
          jsonData.response.body.items.item[9],
          jsonData.response.body.items.item[10]
        ]
        res.send(genderData);
        console.log('/gender api 연결 시각 => ' +day().time);
      }
    }
  });
});

module.exports = router;
