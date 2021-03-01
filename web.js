const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const port = 8001;

const korea = require("./routes/koreaAPI");
const age = require("./routes/ageAPI");
const gender = require("./routes/genderAPI");
const sido = require("./routes/sidoAPI");
const global = require("./routes/globalAPI");

app.use(cors());
app.use(express.static(path.join(__dirname, "../front/build")));

app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "../front/build/index.html"));
});

app.use("/", korea);
app.use("/", age);
app.use("/", gender);
app.use("/", sido);
app.use("/", global);

app.listen(port, () => {
  console.log(`${port} 포트로 서버 동작중 ...`);
});
