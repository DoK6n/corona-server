const express = require("express");
const router = express.Router();
const request = require("request");
const convert = require("xml-js");

const covidAPIurl = require("../config/covidAPIurl.json");
const day = require("./day");
// http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=1t9Nx5DMbe9EiysB9UNzj%2FzNhVQ41NetPGOeAvlLvqI4mGzQdjDnfzNo9st7b3b094y2sT1P%2F%2BujRcAf0BG69g%3D%3D&pageNo=1&numOfRows=10&startCreateDt=20200108&endCreateDt=20210203
// XML
// 오늘
const requestUrl =
  covidAPIurl.URL +
  "InfStateJson?serviceKey=" +
  covidAPIurl.SERVICE_KEY +
  "&pageNo=1&numOfRows=10&startCreateDt=20200108&endCreateDt=" +
  day.today;

// 어제
const requestUrlYDA =
  covidAPIurl.URL +
  "InfStateJson?serviceKey=" +
  covidAPIurl.SERVICE_KEY +
  "&pageNo=1&numOfRows=10&startCreateDt=20200108&endCreateDt=" +
  day.yesterday;

router.get("/kor", (req, res, next) => {
  request.get(requestUrl, (err, resp, body) => {
    if (err) {
      console.log(`err => ${err}`);
    } else {
      if (resp.statusCode == 200) {
        const xml = body;
        const result = convert.xml2json(xml, {
          compact: true,
          spaces: 4,
        });
        const jsonData = JSON.parse(result);
        res.send(jsonData.response.body.items.item[0]);
        console.log("오늘 korea api data 연결 성공!");
      }
    }
  });
});

router.get("/kor/yda", (req, res, next) => {
  request.get(requestUrlYDA, (err, resp, body) => {
    if (err) {
      console.log(`err => ${err}`);
    } else {
      if (resp.statusCode == 200) {
        const xml = body;
        const result = convert.xml2json(xml, {
          compact: true,
          spaces: 4,
        });
        const jsonData = JSON.parse(result);
        res.send(jsonData.response.body.items.item[0]);
        console.log("어제 korea api data 연결 성공!");
      }
    }
  });
});

module.exports = router;
