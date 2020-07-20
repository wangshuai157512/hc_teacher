Component({
    properties: {
         title : {
            type : String,
            value : ''
        },
        options : {
            type : Array,
            value : ''
        },
        questionIndex : {
            type : [String,Number],
            value: ''
        },
        topicListIndex : {
            type : [String,Number],
            value : ''
        },
        readOnly : {
            type : Boolean,
            value : ''
        },
        state : {
            type : String,
            value : ''
        },
        selectId : {
            type : [String,Number],
            value : ''
        },
        isMath : {
            type : Boolean,
            default : false
        }
    },
    data: {
        alphabet : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'],
        select_index : null, // 选中索引
        optionList: []
    },
    methods: {
        // cleanHTMLTags (s:any) {
        //     return s.replace(/<[^>]+>/g, '');
        // },
        handleCheck(e:any) {
            if (this.data.readOnly) return ;
            this.setData({
                select_index:e.currentTarget.dataset.index // 选中项索引 
            }) 
            // console.log(this.data.select_index)
            var questionIndex=this.data.questionIndex // 父组件传下来的索引  表示哪个题
            var topicListIndex=this.data.topicListIndex // 父组件传下来的索引 表示哪门课程
            // console.log(topicListIndex)
            // console.log(questionIndex)
            var selectAnswer=e.currentTarget.dataset.item.id // 选中项ID 
            setTimeout(()=> {
                this.triggerEvent('changeCurrentTab', {questionIndex,topicListIndex,selectAnswer})
            },50)
        }
    },
    lifetimes: {
        attached: function() {
            // console.log(this.data.options)
            if (this.data.options) {
                // console.log(this.data.options)
              this.data.options.forEach((item:any) => {
                // item.content = item.content.replace(/<[^>]+>/g, '')
                // console.log(item.content)
              })
              this.setData!({
                optionList: this.data.options
              })
            }
          },
        },
})
