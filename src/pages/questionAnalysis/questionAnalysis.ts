import { IMyApp } from '../../app'

const app = getApp<IMyApp>()

Page({
    data: {
      options: {},
      questionList : [],
      currentTab : 0,
      alphabet : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'],
      isCardShow : false,
      dataIndex : 0,
      isMath : false,
      isComposite : false,
      scrollHeight : 0,
      titleScollViewHeight:0,
      windowHeight : 0,
      touchS : [],
      isScroll : true,
      length : 0
    },

    // 手指滑动
    touchstart (e:any) {
      let sx = e.touches[0].pageX
      let sy = e.touches[0].pageY
      let touch = [sx,sy]
      this.setData!({
        touchS: touch
      })
    },
    touchmove (e:any) {
      let sx = e.touches[0].pageX;
      let sy = e.touches[0].pageY;
      let moveY = (sy / this.data.windowHeight)*100
      if (moveY > 70 || moveY < 20) return;
      this.setData!({
        isScroll: false,
        scrollHeight: sy,
        titleScollViewHeight: this.data.windowHeight-this.data.scrollHeight
      })
    },
    touchend () {
      this.setData!({
        isScroll: true,
      })
    },

    onLoad(options:any) {
      // console.log(app.globalData)
      let {windowHeight} = app.globalData.systemInfo
      let windowHeightHalf = (windowHeight / 2)
      this.setData!({
        windowHeight:windowHeight,
        scrollHeight:windowHeightHalf,
        titleScollViewHeight: windowHeightHalf
      })
      
      this.setData!({
        options: options
      })
      
      wx.showLoading({title:'解析中'})
      if(options.type=='all') {
        this.setData!({
          questionList: app.globalData.allQuestionList
        })
        if(options.swiperId) {
          this.setData!({
            currentTab:options.swiperId
          })
        }
      }else if (options.type === 'error') {
        let result = app.globalData.errorQuestionList
        result.forEach((Item:any) => {
          if (Item.name === '单选题') {
            Item.list.forEach((item:any,index:any) => {
              item.swiperitemid = index
            })
          }
        })
        this.setData!({
          questionList:result
        })
       
      }
      wx.hideLoading({})
    },
    
    // 滑动轮播图
    onChange (e:any) {
      // console.log(e)
      if (e.detail.source === 'touch') {
        this.setData!({
          currentTab: e.detail.current
        })
      }
    },

    // 点击答题卡
    handleCard() {
      this.setData!({
        isCardShow:true
      })
    },

    // 点击对应项
    handleCheck(e:any) {
      // console.log(e)
      if(this.data.options.type=='all') {
        this.setData!({
          currentTab:e.currentTarget.dataset.swiperid
        })
      }else {
        this.setData!({
          currentTab:e.currentTarget.dataset.swiperitemid
        })
      }
      this.setData!({
        isCardShow:false
      })
    },

    // 点击返回影藏答题卡
    handleBack() {
      this.setData!({
        isCardShow: false
      })
    }
  })