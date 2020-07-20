Component({
    properties: {
        answer : {
            type : String,
            value : ''
        },
        analysis : {
            type : String,
            value : ''
        },
        knowledge : {
            type : String,
            value : ''
        },  
    },
    data: {
        isLook : false,
        system: ''
    },
    methods: {
        handleProxy () :void {
            this.setData!({
                isLook : !this.data.isLook
            })
        },
    },
})
