import { IMyApp } from '../../app'
import { request } from '../../utils/request/index'
import { API } from "../../config/cgi-config";
import {orderStatus} from "../../utils/request/common";

const app = getApp<IMyApp>()
let payState: number

Page({
  data: {
    system: '',
    loading: 1,
    currentTab:0,
    list:[],
    timeList:[],
    swiperHeight:'',
    normalUrl: '',
    isHasData: false,
    orderMsg : ''
  },
  loadMsg(type: number) {
    this.setData!({
      timeList:[]
    })
    clearInterval(this.timer_list)
    wx.showLoading({
      title: '加载中'
    })
    let _this = this
    if(type === 0) {
      payState = 1
    }else if(type === 1){
      payState = 0
    } else {
      payState = 2
    }
    const data = {
        id:app.globalData.userInfo.id,
        type:payState,
        page: 1,
        limit: 10,
    }
    request({
      url:API.getOrder,
      data:data,
    }).then((res: any)=>{
      wx.hideLoading({})
      if(res.data.course.length === 0) {
        _this.setData!({
          loading:0
        })
      }else{
        _this.setData!({
          list:res.data.course,
          // swiperHeight: 190*res.data.course.length,
          loading:2
        })
        if(payState==0) {
          for(var i=0; i<this.data.list.length; i++) {
            this.data.timeList.push({endTime:this.data.list[i].endTime,id:this.data.list[i].id,isdata:this.data.list[i].isdata})
          }
          this.timer_list = setInterval(this.expiryData,1000)
        }
        // let query = wx.createSelectorQuery()
        // query.select('#list' + _this.data.currentTab).boundingClientRect(()=>{})
        // query.selectViewport().scrollOffset(()=>{})
        // query.exec(function (res : any) {
        //     _this.setData!({
        //       swiperHeight : (res[0].height + 20)*_this.data.list.length
        //     })
        // })
      }
    }).catch((err:any)=> {
      console.log(err)
      wx.hideLoading({})
    })
  },
  // 点击跳转播放页（资料/课程）
  handleSee(e:any) {
    let id=e.currentTarget.dataset.courseid
    let suitablePerson=e.currentTarget.dataset.suitableperson
    if(e.currentTarget.dataset.isdata==0) {
      wx.navigateTo({
        url: '../means/means'
      })
    }else if(e.currentTarget.dataset.isdata==undefined) {
      wx.navigateTo({
        url: `../indexDetail/indexDetail?id=${id}&suiTablePerson=${suitablePerson}`
      })
    }else {
      console.log('系统错误')
    }
  },
  onUnload() {
    clearInterval(this.timer_list)
  },
  //点击缺醒图回到首页
  go_index () {
    if (this.data.currentTab == 0) {
      wx.switchTab({
        url: '../index/index'
      })
    }
  },
  //取消支付
  cancelPay (e : any) {
    let id = e.target.dataset.id
    let isdata = e.target.dataset.isdata
    this.canPay(id,isdata)
  },
  canPay(id:any,isdata:any) {
    let _this = this
    let type : any;
    if (isdata === 0) {
        type = 1
    }else {
        type = 0
    }
    request({
        url : API.cancelOrder,
        data : { id , type}
    }).then((res: any)=>{
      if (res.data.success) {
        wx.showToast({
          title: '取消成功',
          icon: 'success',
          duration: 2000
        })
        _this.loadMsg(_this.data.currentTab)
      }
    }).catch(()=>{
      wx.showToast({
        title: '取消失败',
        duration: 2000
      })
    })
  },
  //删除订单
  deleteOrder (e : any) {
    let id = e.target.dataset.id
    let isdata = e.target.dataset.isdata
    let _this = this
    let type : any;
    if (isdata === 0) {
        type = 1
    }else {
        type = 0
    }
    request({
        url : API.deleteOrder,
        data : {id ,type}
    }).then((res: any)=>{
        if (res.data.success) {
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
          _this.loadMsg(_this.data.currentTab)
        }
    }).catch(()=>{
      wx.showToast({
        title: '删除失败',
        duration: 2000
      })
    })
  },
  //支付订单
  paymentOrder (e : any) {
    let _this = this
    let type: any
    wx.showLoading({
      title: '请稍等...',
    })
    const { courseid, outtradeno, noncestr, title, price ,isdata } = e.target.dataset
    if (isdata === 0) {
      type = 1
    } else {
      type = 0
    }
    if (app.globalData.userInfo && app.globalData.userInfo.token && app.globalData.userInfo.id && courseid){
        orderStatus(app.globalData.userInfo.id,courseid,type).then((response : any) => {
          if (response.data.success) {
            if (response.data.isPay == 0) {
                request({
                    url: API.getPayMsg,
                    data: {
                        openId: app.globalData.userInfo.openId,
                        id: app.globalData.userInfo.id,
                        courseId: courseid,
                        desc: '学程教育-课程支付',
                        totalPrice: price,
                        // totalPrice: 0.01,
                        notify_url: API.NotifyUrl,
                        isOrderPay: 1,
                        merchOrderId: outtradeno,
                        nonceStr:noncestr,
                        payType : type
                    }
                }).then((res: any)=>{
                    wx.hideLoading({})
                    if (res.data.success) {
                        wx.requestPayment({
                            timeStamp: res.data.res.timeStamp,
                            nonceStr: res.data.res.nonceStr,
                            package: res.data.res.package,
                            signType: res.data.res.signType,
                            paySign: res.data.res.paySign,
                            success : function(resPay: any) {
                                if(resPay.errMsg === 'requestPayment:ok'){
                                    _this.loadMsg(_this.data.currentTab)
                                    wx.showToast({
                                        title: '支付成功',
                                        icon : "none",
                                        duration: 2000
                                    })
                                    // 获取优惠券状态
                                    // if(resData.data.data.hasCoupon && resData.data.data.coupon_id) {
                                    //     _this.upDataCoupon(app.globalData.userInfo.id,resData.data.data.coupon_id)
                                    // }
                                    // 发送模板消息
                                    _this.requestPay(res.data.prepayId,res.data.outTradeNo,title,price,courseid)
                                }
                            },
                            fail() {
                                wx.showToast({
                                    title: '支付失败',
                                    icon : "none",
                                    duration: 2000
                                })
                            },
                        })
                    }
                }).catch(()=>{
                    wx.hideLoading({})
                    wx.showToast({title:'支付失败,请重新下单',icon : 'none'})
                })

            } else {
              wx.showToast({
                title: '您已购买过该课程了哦~',
                icon : "none",
                duration: 2000
              })
            }
          }
        })
    }else {
    }
  },
  onLoad() {
    this.setData!({
      system: app.globalData.systemInfo.platform,
      normalUrl: API.normalUrl
    }),
    this.loadMsg(this.data.currentTab)
  },
  //滑动切换
  swiperTab:function( e: any ){
    let _this=this;
    _this.setData!({
      currentTab:e.detail.current,
      timeList:[]
    });
    _this.loadMsg(this.data.currentTab)
  },
  //点击切换
  clickTab( e: any ): any {
    let _this=this;
    if( _this.data.currentTab === e.target.dataset.current ) return false
    _this.setData!( {
      loading: 1,
      list: [],
      timeList:[]
    })
    // this.loadMsg(parseInt(e.target.dataset.current))
    _this.setData!( {
      currentTab: e.target.dataset.current
    })
  },
  formatting (time:any) {
      let date = new Date(time)
      let m:any = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s:any = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return m + ':' + s;
  },
  formdate (time:any,id:any,isdata:any) {
    let nowTime=Date.now();
    // let startTime = new Date(startTime).getTime()
    let endTime = new Date(time).getTime()
    let dateTime = endTime - nowTime
    // console.log(nowTime)
    // console.log(endTime)
    if(dateTime<0) {
      this.canPay(id,isdata)
    }
    return this.formatting(dateTime)
  },
  // 获取失效时间
  expiryData() {
    for(var i=0; i<this.data.timeList.length; i++) {
        this.data.timeList[i].endTime = this.data.timeList[i].endTime.replace(/-/g, '/')
        this.data.timeList[i].time = this.formdate(this.data.timeList[i].endTime,this.data.timeList[i].id,this.data.timeList[i].isdata)
    }
    this.setData!({
      timeList: this.data.timeList
    })
  },
   // 支付成功更新优惠券状态
   upDataCoupon(userId: any,couponId: any) {
    request({
      url: API.updateCouponState,
      data: {
        user_id: userId,
        id: couponId
      }
    }).then((res)=> {
      console.log(res)
    })
  },
  requestPay(prepayId: number,outTradeNo: any,title: string, price: any, courseid: number): void {
    request({
      url: API.sendTemplate,
      data: {
        userId: app.globalData.userInfo.id,
        prepayId: prepayId,
        outTradeNo: outTradeNo,
        courseName: title,
        price: price,
        courseId: courseid,
      }
    }).then((res: any)=>{
      console.log(res)
    })
  },
})
