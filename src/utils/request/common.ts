import {API} from '../../config/cgi-config'
import { request } from './index'

export let orderStatus = (userId : any, courseId : any ,type : any) => {
    return new Promise((resolve,reject)=>{
        request({
            url : API.orderStatus,
            data : {
                userId,
                courseId,
                type
            }
        }).then((res: any)=>{
            resolve(res)
        }).catch((err : any)=>{
            reject(err)
        })
    })
}



