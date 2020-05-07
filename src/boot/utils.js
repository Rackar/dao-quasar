import Vue from 'vue';

function timeStringToLocal(timestring, flag = 'RelativeTime') {
  // format: 2020-04-01 11:04
  function addZero(i) {
    if (i <= 9) {
      return `0${i}`;
    } else {
      return i;
    }
  }
  let Flag = {
    Accurate: 'Accurate',
    RelativeTime: 'RelativeTime',
    RelativeDay: 'RelativeDay',
  };

  let t = new Date(timestring);
  let formNow = Math.floor((new Date() - t) / 1000);
  let string;
  if (flag !== Flag.Accurate) {
    if (formNow < 60) {
      string = `${formNow}秒前`;
    } else if (formNow < 3600) {
      string = `${Math.floor(formNow / 60)}分钟前`;
    } else if (formNow < 3600 * 24) {
      string = `${Math.floor(formNow / 3600)}小时前`;
    } else if (formNow < 3600 * 24 * 4) {
      string = `${Math.floor(formNow / 3600 / 24)}天前`;
    } else {
      if (t.getFullYear() === new Date().getFullYear()) {
        string = `${addZero(t.getMonth() + 1)}月${addZero(t.getDate())}日`;
      } else {
        string = `${t.getFullYear()}年${addZero(t.getMonth() + 1)}月${addZero(t.getDate())}日`;
      }

      if (flag === Flag.RelativeTime) {
        string += ` ${addZero(t.getHours())}:${addZero(t.getMinutes())}`;
      } else if (flag === Flag.RelativeDay) {
      }
    }
  } else {
    string = `${addZero(t.getMonth() + 1)}-${addZero(t.getDate())}-${t.getFullYear()} ${addZero(
      t.getHours()
    )}:${addZero(t.getMinutes())}`;
  }

  return string;
}

const utils = { timeStringToLocal };

Vue.prototype.$utils = utils;
