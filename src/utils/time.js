// 计算两个时间差 dateBegin 开始时间
export const timeFn = dateBegin => {
  dateBegin = new Date(dateBegin).getTime();
  //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
  var dateEnd = new Date(); //获取当前时间
  var dateDiff = dateEnd.getTime() - dateBegin; //时间差的毫秒数
  var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
  var leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
  //计算相差秒数
  var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000);
  var leave4 = leave3 % (60 * 1000); //计算分钟数后剩余的毫秒数
  var minseconds = Math.round(leave4 / 1000);
  let text_day = dayDiff != 0 ? dayDiff + '天' : '';
  let text_hours = hours != 0 ? hours + '小时' : '';
  let text_minutes = minutes != 0 ? minutes + '分前' : '刚刚';
  var timeFn = text_day + text_hours + text_minutes;
  return timeFn;
};
