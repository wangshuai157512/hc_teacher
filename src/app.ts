//app.ts
import {doLogin} from './api/loginApi'

export interface IMyApp {
  userInfoReadyCallback?(res: wx.UserInfo): void
  globalData: {
    userInfo?: any,
    // 好友邀请进来，好友的token等信息
    token?: null,
    type?: null,
    id?: null,
    systemInfo?:null
  }
}

App<IMyApp>({
  onLaunch() {
    if (wx.getUpdateManager) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate( () => {
        // 请求完新版本信息的回
      })

      updateManager.onUpdateReady( () => {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        })
      })

      updateManager.onUpdateFailed( () => {
        // 新版本下载失败
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用自动更新版本功能，请升级到最新微信版本或手动更新。'
      })
    }

    // 展示本地存储能力
    let logs: number[] = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    let _this = this
    //获取用户机型
    wx.getSystemInfo({
      success : (res:any) => {
          _this.globalData.systemInfo = res
      },
     
    })

    // 登录
    wx.login({
      success(_res) {
        doLogin().then((res: any)=>{
          if(res.data){
            _this.globalData.userInfo = res.data
          }
          if (_this.getData) {
              _this.getData(res.data)
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              // this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res.userInfo)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo:{}
  },
})
