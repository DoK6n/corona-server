const express = require("express");
const router = express.Router();
const request = require('request');
const convert = require('xml-js');

const covidAPIurl = require('../config/covidAPIurl.json');
const day = require('../routes/day');

// XML
const requestUrl = covidAPIurl.URL + 
"NatInfStateJson?serviceKey=" + covidAPIurl.SERVICE_KEY + 
"&pageNo=1&numOfRows=10&startCreateDt="+day.yesterday+"&endCreateDt="+day.yesterday;

router.get("/global", (req, res, next) => {
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
        const data = {};
        const af = {}, oc = {}, eu = {}, am = {}, me = {}, as = {}; // 아프리카, 오세아니아, 유럽, 아메리카, 중동, 아시아
        
        jsonData.response.body.items.item.forEach(e => {
          switch (e.areaNm._text) {
            case '아프리카':
              af[e.nationNm._text] = e;
              break;
            case '오세아니아':
              oc[e.nationNm._text] = e;
              break;
            case '유럽':
              eu[e.nationNm._text] = e;
              break;
            case '아메리카':
              am[e.nationNm._text] = e;
              break;
            case '중동':
              me[e.nationNm._text] = e;
              break;
            case '아시아':
              as[e.nationNm._text] = e;
              break;
          }
        });

        data.아프리카 = af;
        data.오세아니아 = oc;
        data.유럽 = eu;
        data.아메리카 = am;
        data.중동 = me;
        data.아시아 = as;
        data.time = as.한국.createDt._text.split('.')[0];

        res.send(data);
        console.log("global api data 연결 성공!");
      }
    }
  });
});

module.exports = router;
