import { IMyApp } from '../../app'
import { request } from '../../utils/request/index'
import { API } from "../../config/cgi-config";
import { doLogin } from "../../api/loginApi";
import { checkName, checkPhone } from "../../utils/util"

const app = getApp<IMyApp>()

Page({
  data: {
    realName: '',
    phone: '',
    ctx: {},
  },
  onLoad() {
    let _this = this
    this.setData!({
      ctx: wx.createCameraContext()
    })

    wx.login({
      success(_res) {
        doLogin().then((res: any)=>{
          console.log(res)
          if(res.data){
            app.globalData.userInfo = res.data
            if(res.data.realName || res.data.phone)
            _this.setData!({
              realName: res.data.realName,
              phone: res.data.phone
            })
          }
        })
        // 发送 _res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  submit(): void {
    if(this.data.realName === ''){
      console.log('姓名不能为空')
    }else if(!checkName(this.data.realName)){
      console.log('姓名格式不正确')
    }else if(this.data.phone === ''){
      console.log('手机号不能为空')
    }else if(!checkPhone(this.data.phone)){
      console.log('手机格式不正确')
    }else{
      const data = {
        realName: this.data.realName,
        phone: this.data.phone,
        id: app.globalData.userInfo.id
      }
      console.log(data)
      request({
        url: API.editMsg,
        data: data
      }).then((res:any)=>{
        console.log(res)
        if(res.success){
          console.log('提交成功')
        }
      })
    }
  },
  bindRealNameInput(e: any): void {
    this.setData!({
      realName: e.detail.value
    })
  },
  bindPhoneInput(e: any): void {
    this.setData!({
      phone: e.detail.value
    })
  },
  // 打开模拟的相机界面
  open() {
    // this.data.ctx.takePhoto({
    //   quality: 'high',
    //   success: (res: any) => {
    //     console.log('sdsd')
    //     this.setData!({
    //       src: res.tempImagePath
    //     })
    //   },
    //   fail: () => {
    //     console.log('失败')
    //   }
    // })
  }
})
