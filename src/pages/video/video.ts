import { API } from "../../config/cgi-config"
// import { IMyApp } from '../../app'
// import { request } from '../../utils/request/index'
// let initializeVideoUrl :any
// const app = getApp<IMyApp>()
Page({
  data: {
    isHade: false,
    isShowContent: '',
    normalUrl:'',
    videoList: [], //视频列表
    videoNum: null,
    videoTime: null,
    initializeVideoUrl: '',
    imgUrl: '',
    videoUrl: null,
    videoIndex: 0,
    videoHeight: null //视频高度
  },
  onLoad(options: any){
    this.showContent()
    this.setData!({
      normalUrl: API.normalUrl
    })
    if (options.dataIndex) {
      this.setData!({
          videoIndex : parseInt(options.dataIndex)
      })
    }
    this.setData!({
      initializeVideoUrl : options.videoUrl,
      imgUrl: options.imgUrl
    })
    console.log(this.data.imgUrl)
    this.videoList()
  },
  onShow() {
    this.screenHeight()
    wx.getNetworkType({
      success:(res)=> {
        console.log(res)
        const networkType = res.networkType
        if(networkType === '4g') {
          this.setData!({
            isHade : true
        })
        }
        // wx.showToast({
        //   title: `当前模式${networkType}网络`,
        //   icon: 'none',
        //   duration: 2000
        // })
      }
    })
  },
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
  startPlay() {
    this.setData!({
      isHade: false
    })
  },
  onReady () {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  // 视频列表
  videoList() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: this.data.initializeVideoUrl,
      success: (res:any)=> {
        console.log(res.data.data)
        this.setData!({
          videoList:res.data.data,
          videoUrl:res.data.data[this.data.videoIndex].videoUrl,
          // videoNum : res.data.res[this.data.videoIndex].no,
          videoTime : res.data.data[this.data.videoIndex].time
        })
        wx.hideLoading({})
      },
      fail () {
        wx.hideLoading({})
        console.log('系统异常')
      }
    })
  },
  // 获取视频高度
  screenHeight() {
    wx.getSystemInfo({
      success: (res:any)=> {
        let videoProportion:any = res.windowWidth/16
        // console.log(videoProportion)
        this.setData!({
          videoHeight: parseInt(videoProportion*9)
        })
        // console.log(this.data.videoHeight)
      }
    })
  },

  //点击更换视频
  handUrl(e:any) {
    if(this.data.videoUrl===e.currentTarget.dataset.url) {
      return
    }
    this.setData!({
      videoUrl:e.currentTarget.dataset.url,
      // videoNum:e.currentTarget.dataset.no,
      videoTime:e.currentTarget.dataset.time,
      videoIndex:e.currentTarget.dataset.index
    })
  },
  // 播放完成是自动播放下一个
  nextVideo():void {
    this.setData!({
            videoIndex : this.data.videoIndex+1,
        })
    if(this.data.videoList.length<=this.data.videoIndex) {
      wx.showToast({
        title: '已经是最后一个了'
      })
      return
    }
    this.setData!({
      videoUrl : this.data.videoList[this.data.videoIndex].url,
      // videoNum : this.data.videoList[this.data.videoIndex].no,
      videoTime : this.data.videoList[this.data.videoIndex].time
    })
    // console.log(this.data.videoIndex)
    // console.log(this.data.videoUrl)
    this.videoContext.play()
  }
})
