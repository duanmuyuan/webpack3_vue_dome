import { search } from 'plugins/util.js';
import cookie from 'js-cookie';
import { post } from '../lib/request.js';

const BASEHOST = 'https://api.niuguwang.com/subscribe/';

export const COURSE_ID = '4396';
export const LIVE_ID = '698';
export const USERTOKEN = cookie.get('usertoken') || search('usertoken');

// 购买判断 生成订单信息 购买后 股票池列表 研判走势历史列表 根据用户ID取购买课程
export function getIsBuy(arg) {
  // return post('https://api.niuguwang.com/subscribe/Denver.ashx', arg);
  return post(`${BASEHOST}Denver.ashx`, arg);
}
// 今日策略
export function getDenver(arg) {
  return post(`${BASEHOST}Denver.ashx?action=denverinfonew&courseid=${COURSE_ID}`, arg);
}
// vip直播室点击查看更多，获取第一层列表
export function fetchLiveList(arg) {
  return post('https://live.niuguwang.com/video/Excellent/GetExcellentPart', arg);
}
// vip直播室，获取第二层列表
export function fetchLiveListDetail(arg) {
  return post('https://live.niuguwang.com/video/Excellent/VideoList', arg);
}
// 视频列表更多
export function getLive(arg) {
  return post('https://live.niuguwang.com/video/JueJinBaoQian/NewAfterBuy', arg);
}
// 课程预告
export function getCourse(arg) {
  return post(`${BASEHOST}trendcourse.ashx?action=coursetimeline&courseid=${COURSE_ID}`, arg);
}
// 股票池
// export function getPool(arg) {
//   return post(`${BASEHOST}trendcourse.ashx?action=stockpoollist&courseid=${COURSE_ID}`, arg);
// }
// 股票池2018
export function getPoolNew(arg) {
  return post(`${BASEHOST}trendcourse.ashx?action=stockpoollistnew&courseid=${COURSE_ID}`, arg);
}
// 股票池单项打开
export function getItemMore(arg) {
  return post(`${BASEHOST}trendcourse.ashx?action=stockpooldetailv2&courseid=${COURSE_ID}`, arg);
}
// 机构池
export function getCompany(arg) {
  return post(`${BASEHOST}CompanyPoolGet.ashx`, arg);
}
// 备选池
export function getAlternative(arg) {
  return post(`${BASEHOST}CompanyBaseGet.ashx`, arg);
}
// 内参
export function getReport(arg) {
  return post(`${BASEHOST}trendcourse.ashx?action=stockreportlist&courseid=${COURSE_ID}`, arg);
}
// 风险测试
export function getRiskTest(arg) {
  return post('https://api.niuguwang.com/subscribe/otherset.ashx', arg);
}
