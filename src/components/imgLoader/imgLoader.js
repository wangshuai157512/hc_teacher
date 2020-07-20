Component({
    properties: {
      //默认图片
      defaultImage:{
        type:String,
        value:''
      },
      //原始图片
      originalImage:{
        type:String,
        value:''
      },
      width:{
        type:String,
        value:''
      },
      height:{
        type:String,
        value:''
      },
    
      //图片剪裁mode，同Image组件的mode
      mode:{
        type:String,
        value:''
      },
    },
    data: {
      finishLoadFlag: false
    },
    methods: {
      finishLoad: function (e) {
        this.setData({
          finishLoadFlag: true
        })
      }
    }
  })