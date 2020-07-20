import { IMyApp } from '../../app'
import { request } from '../../utils/request/index'
// import { share } from '../../utils/request/share'
import { API } from "../../config/cgi-config";

// import { doLogin } from "../../api/loginApi";

const app = getApp<IMyApp>()
let pagNum: number = 1;
let type: number = 0;
// let cancel:any;
// let notPrice: number;

Page({
  data: {
    system: '',
    user: '',
    isHasCoupon: true,
    imgUrls: [],
    currentSwiper:0,
    reply: false, // 点击出现回复弹窗
    list: [], // 精品课列表
    shoolList: [], //学生阶段列表
    suitablePerson: null,
    normalUrl: '',
    cancel: false, // 是否点击取消
    tab: ['幼儿', '小学', '中学'],
    period: ['幼儿阶段', '小学阶段', '中学阶段','中小学阶段'],
    banner_list: [
      {
        img : '../../public/images/banner001.jpg',
        path :"/pages/question/question"
      },
      {
        img : '../../public/images/banner002.jpg',
      },
      {
        img : '../../public/images/banner003.jpg',
        path :"/pages/means/means"
      },
      {
        img : '../../public/images/banner004.jpg',
        path :"/pages/projectBrief/projectBrief"
      }
    ]
  },
  onSonEvent(e:any) {
    // this.setData!({
    //   isHasCoupon: e.detail.userState,
    //   reply: e.detail.replyState
    // })
    if(e.detail.userState) {
      this.setData!({
        isHasCoupon: e.detail.userState,
      })
    }
    if(!e.detail.replyState) {
      this.setData!({
        reply: e.detail.replyState
      })
    }
  },
  //轮播图的切换事件
  swiperChange(e:any) {
    this.setData!({
      currentSwiper: e.detail.current
      })
  },
  loadMsg(): void {
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // })
    // 请求精品课列表`
    // let _this = this
    // this.setData!({
    //   hasMore:1,
    // })
    // const data = {
    //   page: pagNum,
    //   limit: 4,
    //   isPositivePrice: 1,
    //   type : 0
    // }
    // request({
    //   url: API.getTeacherCourse,
    //   data: data
    // }).then((res: any)=>{
    //   if(res.data.course && res.data.course.length !== 0) {
    //     pagNum++
    //     setTimeout(()=>{
    //       _this.setData!({
    //         list: _this.data.list.concat(res.data.course),
    //         hasMore: 0
    //       })
    //     },1200)
    //   }else if (res.data.course && res.data.course.length < 4) {
    //     _this.setData!({
    //       hasMore: 2
    //     })
    //   } else if(res.data.course && res.data.course.length === 0){
    //     _this.setData!({
    //       hasMore: 2
    //     })
    //   }else{
    //     console.log('服务器异常')
    //   }
    // })
    const dataNotPrice = {
      page: pagNum,
      // limit: 4,
      // isPositivePrice: 0,
      type: type
    }
    request({
      url: API.getTeacherCourse,
      data: dataNotPrice
    }).then((res: any) => {
      wx.hideLoading({})
      if (res.data.success) {
        this.setData!({
          list: res.data.data
        })
      } else {
        wx.hideLoading({})
        console.log('服务器异常')
      }
    })
  },
  loadSchool() {
    wx.request({
      url: API.courseStage,
      success: (res:any)=> {
        this.setData!({
          schoolList: res.data.data
        })
      }
    })
  },
  // 轮播图列表
  // loadBanner() {
  //   let _this=this
  //   wx.request({
  //     url: API.bannerList,
  //     success: function(res:any) {
  //       if(res.data.success) {
  //         _this.setData!({
  //           bannerList: res.data.data
  //       })
  //       }
  //     }
  //   })
  // },

  onShow() {

    // this.getCode()
    // wx.navigateTo({
    //   url: '../myOrder/myOrder'
    // })
  },
  onShareAppMessage(): any {
      return {
        title: '这里有教资好课，跟你分享',
        path: '/pages/index/index'
        // imageUrl: this.data.normalUrl + this.data.courseInfo.imgUrl,
      }
  },
  onLoad() {
    this.setData!({
      system: app.globalData.systemInfo.platform
    }),
    //分享
    // wx.updateShareMenu({
    //   withShareTicket: true,
    //   success (res:any)) { 
    //     console.log(res)
    //   }
    // })
    this.collect ()
    let _this=this
    if (app.globalData.userInfo.user) {
      _this.setData!({
        // isNewUser: app.globalData.userInfo.isNewUser
        user : app.globalData.userInfo.user
      })
    }else {
      app.getData = (data:any):void => {
        _this.setData!({
          user:  app.globalData.userInfo.user,
          isHasCoupon: app.globalData.userInfo.isHasCoupon
        })
      }
    }
    this.loadMsg()
    this.loadSchool()
    this.setData!({
      normalUrl: API.normalUrl
    })
  },
  collect () {
    let value = wx.getStorageSync('cancel')
    if (!value) {
        this.setData!({
          cancel : true
        })
    }
  },
  handleCancel(){
    wx.setStorageSync('cancel', 'yes')
    this.setData!({
      cancel : false
    })
  },
  // 轮播图
  linkTo(e: any): void {
    // console.log(e.currentTarget.dataset.path)
    if(!e.currentTarget.dataset.path) {
      this.setData!({
        reply: true
      })
      return
    }
      if(e.currentTarget.dataset.path == '/pages/question/question') {
        wx.switchTab({
          url: e.currentTarget.dataset.path
        })
      } else {
        wx.navigateTo({
        url: e.currentTarget.dataset.path
        })
      }
      
  },
  //首页精品课跳详情页
  link(e: any): void {
    if (!app.globalData.userInfo.id) return;
    let id = e.currentTarget.dataset.id
    let suiTablePerson = e.currentTarget.dataset.suitableperson
    wx.navigateTo({
      url: '../indexDetail/indexDetail?id=' + id + '&suiTablePerson=' + suiTablePerson,
    })
  }
})

