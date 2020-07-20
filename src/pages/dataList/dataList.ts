import { API } from "../../config/cgi-config"
// import { IMyApp } from '../../app'

// const app = getApp<IMyApp>()

Page({
    data: {
        data_list : []
    },
    getDataList ():void {
        let _this = this
        wx.showLoading({ title : '加载中' })
        wx.request({
            url : API.dataList,
            method : 'GET',
            success : (res:any) => {
                wx.hideLoading({})
                if (res.data.success) {
                    _this.setData!({
                        data_list : res.data.data
                    })
                } else {
                    wx.showToast({title:'加载失败',icon : 'none'})
                }
            },
            fail : () => {
                wx.hideLoading({})
            }
        })
    },
    onLoad () {
        this.getDataList()
    }
})
