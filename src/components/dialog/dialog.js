//inputView.js

Component({
  properties: {
    isOpenDialog: {
      type:Boolean,
      value:false,
    },
    code: {
      type:String,
      value:'LJBM',
    }
  },
  data: {

  },
  methods: {
    onLoad() {

    },
    closeDialog() {
      this.setData({
        isOpenDialog: false,
      })
      this.triggerEvent('closeDialog',1) //关闭后不再显示dialog
    }
  }
})
