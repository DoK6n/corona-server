# 코로나 감염현황 사이트 ( 백엔드 )

<br>

## ❗️ 프로젝트 소개

<br>

- 코로나 감염현황 정보를 데이터 시각화를 통해 제공하는 사이트

<br>

---

<br>

## ❗️ 프로젝트 기간

<br>

- 2021.01.07 ~ 2021.01.17 (1인)

<br>

## ❗️ 사용된 기술 & 라이브러리

<br>

- NodeJS

- 공공데이터 API
	- 코로나 국내 감염 현황
	- 코로나 성별 연령 별 감염 현황
	- 코로나 시도 별 감염 현황
	- 코로나 해외 발생 현황

- xml2json : xml데이터를 json 형태로 변환시켜주는 모듈

- cafe24 nodejs서버 호스팅
  <br>

---

<br>

## ❗️ 프로젝트 구현

<br>

### 1. xml2json를 이용하여 xml로 제공되는 api 데이터를 json으로 변환

<br>

- xml로만 제공되는 공공데이터 api를 서버에서 json으로 변환하여 프론트로 데이터를 보내는 작업

```js
...

const convert = require('xml-js');

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
		
		...
		
        res.send(data);
      }
    }
  });
});
```



<br>

## ❗️ 링크

<br>

[ehrbs.shop](http://ehrbs.shop)

[cvd.cafe24app.com](http://cvd.cafe24app.com)

<br>

## ❗️ 만들면서 힘들었던 점

<br>

### CORS 보안정책

처음 기획하여 개발하기 시작했을 때 프론트로만 개발을 하려고 하였으나,
공공데이터 API를 가져오는 과정에서CORS(Cross-Oring-Resource-Security) 관련 에러를 마주하게 되었는데, 구글을 통해 
서버에서 Access-Control-Allow-Origin 헤더에 알맞은 값을 세팅하는 방법,
cors 모듈사용하기,
프론트에서 proxy설정, jquery플러그인 xdomainajax등의 해결방법을 찾게 되었고,
이후 nodeJS를 공부하여 모듈을 적용하려고 하였지만, xml2json을 사용하였더니 해결되었습니다.
<br>
nodejs를 공부하여 서버도 같이 구축한 결과 프론트에서 데이터를 쉽게 사용하기 위해 서버단에서 api 데이터를 가공할 수 있었습니다.
<br>
### cafe24 호스팅
처음 cafe24에선 nodejs서버를 호스팅하고 프론트를 github pages를 이용하였으나, 
github pages는 https를, cafe24에선 http를 제공하여 서로 api 데이터를 주고받지 못해
무료 ssl인증서로 nodejs측에 https 적용하는 도중 react에서 build를 이용하여 프론트 백엔드를 한번에 cafe24에 호스팅하는 방법을 찾게되어 해결하였습니다.

<br>
