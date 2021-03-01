const date = new Date();
const ydate = new Date();

let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();

month = month < 10 ? "0" + month : month;
day = day < 10 ? "0" + day : day;

const today = year + "" + month + "" + day;

let yesterdate = ydate.getTime() - 1 * 24 * 60 * 60 * 1000;
ydate.setTime(yesterdate);
const ydyear = ydate.getFullYear();
let ydmonth = ydate.getMonth() + 1;
let yday = ydate.getDate();

ydmonth = ydmonth < 10 ? "0" + ydmonth : ydmonth;
yday = yday < 10 ? "0" + yday : yday;

const yesterday = ydyear + "" + ydmonth + "" + yday;

module.exports = {
  today: today,
  yesterday: yesterday,
};
