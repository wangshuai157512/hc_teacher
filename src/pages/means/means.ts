import { API } from "../../config/cgi-config"
import { IMyApp } from '../../app'
import { request } from '../../utils/request/index'
const app = getApp<IMyApp>()

let ajaxState: boolean = false;
Page({
    data: {
      finishLoadFlag: true,
        teachInfo: {
          id: null
        },
        system: '',
        normalUrl: '',
        isPay: false, // 是否购买
        userInfo: {},
        code: null,
        encryptedData: null,
        iv: null,
        imgList: [],
        filePath : null,
        downloadProgress : 0
    },
    finishLoad: function () {
      this.setData!({
        finishLoadFlag: false
      })
    },
    // 资料详情信息
    lodTitle() {
        let id = 1
        let user_id = app.globalData.userInfo.id
        let _this= this
        wx.request({
            url: API.means,
            data: {id,user_id},
            success: function(res:any) {
                if(res.data.success) {
                    _this.setData!({
                        teachInfo: res.data.data,
                        isPay: res.data.data.isPay,
                        filePath : res.data.data.data_url
                      })
                }
                if(app.globalData.userInfo) {
                   _this.setData!({
                    userInfo: app.globalData.userInfo
                   })
                }
            }
        })
    },
    look: function () {
        let _this = this
        // @ts-ignore
        const downloadTask: any = wx.downloadFile({
            url: `${this.data.normalUrl}${_this.data.filePath}`,
            success: (res: any) => {
                const filePath: any = res.tempFilePath
                wx.openDocument({
                    filePath: filePath,
                    fileType: 'pdf',
                    success: (data: any) => {
                        console.log(data)
                    },
                    fail: (err: any) => {
                        console.log(err)
                    }
                })
            }
        })
        downloadTask.onProgressUpdate((res: any) => {
            let progress: string | number = res.progress
            _this.setData!({
                downloadProgress: progress
            })
            wx.showLoading({
                title: `正在打开${_this.data.downloadProgress}%`
            })
            if (progress === 100) {
                wx.hideLoading({})
            }
        })
    },
    
    // openDocument ():void {
    //     let _this:any = this
    //     wx.getSavedFileList({
    //       success (res:any) {
    //         if(res.fileList.length>0) {
    //           console.log(111)
    //           const savedFilePath:string = res.fileList[0].filePath;
    //           console.log(savedFilePath)
    //           wx.openDocument({
    //               filePath : savedFilePath,
    //               fileType : 'pdf',
    //               success : (data:any) => {
    //                   console.log(data)
    //               },
    //               fail : (err:any) => {
    //                   console.log(err)
    //               }
    //           })
    //         }else {

    //         }
    //       }
    //     })
    //     const downloadTask:any = wx.downloadFile({
    //       url : _this.data.filePath,
    //       success : (res:any) => {
    //           console.log(res)
    //           const filePath:any = res.tempFilePath
    //           // _this.FileSystemManager.saveFile({
    //           //   tempFilePath: filePath,
    //           //   success: (res:any)=> {
    //           //     console.log(res)
    //           //   }
    //           // })
    //           // wx.saveImageToPhotosAlbum({
    //           //   filePath: filePath,
    //           //   success:(res:any)=> {
    //           //     console.log(res)
    //           //   }
    //           // })
    //           // wx.saveFile({
    //           //     tempFilePath : filePath,
    //           //     success : (res:any) => {
    //           //         const savedFilePath:string = res.savedFilePath;
    //           //         wx.openDocument({
    //           //             filePath : savedFilePath,
    //           //             fileType : 'pdf',
    //           //             success : (data:any) => {
    //           //                 console.log(data)
    //           //             },
    //           //             fail : (err:any) => {
    //           //                 console.log(err)
    //           //             }
    //           //         })
    //           //     }
    //           // })
    //       }
    //   })
    //   downloadTask.onProgressUpdate((res:any) => {
    //       let progress:string|number = res.progress
    //       _this.setData!({
    //           downloadProgress : progress
    //       })
    //       wx.showLoading({
    //           title : `正在下载${_this.data.downloadProgress}%`
    //       })
    //       if (progress === 100) {
    //           wx.hideLoading({})
    //       }
    //   })
    // },
    onLoad() {
      this.setData!({
        system: app.globalData.systemInfo.platform,
      })
      wx.getSetting({
        success (res) {
          console.log(res.authSetting)
          // res.authSetting = {
          //   "scope.userInfo": true,
          //   "scope.userLocation": true
          // }
        }
      })

      // this.FileSystemManager=wx.getFileSystemManager()
      // this.FileSystemManager.getSavedFileList({
      //   success: (res:any)=> {
      //     console.log(res)
      //   }
      // })
      // console.log(app.globalData.userInfo)
        this.setData!({
            normalUrl: API.normalUrl,
            userInfo: app.globalData.userInfo
        })
        // console.log(this.data.userInfo)
    },
    onShow() {
      this.lodTitle()
    },
      // 分享
  onShareAppMessage(): any {
    return {
      title: '《综合素质》高频考点',
      path: '/pages/means/means'
      // imageUrl: this.data.normalUrl + this.data.courseInfo.imgUrl,
    }
},
      //用户未授权 需授权登录
      getUserInfo(e: any) {
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
                        userInfo: res.data.data[0],
                        hasUserInfo: true,
                      })
                      app.globalData.userInfo = res.data.data[0]
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 2000
                      })
                      wx.hideLoading({})
                      ajaxState = false;
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
      // 获取手机号
      getPhoneNumber (e: any) {
        let _this= this
        let {encryptedData,iv} = e.detail
        wx.login({
          success(res: any) {
            if(res.code) {
              request({
                url:API.teacherPhoneAuth,
                data:{
                  code:res.code,
                  encryptedData,
                  iv
                }
              }).then((res:any)=> {
                if (res.data.success) {
                  _this.setData!({
                    userInfo: res.data.data

                  })
                  app.globalData.userInfo=res.data.data
                }
              })
            }else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
    },
    // 跳转支付页
    linkTo(e:any) {
      let id= this.data.teachInfo.id
      let type= 1
      // let courseType= null
      wx.navigateTo({
                    url: `../payPhone/payPhone?id=${id}&type=${type}`
                  })
    }

})
