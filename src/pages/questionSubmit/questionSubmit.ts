import { IMyApp } from '../../app'

const app = getApp<IMyApp>()

Page({
    data: {
      isSingle: 0,   //选择题数量
      correct : 0,   //正确的数量
      incorrect: 0,    //错误的数量
       noanswer: 0,    //未作答的数量
       totalNum: 0,    //题目总数
      correctRate: 0,   //正确率
      questionList : [],  // 提交的题
      arr:[0,1]
    },
    onLoad(options:any) {
      // console.log(options)
      this.setData!({
        isSingle: options.isSingle,  
        correct : options.correct,   
        incorrect: options.incorrect,   
        noanswer: options.noanswer,    
        totalNum: options.totalNum, 
        minute: options.minute,   
        correctRate: options.correctRate,
        questionList: app.globalData.allQuestionList
      })
      // console.log(app.globalData)
    },

    // 点击返回上一章回首页
    handleIndex(){
      wx.switchTab({
        url:`../question/question`
      })
    },

    // 点击题号
    handleCheck(e:any) {
      // console.log(e)
      let type='all'
      let swiperId=e.target.dataset.swiperid
      wx.navigateTo({
        url:`../questionAnalysis/questionAnalysis?type=${type}&swiperId=${swiperId}`
      })
    },

    //查看错误解析
    handleErr() {
      let type='error'
      wx.navigateTo({
        url:`../questionAnalysis/questionAnalysis?type=${type}`
      })
    },

    // 点击查看全部解析
    handleAll() {
      let type='all'
      wx.navigateTo({
        url:`../questionAnalysis/questionAnalysis?type=${type}`
      })
    }

  })