import { IMyApp } from '../../app'
import { request } from '../../utils/request/index'
import { API } from "../../config/cgi-config";
import { orderStatus } from '../../utils/request/common'

const app = getApp<IMyApp>()
let courseId: any

let isClick : Boolean = false;
Page({
    data: {
      system: '',
      id: null, // 用户课程ID
      type: null,
      courseType: null,
      title: '',
      hasCoupon: false,
      userInfo: { },
      coupon: {},
      couponId: null, // 优惠券ID
      paymentPrice: null, //实付款价格
      course_price: null //课程原价
    },
    onShow() {
      // console.log(app.globalData.userInfo)
        this.setData!({
          userInfo: app.globalData.userInfo
        })
    },
    onLoad(options:any){
      this.setData!({
        system: app.globalData.systemInfo.platform,
      }),
      this.setData!({
        id: options.id,
        type: options.type,
        // courseType: options.courseType
      })
      this.lodCoup()
    },
    // 获取收货地址
    tapAddress() {
      wx.chooseAddress({
        success (res) {
          console.log(res.userName)
          console.log(res.postalCode)
          console.log(res.provinceName)
          console.log(res.cityName)
          console.log(res.countyName)
          console.log(res.detailInfo)
          console.log(res.nationalCode)
          console.log(res.telNumber)
        }
      })
    },
    // 请求页面金额，是否有优惠劵
    lodCoup() {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      const data= {
        user_id: app.globalData.userInfo.id,
        course_id: this.data.id,
        type: this.data.type,
        // course_type: this.data.courseType
      }
      request({
        url: API.teacherLook,
        data: data
      }).then((res:any)=> {

        this.setData!({
          coupon: res.data.data,
          title: res.data.data.title,
          course_price: res.data.data.course_price,
          hasCoupon: res.data.data.hasCoupon
        })
        if(res.data.data.course_price === 1) {
          this.setData!({
            paymentPrice: res.data.data.course_price
          })
        }else {
          this.setData!({
            paymentPrice: res.data.data.payment_price
          })
        }
        if(res.data.data.hasCoupon && res.data.data.course_price !== 1) {
          this.setData!({
            couponId: res.data.data.coupon_id
          })
        }
        wx.hideLoading({})
      }).catch((err)=> {
        console.log(err)
        wx.hideLoading({})
      })
    },
    // 查询是否支付

    startPay() {
      let _this = this
      if (isClick) {
        return
      }
      wx.showLoading({
        title: '请稍后',
        // mask: true
      })
      courseId= this.data.id,
      orderStatus(app.globalData.userInfo.id,courseId,this.data.type).then((res:any)=>{
        if (res.data.success) {
          isClick = true
          if (res.data.isPay == 0) {
            //真正的支付接口
            request({
              url: API.getPayMsg,
              data: {
                openId: app.globalData.userInfo.openId,
                id: app.globalData.userInfo.id,
                courseId: courseId,
                desc: '学程教育-课程支付',
                // totalPrice: this.data.paymentPrice,
                totalPrice: 0.01,
                spbill_create_ip: '172.16.17.234',
                notify_url: API.NotifyUrl,
                isOrderPay: 0,
                payType :  this.data.type, // 分辨课程支付还是资料支付
                couponId : this.data.couponId
              }
            }).then((res: any)=>{
              wx.hideLoading({})
              setTimeout(()=>{
                 isClick = false
              },300)
              wx.requestPayment({
                timeStamp: res.data.res.timeStamp,
                nonceStr: res.data.res.nonceStr,
                package: res.data.res.package,
                signType: res.data.res.signType,
                paySign: res.data.res.paySign,
                success: (resPay: any) => {
                  if(resPay.errMsg === 'requestPayment:ok'){
                    wx.showToast({
                      title: '支付成功',
                      duration: 2000
                    })
                    wx.hideLoading({})
                    setTimeout(()=>{
                      isClick = false
                    },300)
                  setTimeout(()=> {
                    wx.navigateBack({
                      delta: 1 // 返回上一级页面。
                    })
                  },800)
                    // 发送模板消息
                    this.requestPay(res.data.prepayId,res.data.outTradeNo,courseId)
                  }
                },
                fail() {
                  _this.lodCoup()
                  wx.showToast({
                    title: '支付失败',
                    icon : "none",
                    duration: 2000
                  })
                  wx.hideLoading({})
                  setTimeout(()=>{
                    isClick = false
                  },300)
                },
                complete() {
                }
              })
            }).catch((err: any)=>{
              wx.hideLoading({})
              setTimeout(()=>{
                isClick = false
              },300)
              console.log(err)
            })
          } else {
            wx.showToast({
              title: '您已购买过该课程了,请联系客服哦~',
              icon : "none",
              duration: 2000
            })
            wx.hideLoading({})
              setTimeout(()=>{
                isClick = false
              },300)
          }
      }else {
        wx.hideLoading({})
              setTimeout(()=>{
                isClick = false
              },300)
      }
      })
    },
    // 支付成功更新优惠券状态
    // upDataCoupon(userId: any,couponId: any,) {
    //   request({
    //     url: API.updateCouponState,
    //     data: {
    //       user_id: userId,
    //       id: couponId
    //     }
    //   }).then((res)=> {
    //     console.log(res)
    //   })
    // },
    // 发送模板消息
  requestPay(prepayId: number,outTradeNo: any,courseId: number): void {
    request({
      url: API.sendTemplate,
      data: {
        userId: app.globalData.userInfo.id,
        prepayId: prepayId,
        outTradeNo: outTradeNo,
        courseName: this.data.title,
        price: this.data.paymentPrice,
        courseId: courseId,
      }
    }).then((res: any)=>{
      console.log(res)
    })
  }
});
