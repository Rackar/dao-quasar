import Vue from 'vue'


function timeStringToLocal(timestring) {
  // format: 2020-04-01 11:04
  function addZero(i) {
    if (i <= 9) {
      return `0${i}`
    } else {
      return i
    }
  }

  let t = new Date(timestring);

  let string = `${t.getFullYear()}-${addZero(t.getMonth() + 1)}-${addZero(t.getDate())} ${addZero(t.getHours())}:${addZero(t.getMinutes())}`
  return string
}

const utils = { timeStringToLocal }

Vue.prototype.$utils = utils

