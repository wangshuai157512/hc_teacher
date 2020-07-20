
/**
 * 正则表达式校验类
 */

/**
 * 中文名称验证
 * @param name
 * @returns {boolean}
 */
export function checkName(name: string) {
  let reg = new RegExp(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/);
  return reg.test(name);
}

/**
 * 手机号验证
 * @param phone
 * @returns {boolean}
 */
export function checkPhone(phone: string) {
  let reg = new RegExp(/^1[345678]\d{9}$/);
  return reg.test(phone);
}

/**
 * 身份证验证
 * @param idCard
 * @returns {boolean}
 */
export function checkIdCard(idCard: string) {
  let id1 = new RegExp(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/);
  return id1.test(idCard);
}

/**
 * Email检测
 * @param email
 * @returns {boolean}
 */
export function checkEmail(email: string) {
  let reg = new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/);
  return reg.test(email);
}

/**
 * 中文检测
 * @param str
 * @returns {boolean}
 */
export function checkChinese(str: string) {
  let reg = new RegExp(/^([\u4E00-\u9FA5])*$/);
  return reg.test(str);
}

/**
 * url 检测
 */

export function checkUrl(value: string) {
  let reg = new RegExp(/(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/);
  return reg.test(value)
}


export function formatTime(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = (n: number) => {
  const str = n.toString()
  return str[1] ? str : '0' + str
}

export function getVideoInfo (vedio: string) {
  if (!vedio) return false;
  let vid = vedio.substring(vedio.lastIndexOf('/') + 1, vedio.lastIndexOf('html') - 1);
  let urlString = 'https://vv.video.qq.com/getinfo?otype=json&appver=3.2.19.333&platform=11&defnpayver=1&vid=' + vid;
  return urlString;
}

export function process (item: any) {
  let dataJson = item.data.replace(/QZOutputJson=/, '');
  let newDataJson = dataJson.slice(0,dataJson.length-1);
  let data = JSON.parse(newDataJson);
  let fileName = data['vl']['vi'][0]['fn'];
  let fvkey = data['vl']['vi'][0]['fvkey'];
  let host = data['vl']['vi'][0]['ul']['ui'][0]['url']
  let videoUrl = host + fileName + '?vkey=' + fvkey
  return videoUrl;
}


