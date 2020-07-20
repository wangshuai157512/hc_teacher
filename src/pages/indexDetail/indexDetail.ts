//indexCourse.js
import { IMyApp } from '../../app'
// import { doLogin } from "../../api/loginApi";
import { getVideoInfo, process } from '../../utils/util'
import { request } from '../../utils/request/index'
import { API } from "../../config/cgi-config";
// import { orderStatus } from '../../utils/request/common'

const app = getApp<IMyApp>()
let ajaxState: boolean = false;
let query: any;
let title:any

Page({
  onReady() {
    // this.videoContext = wx.createVideoContext('myVideo')
  },
  data: {
    system:'',
    finishLoadFlag: true,
    isHide: 'true',
    isShowContent: '',
    id: null, // 课程ID
    suitablePerson: null, // 课程类型
    type: null,
    courseId: null, // 传给下个页面的
    courseType: null, // 传给下个页面的
    userInfo: {},
    isPay: false,
    navStyle:'',
    boxStyle:'display:block;',
    courseInfo:{  },
    normalUrl: '',
    imgalist:['http://www.pmhuai.top:3002/kefu.jpg'],
    rightNav:[
      {
        id:'1',
        name:'课程介绍',
      },
      {
        id:'2',
        name:'课程目录',
      },
      {
        id:'3',
        name:'为你推荐',
      }
    ],
    heightImage: null, //图片高度
    videoList: null, // 课程目录
    // hasMore: null, // 加载状态
    navPoint: 0,
    disCount : 0,
    // scrollTop: 400,
    videorc: '',
    // isHide: false,
    // rowHeight: 210,
    // videoContext: null
  },

  finishLoad: function () {
    this.setData!({
      finishLoadFlag: false
    })
  },
  onLoad(options: any) {
    this.showContent()
    // console.log(app.globalData)
    this.setData!({
      system: app.globalData.systemInfo.platform
    }),
    this.setData!({
      id: options.id,
      suitablePerson: options.suiTablePerson,
    })
    this.setData!({
      normalUrl: API.normalUrl,
    })
  },
  onShow() {

    wx.showLoading({
      title:'加载中',
      mask: true
    })
    const data = {
      id: this.data.id,
      suitablePerson: this.data.suitablePerson,
      userId: app.globalData.userInfo.id
    }
    request({
      url:API.lookTeacherCourse,
      data: data
    }).then((res: any)=>{
      wx.hideLoading({})
     this.setData!({
      courseInfo: res.data.course,
      courseId: res.data.course.id,
      courseType: res.data.course.type,
      isPay: res.data.course.isPay,
      disCount : res.data.course.disCount,
      type:res.data.course.type
     })
     this.setHeight()
     this.videoList()
     this.setVideo(res.data.course.videoUrl)
    }).catch((err)=> {
      wx.hideLoading({})
      console.log(err)
    })
    if (app.globalData.userInfo) {
      this.setData!({
        userInfo: app.globalData.userInfo
      })
    }
  },
  // 获取图片高度
  setHeight(): void {
    query = wx.createSelectorQuery()
    query.select('.head_image').boundingClientRect((rect: any) => {
      this.setData!({
        heightImage:rect.height + 111
      })
      // heightImage = rect.height + 50
    }).exec();
  },
  startPlay() {
    this.setData!({
      isHide: false
    })
  },
  setVideo(url: any){
    let _this = this
    let firstVid: any;
    firstVid = getVideoInfo(url);

    wx.request({
      url: firstVid,
      data: {},
      method: 'POST',
      success: (res: any) => {
        const newDataUrl = process(res);
        _this.setData!({
          videorc: newDataUrl
        })
        // setTimeout(()=>{
        //   _this.videoContext.play()
        // },1)
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  // 点击列表头
  setScrollTop(e:any) {
    this.setData!({
      navPoint: e.currentTarget.dataset.index,
      // navStyle: 'position:fixed;top:0;',
      // boxStyle: 'display:none;'
    })
  },
  // 视频列表
  videoList() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: `${this.data.normalUrl}${this.data.courseInfo.videoUrl}`,
      success: (res:any)=> {
        this.setData!({
          videoList:res.data.data,
          // videoUrl:res.data.data[this.data.videoIndex].videoUrl,
          // videoNum : res.data.res[this.data.videoIndex].no,
          // videoTime : res.data.data[this.data.videoIndex].time
        })
        wx.hideLoading({})
      },
      fail () {
        wx.hideLoading({})
        console.log('系统异常')
      }
    })
  },

  // 分享
  onShareAppMessage(): any {
    if(this.data.suitablePerson==1) {
      title='给你分享一个教资好课'
    }else {
      title='给你看一个教资笔试课，很划算！'
    }
    return {
      title: title,
      path: `/pages/indexDetail/indexDetail?id=${this.data.id}&suiTablePerson=${this.data.suitablePerson}`
      // imageUrl: this.data.normalUrl + this.data.courseInfo.imgUrl,
    }
},
  onPageScroll(e: any): void {
    if(e.scrollTop >= this.data.heightImage) {
      this.setData!({
        navStyle: 'position:fixed;top:0;',
        // boxStyle: 'display:block;'
      })
    }else{
      this.setData!({
        navStyle: '',
        // boxStyle: 'display:none;'
      })
    }
  },
 //用户未授权 需授权登录
 getUserInfo(e: any) {
  if(ajaxState) return;
  // wx.showLoading({
  //   title: '授权中',
  // })
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
            request({
              url: API.loginAuth,
              data: data,
            }).then((res: any)=>{
              if(res.data.data) {
                _this.setData!({
                  userInfo: res.data.data[0]
                })
                app.globalData.userInfo = res.data.data[0]
                // wx.showToast({
                //   title: '授权成功',
                //   icon: 'success',
                //   duration: 2000
                // })
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
  if(e.detail.errMsg==="getPhoneNumber:ok") {
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
            wx.showToast({
              title:"授权成功",
              icon: "none"
            })
            app.globalData.userInfo=res.data.data
            setTimeout(()=>{
              _this.linkTo()
            },500)
          }
        })
      }else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
  }else {
    wx.showToast({
      title:"请先授权手机号",
      icon: "none"
    })
  }

},
  change_data (e:any):void {
    if(this.data.isShowContent) {
      return
    }
    let id:any = e.currentTarget.dataset.id
    let type:any = e.currentTarget.dataset.type
    wx.navigateTo({
        url : `../indexDetail/indexDetail?id=${id}&suiTablePerson=${type}`
    })
  } ,
  linkTo() {
    let nextId= this.data.courseId
    let nextType= this.data.courseType
    let type=0
    wx.navigateTo({
                  url: '../payPhone/payPhone?id='+nextId+'&courseType='+nextType+'&type='+type
                })
  },
  // previewImage(): void {
  //   wx.previewImage({
  //     current: this.data.imgalist[0], // 当前显示图片的http链接
  //     urls: this.data.imgalist // 需要预览的图片http链接列表
  //   })
  // },
  // 审核模式
  showContent() {
    wx.request({
      url:"https://xxzx.chinaedu.net/wx/api/it_login/iteduIsShowContent",
      data:{name:"teacher"},
      method: 'POST',
      success: (res: any) => {
        this.setData!({
          isShowContent:res.data.data
        })
        // console.log(res.data.data)
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  // 观看视频
  see(){
    wx.navigateTo({
      url:`../video/video?videoUrl=${this.data.normalUrl}${this.data.courseInfo.videoUrl}&imgUrl=${this.data.courseInfo.bannerUrl}`
    })
  },
  handUrl (e:any) {
    if(this.data.system=="ios" || this.data.isShowContent) {
      return
    }
    if (!this.data.isPay) {
      wx.showToast({ title : '购买后才能播放哦' ,icon : 'none'})
    }else {
        let dataIndex = e.currentTarget.dataset.index
        wx.navigateTo({
            url:`../video/video?dataIndex=${dataIndex}&videoUrl=${this.data.normalUrl}${this.data.courseInfo.videoUrl}&imgUrl=${this.data.courseInfo.bannerUrl}`
        })
    }

  }
})
