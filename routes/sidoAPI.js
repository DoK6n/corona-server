const express = require("express");
const router = express.Router();
const request = require('request');
const convert = require('xml-js');
const covidAPIurl = require('../config/covidAPIurl.json');
const day = require('./day');
// XML
const requestUrl = covidAPIurl.URL+
"SidoInfStateJson?serviceKey=" + covidAPIurl.SERVICE_KEY + 
"&pageNo=1&numOfRows=10&startCreateDt="+day().yesterday+"&endCreateDt="+day().today;

router.get("/sido", (req, res, next) => {
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

        const total = +jsonData.response.body.totalCount._text; // 오늘+어제 데이터 갯수
        
        const today = {};
        const yesterday = {};

        for (let i = 0; i < total; i++) {
          const key = jsonData.response.body.items.item[i].gubun._text;
          i > 18 ? yesterday[key] = jsonData.response.body.items.item[i] : today[key] = jsonData.response.body.items.item[i];
        }
        const data = { today:today, yesday:yesterday };
        res.send(data);
        console.log('/sido api 연결 시각 => ' +day().time);
      }
    }
  });
});

module.exports = router;
