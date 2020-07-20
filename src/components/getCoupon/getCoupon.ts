import { IMyApp } from '../../app'
import { request } from '../../utils/request/index'
import { API } from "../../config/cgi-config";

const app = getApp<IMyApp>()
let ajaxState: boolean = false;
let tapState: boolean = false;
Component({
    properties: {
        type : {
            type : [String,Number],
            value : 0
        },
        bodyHour : {
            type : String,
            value: ''
        },
        cup : {
            type : String,
            value : ''
        },
        bodyMes :{
            type : String,
            value : ''
        },
        foot : {
            type : String,
            value : ''
        },
        user: {
            type : [String,null],
            value : ''
        }
    },
    data: {
        // open : false
    },
    lifetimes: {
        ready: function() {
          // 在组件实例进入页面节点树时执行
          console.log(app.globalData.userInfo)
        }
      },
    methods: {
        getUserInfo(e: any) {
             //用户未授权 需授权登录
            if(ajaxState) return;
            wx.showLoading({
            title: '授权中',
            })
            let _this = this
            if (e.detail.rawData) {
            ajaxState = true
            wx.getUserInfo({
                success: function(res) {
                let encryptedData = res.encryptedData
                let iv = res.iv
                wx.login({
                    success: resLogin => {
                    let data: object = {};
                        data = {
                        code: resLogin.code,
                        encryptedData: encryptedData,
                        iv: iv
                        }
                    // console.log(data)
                    request({
                        url: API.loginAuth,
                        data: data,
                    }).then((res: any)=>{
                        // console.log(res)
                        if(res.data.data) {
                        _this.setData!({
                            userInfo: res.data.data[0]
                        })
                        app.globalData.userInfo = res.data.data[0]
                        wx.showToast({
                            title: '授权成功',
                            icon: 'success',
                            duration: 2000
                        })
                        wx.hideLoading({})
                        ajaxState = false;
                        request({
                            url: API.addCoupon,
                            data: {
                                user_id : app.globalData.userInfo.id,
                                type: 0
                            }
                        }).then((res:any)=>{
                                // console.log(res)
                                if(res.data.success) {
                                    _this.triggerEvent("sonEvent", {userState: true} )
                                }else {
                                    console.log('获取优惠券失败')
                                }
                            }).catch((err:any)=> {
                                console.log(err)
                                _this.triggerEvent("sonEvent", {userState: true} )
                            })
                        } else {
                        wx.hideLoading({})
                        ajaxState = false;
                        }
                    }).catch((err: any) => {
                        console.log(err)
                        wx.hideLoading({})
                        ajaxState = false;
                    })
                    },
                    fail: () => {
                    wx.hideLoading({})
                    ajaxState = false;
                    },
                })
                },
                fail: function() {
                wx.hideLoading({})
                ajaxState = false;
                }
            })
            } else {
            wx.hideLoading({})
            ajaxState = false;
            }
        },
        goCourse() {
            if(tapState) return;
            tapState=true
            request({
                url: API.addCoupon,
                data: {
                    user_id : app.globalData.userInfo.id,
                    type: 0 
                }
            }).then((res:any)=>{
                    // console.log(res)
                    if(res.data.success) {
                        this.triggerEvent("sonEvent", {userState: true} )
                    }else {
                        console.log('获取优惠券失败')
                    }
                }).catch((err:any)=> {
                    console.log(err)
                    this.triggerEvent("sonEvent", {userState: true} )  
                })
        },
            // console.log(111)s
        goReply () {
            this.triggerEvent("sonEvent", {replyState: false} )
        }
    }
})
