import Vue from 'vue';

function timeStringToLocal(timestring) {
  // format: 2020-04-01 11:04
  function addZero(i) {
    if (i <= 9) {
      return `0${i}`;
    } else {
      return i;
    }
  }

  let t = new Date(timestring);
  let formNow = Math.floor((new Date() - t) / 1000);
  let string;
  if (formNow < 60) {
    string = `${formNow}秒前`;
  } else if (formNow < 3600) {
    string = `${Math.floor(formNow / 60)}分钟前`;
  } else if (formNow < 3600 * 24) {
    string = `${Math.floor(formNow / 3600)}小时前`;
  } else if (formNow < 3600 * 24 * 4) {
    string = `${Math.floor(formNow / 3600 / 24)}天前`;
  } else {
    string = `${t.getFullYear()}-${addZero(t.getMonth() + 1)}-${addZero(t.getDate())} ${addZero(
      t.getHours()
    )}:${addZero(t.getMinutes())}`;
  }

  return string;
}

const utils = { timeStringToLocal };

Vue.prototype.$utils = utils;
