//index.js
//获取应用实例
import { IMyApp } from '../../app'
import { request } from '../../utils/request/index'
import { API } from "../../config/cgi-config";

const app = getApp<IMyApp>()

let token: any;
let type: number = 0;
let id: number;

Page({
  data: {
    system: '',
    isOpenDialog: false,
    userInfo: {},
    hasUserInfo: false,
  },
  onShow() {
    if (app.globalData.userInfo.user) {
      this.setData!({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true,
      })
  }else {

  }
  },
  onLoad(options: any) {
    this.setData!({
      system: app.globalData.systemInfo.platform
    })
    if(app.globalData.userInfo.user) {
        this.setData!({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true,
    })
    }else {
      app.getData = (data:any)=> {
        this.setData!({
          userInfo: app.globalData.userInfo
        })
      }
    }
  
    if (options.token) {
      token = options.token
      type = options.type
      id = options.id
      app.globalData.token = options.token
      app.globalData.type = options.type
      app.globalData.id = options.id
    }
    
  },

  getUserInfo(e: any) {
    wx.showLoading({
      title: '授权中',
    })
    let _this = this
    if (e.detail.rawData) {
      wx.getUserInfo({
        success: function(res) {
          let encryptedData = res.encryptedData
          let iv = res.iv
          wx.login({
            success: resLogin => {
              let data: object = {};
              if(token === ''){
                data = {
                  code: resLogin.code,
                  encryptedData: encryptedData,
                  iv: iv,
                }
              }else{
                data = {
                  code: resLogin.code,
                  encryptedData: encryptedData,
                  iv: iv,
                  token: token,
                  type: type,
                  id: id,
              }
              }
              console.log(data)
              request({
                url: API.loginAuth,
                data: data,
              }).then((res: any)=>{
                console.log(typeof res)
                if(res.data.data) {
                  console.log(res.data)
                  _this.setData!({
                    userInfo: res.data.data[0],
                    hasUserInfo: true,
                  })
                  app.globalData.userInfo = res.data.data[0]
                  wx.hideLoading({})
                } else {
                  wx.hideLoading({})
                }
              }).catch(() => {
                wx.hideLoading({})
              })
            },
            fail: () => {
              wx.hideLoading({})
            }
          })
        },
        fail: function() {
          wx.hideLoading({})
        }
      })
    } else {
      wx.hideLoading({})
    }
  },
  cunpon () {
    wx.navigateTo({
      url: '../coupon/coupon'
    })
  },
  closeDialog(): void {
    this.setData!({
      isOpenDialog: false
    })
  },
  formSubmit(e: any): void {
    console.log(e.detail.formId)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
})
