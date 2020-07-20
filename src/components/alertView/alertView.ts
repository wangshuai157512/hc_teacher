Component({
    properties: {
        difficultyDegree : {
            type : [String,Number],
            value : ''
        },
        coursetype : {
            type : [String,Number],
            value : ''
        },
        adoptscore : {
            type : [String,Number],
            value: ''
        },
        score : {
            type : [String,Number],
            value : ''
        },
        title : {
            type : String,
            value : ''
        },
        time : {
            type : [String,Number],
            value : ''
        },
        isVisible : {
            type : Boolean,
            value : ''
        }
    },
    data: {
        open : false,
        system: ''
    },
    methods: {
        handleProxy () :void {
            this.triggerEvent("onStart")
        },
    },
})
