Component({
    properties: {
        bgc : {
            type : String,
            value : 'default'
        },
        price : {
            type : [String,Number],
            value: ''
        },
        courseName : {
            type : String,
            value : ''
        },
        courseTypeId : {
            type : [String,Number],
            value : ''
        },
        expirationTime : {
            type : String,
            value : ''
        },
        //是否已经过期  1已过期
        overTime : {
            type : [String,Number],
            value : ''
        },
        //优惠券是否使用
        isUse : {
            type : Boolean,
            value : false
        },
        state : {
            type : [String,Number],
            value : 0
        }
    },
    data: {
        open : false,
        system: ''
    },
    methods: {
        handleProxy () :void {
            this.setData!({
                open : !this.data.open
            })
        },
        goPay () : void {
           this.triggerEvent("sonCoupon")
        }
        
    },
    // lifetimes: {
    //     attached: function() {
    //       console.log(111)
    //     },
    // }
    // lifetimes: {
    //     created: function() {
    //         console.log(1111)
    //         this.setData!({
    //             system: app.globalData.systemInfo.platform
    //             })
    //         }, 
    //     }
})
