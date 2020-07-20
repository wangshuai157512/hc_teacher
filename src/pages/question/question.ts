import { API } from "../../config/cgi-config"

Page({
    data: {
        topicList : [], // 试卷列表数据
        difficultyList : ['容易','较易','中等','较难','困难'],
    },
    onLoad() {
      this.getTopicList()
    },
    // 请求试卷列表数据
    getTopicList () {
      wx.showLoading({title:'加载中'})
      wx.request({
        url: `${API.questionList}?type=0`,
        success:(res:any)=>{
          wx.hideLoading({})
          this.setData!({
            topicList:res.data.data.data.arrangements
          })
        },
        fail:()=> {
          console.log('加载失败')
          wx.hideLoading({})
        }
      })
    },
    // 点击练习跳转答题内容页
    handleProxy(e:any) {   
      // console.log(e)
      wx.navigateTo({
        url:`../questionPractice/questionPractice?id=${e.currentTarget.dataset.id}`
      })
    }
    
  })