import { IMyApp } from '../../app'
import { API } from "../../config/cgi-config"

const app = getApp<IMyApp>()
var timer:any
var setTimer:any
Page({
    data: {
        id:'', //上个页面传过来的查询id
        courseInfo : {},//课程信息
        isVisible : false,//课程信息状态
        questionList : [],//试题列表 
        currentTab : 0, //当前轮播图显示的卡片
        isCardShow : false, //是否显示答题卡
        totalNum : 0, //题目总数
        unfinishedNum : 0, //未作答总数
        isRotate:false, // 摆动的小手
        timerList:[], // 定时器集合
        time : '00:00', //默认时间
        currentTime : 0, //答题时间毫秒
        minute : 0, //答题分钟
        // animationData: {}
    },
    onLoad(options: any) {
      this.setData!({
        id: options.id
      })
      // 显示弹出信息
      this.getCourseInfo()
      this.getQuestionList()
    },
    
    onShow() {
      this.initRotate()
    },

    // 摆动小手
    initRotate () {
      let isRotateTimer:any = setInterval(()=>{
        this.setData!({
          isRotate: !this.data.isRotate
        })
      },500)
      this.data.timerList.push(isRotateTimer)
    },

    // 获取弹出框信息
    getCourseInfo() {
      wx.showLoading({
        title:'加载中',
        mask: true
      })
      wx.request({
        url: `${API.questionInfo}?type=0&id=${this.data.id}`,
        success:(res:any)=> {
          this.setData!({
            courseInfo: res.data.data.data,
            isVisible: true,
          })
          wx.hideLoading({})
        }
      })
    },

    // 点击开始答题
    start() {
      let _this=this
      this.setData!({
        isVisible: false
      })
       timer= setInterval(()=> {
        let minuteTime = parseInt(this.data.currentTime / 1000 / 60)
        minuteTime=minuteTime<10?'0'+minuteTime:minuteTime
        let second = this.data.currentTime/1000%60<10?'0'+this.data.currentTime/1000%60:this.data.currentTime/1000%60
        this.setData!({
          currentTime: this.data.currentTime += 1000,
          time:`${minuteTime}:${second}`,
          minute: minuteTime
        })
      //   console.log(this.data.courseInfo.paperTime)
      // console.log(this.data.minute)
        if (this.data.minute >= this.data.courseInfo.paperTime) {
          wx.showToast({
            title: '答题时间到,即将自动提交',
            icon : 'none'
          })
          clearInterval(timer)
          timer = null
          setTimer=setTimeout(()=> {
            _this.submitCard() // 自动交卷
          },2000)
          // clearTimeout(setTimer)
          _this.data.timerList.push(setTimer)
          setTimer=null
        }
      },1000)
      this.data.timerList.push(timer)
      // console.log(timer)
      // console.log(this.data.timerList)
    },

    // 请求试题列表
    getQuestionList () {
      wx.showLoading({
        title:'加载中',
        mask: true
      })
      wx.request({
        url:`${API.questionDetail}?type=0&id=${this.data.id}`,
        success: (res:any)=>{
          // console.log(res.data.data.data.paper)
          // console.log(res.data.data.data.paper.psOutputDto)
          
          let result:any = res.data.data.data.paper.psOutputDto
          let currentPage = 0;
          let count = 0;
          result.forEach((Item:any)=>{
            if (Item.paperQuestionList) {
              Item.swiperItemId =currentPage
              currentPage++
              Item.paperQuestionList.forEach((item:any)=>{
                item.swiperItemId = currentPage
                item.swiperId = count
                currentPage++
                count++
              })
            }
          })
          // currentPage=0
          this.setData!({
            questionList: result,
            totalNum: count
          })
          wx.hideLoading({})
        },
        fail:()=> {
          console.log('加载失败')
          wx.hideLoading({})
        }
      })
    },
    
    // 点击选中项
    onchangeCurrentTab(e:any) {
      let {questionIndex,topicListIndex,selectAnswer} = e.detail
      // console.log(e.detail)
      let currentQuestion = this.data.questionList[topicListIndex].paperQuestionList[questionIndex]  // 选中的题
      currentQuestion.selectState = 'selected' //已作答
      // console.log(this.data.questionList)
      if (currentQuestion.answer.id === selectAnswer) {
        currentQuestion.appraisal = 'correct' // 回答正确
      }else {
        currentQuestion.appraisal = 'incorrect' //回答错误
      }
      currentQuestion.selectId = selectAnswer  // 记录选择的答案
      if (currentQuestion.swiperItemId) {
        this.setData!({
          currentTab:currentQuestion.swiperItemId + 1
        })
      }
      this.setData!({
        questionList : this.data.questionList
      })
      // console.log(topicListIndex)
    },

    // 点击显示答题卡
    handleCard() {
      this.setData!({
        isCardShow: true
      })
    },

    // 点击跳到对应题
    goChecked(e:any) {
      // console.log(e.currentTarget.dataset)
      this.setData!({
        currentTab: e.currentTarget.dataset.swiperitem,
        isCardShow: false
      })
    },
    // 点击继续答题
    handleComeon() {
      this.setData!({
        isCardShow: false
      })
    },

    // 监听轮播图事件
    handleChange(e:any) {
      // console.log(e)
      if(e.detail.source === 'touch') {
        this.setData!({
          currentTab: e.detail.current
        })
        if (e.detail.currentItemId === 'last') {
          this.setData!({
            unfinishedNum: 0
          })
          this.data.questionList.forEach((item:any) => {
              if (item.paperQuestionList) {
                item.paperQuestionList.forEach((questionItem:any)=>{
                  if (questionItem.selectState !== 'selected') {
                    this.setData!({
                      unfinishedNum: this.data.unfinishedNum+=1
                    })
                  }
                })
              }
          }) 
        }
      } 
    },

    // 交卷
    submitCard() {
      let isSingle = 0 //选择题数量
      let correct = 0 //正确的数量
      let incorrect = 0 //错误的数量
      let noanswer = 0 //未作答的数量
      let totalNum = this.data.totalNum //题目总数
      let correctRate = 0 //正确率
      let dataIndex = 0  //试题类型
      let allQuestionList:any = []  // 当前科目所有题
      let errorQuestionList:any = [] //错误题目
      this.data.questionList.forEach((Item:any)=>{
        if (Item.paperQuestionList && Item.paperQuestionList.length > 0) {
          allQuestionList[dataIndex] = {list:[],...Item}
          errorQuestionList[dataIndex] = {list:[],...Item}
          Item.paperQuestionList.forEach((item:any)=>{
            allQuestionList[dataIndex].list.push(item)
            if (item.answerMode==='SingleSelection') {
              isSingle++
            }
            if (item.answerMode==='SingleSelection' && (item.appraisal === 'incorrect' || !item.appraisal)) {
              errorQuestionList[dataIndex].list.push(item)
            }
            if (item.appraisal === 'correct') {
              correct++
            } else if (item.appraisal === 'incorrect') {
              incorrect++
            }else {
              noanswer++
            }
          })
          dataIndex++
        }
      })
      let correctRateNum = (correct/isSingle)*100
        correctRate = correctRateNum.toFixed(2)
        correctRate = isNaN(correctRate)?0:correctRate
        app.globalData.allQuestionList=allQuestionList
        app.globalData.errorQuestionList=errorQuestionList
      wx.redirectTo({
        url:`../questionSubmit/questionSubmit?isSingle=${isSingle}&correct=${correct}&incorrect=${incorrect}&noanswer=${noanswer}&totalNum=${totalNum}&correctRate=${correctRate}&minute=${this.data.minute}`
      })
    },

    // 页面卸载
    onunload() {
      this.data.timerList.forEach(item=>{
        clearInterval(item)
      })
      timer=null
      //  if(timer) {
      //   console.log(timer)
      // }
      this.setData!({
        isCardShow : false,
        isVisible : false,
        questionList : [],
        time :'00:00',
        currentTime : 0
      })
    }
  })