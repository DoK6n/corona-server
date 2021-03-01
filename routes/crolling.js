const request = require('request');
const cheerio = require('cheerio');


const options = {
  encoding: "utf-8",
  method: "GET",
  uri: "https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/sfc/dis/disasterMsgView.jsp?menuSeq=679"
}

request(options, function (err, res, body) {
  const $ = cheerio.load(body);
  
  console.log(body);
  // console.log($(".btn")[0].children[0].data);
});