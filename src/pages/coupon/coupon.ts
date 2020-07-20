import { IMyApp } from '../../app'
import { request } from '../../utils/request/index'
import { API } from "../../config/cgi-config";
const app = getApp<IMyApp>()
Page({
    data: {
        system: '',
        showSurprised: false,
        indexTab: 0,
        titleList: ["未使用","已使用"],
        couponList : []
    },
    onLoad() {
        this.setData!({
            system: app.globalData.systemInfo.platform
          }),
        this.coupon()
    },
    swiperChange (e:any) {
        this.setData!({
            indexTab : e.detail.current
        })
        this.coupon()
    },
    messsage () {
        this.setData!({
            showSurprised: !this.data.showSurprised
        })
    },
    // 点击已使用，类名未默认，点击未使用，类名未change
    tapShow (e:any) {
        let dataIndex = e.currentTarget.dataset.index
        if (dataIndex === this.data.indexTab) return;
        this.setData!({
            indexTab : dataIndex
        })
        this.coupon()
    },
    // 点击去使用
    onsonCoupon () {
        wx.switchTab({
            url: '../index/index'
        })
    },
    getData (date:string):string {
        let newDate = new Date(date)
        let year = newDate.getFullYear()
        let month = newDate.getMonth()+1>=10?newDate.getMonth()+1:`0${newDate.getMonth()+1}`
        let day = newDate.getDate()>=10?newDate.getDate():`0${newDate.getDate()}`
        return `${year}.${month}.${day}`
    } ,
    // 获取优惠券
    coupon () {
        const tabData= {
            user_id: app.globalData.userInfo.id,
            type: this.data.indexTab
        }
        request({
            url: API.getCoupon,
            data: tabData
        }).then((res:any) => {
            if (res.data.success) {
                let resultList = res.data.data
                for (let i = 0; i<resultList.length;i++) {
                    resultList[i].create_time = resultList[i].create_time.replace(/-/g, '/')
                    resultList[i].end_time = resultList[i].end_time.replace(/-/g, '/')
                    resultList[i]['startTime'] = this.getData(resultList[i].create_time)
                    resultList[i]['endTime'] = this.getData(resultList[i].end_time)
                }
                this.setData!({
                    couponList: resultList
                })
            }
        })
    }
})
