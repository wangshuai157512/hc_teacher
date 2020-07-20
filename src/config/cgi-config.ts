// 是否开发环境
const isDev: boolean = false;

const ResourseUrl = "https://uec.chinaedu.net";
const TextUrl = "http://localhost:3002";
// const TextUrl = "http://172.16.17.234:3002";
const normalUrl : string = isDev ? TextUrl : ResourseUrl
// 开发 HOST
const DEV_HOST = "http://localhost:3002/wx";
// const DEV_HOST = "http://172.16.17.234:3002/wx";
// const DEV_HOST = "https://uec.chinaedu.net/wx";
const NORMAL_HOST = "https://uec.chinaedu.net/wx";

export const HOST: string = isDev ? DEV_HOST : NORMAL_HOST;

// 支付成功后的回调url
const NotifyUrl = ResourseUrl + "/wx/api/app_shopping/accept";
const NotifyUrlDev = DEV_HOST + '/api/app_shopping/accept'

export const API = {
  normalUrl: normalUrl,
  NotifyUrl: NotifyUrl,
  NotifyUrlDev: NotifyUrlDev,
  login: HOST + `/api/app_login/teacherLogin`,// 小程序进入登录
  loginAuth: HOST + `/api/app_login/teacherLoginAuth`,// 小程序授权登录
  getMsg: HOST + `/api/app_login/getMsg`,// 小程序获取用户最新信息
  bannerList: HOST + `/api/app_banner/banner_list`,// 获取首页轮播图
  addCoupon: HOST + `/api/app_coupon/addCoupon`,// 发放优惠券
  courseStage: HOST + `/api/app_banner/course_stage`,// 获取首页轮播图
  means: HOST + `/api/app_banner/data_detail`,// 获取首页轮播图
  getTeacherCourse: HOST + `/api/app_teacherCourse/getCourseList`,// 查精品课程信息
  lookTeacherCourse: HOST + `/api/app_teacherCourse/look`,// 查询单条课程信息
  teacherPhoneAuth: HOST + `/api/app_login/teacherPhoneAuth`,// 授权手机号
  teacherLook: HOST + `/api/app_coupon/teacher_look`,// 查询支付金额
  editMsg: HOST + `/api/app_login/editMsg`,// 完善个人信息
  getCoupon: HOST + `/api/app_couponOrder/getCoupon`,// 获取优惠卷
  getOrder: HOST + `/api/app_order/get`,// 查询订单
  getShare: HOST + `/API/app_share/get`,//查询获奖单号
  getPayMsg: HOST +`/api/app_shopping/pay`,//获取支付前信息
  payMoney: HOST + `/api/app_shopping/payMoney`,//用户付款成功
  updateCouponState: HOST + `/api/app_coupon/updateCouponState`,//修改优惠券状态
  sendTemplate: HOST + `/api/app_shopping/sendTemplate`,//发送模板消息
  getData: HOST + `/query-data`,
  cancelOrder : HOST + '/api/app_order/cancelOrder', //取消订单
  deleteOrder : HOST + '/api/app_order/closeOrder', //删除订单
  orderStatus : HOST + '/api/app_order/orderComplete', //支付前查看订单状态
  originalCourse : HOST + '/api/app_teacherCourse/originalCourse', //查询正价课程
  questionList : HOST + '/api/app_topic/get_question_list', //查询试题分类 教资type= 0
  questionDetail : HOST + '/api/app_topic/get_question_detail', //查询试题内容 教资type= 0 id
  questionInfo : HOST + '/api/app_topic/get_course_info' ,//查询试题内容 教资type= 0 id
  // showContent : HOST + '/api/it_login/iteduIsShowContent' //修改审核状态
};
