Component({
    properties: {
        totalNum : {
            type : [String,Number],
            value : ''
        },
        unfinishedNum : {
            type : [String,Number],
            value: ''
        },
    },
    data: {
        open : false,
        system: ''
    },
    methods: {
        onCard () :void {
            this.triggerEvent("onCard")
        },
        onSubmitCard () {
            this.triggerEvent("onSubmitCard")
        }
    }
})
