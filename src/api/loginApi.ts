import { API } from "../config/cgi-config";

export function doLogin(): Promise<string> {
  return new Promise( (resolve, reject) => {
    wx.login({
      success: res => {
        if (res.code) {
          const reqData = {
            code: res.code
          };
          wx.request({
            url: API.login,
            data: reqData,
            method: "POST",
            success: (resp: any) => {
              const data = resp.data;
              if(data.success) {
                resolve(data)
              }else{
                reject(data);
              }
            },
            fail: err => {
              reject(err);
            }
          });
        } else {
          reject();
        }
      },
      fail: err => {
        reject(err);
      }
    });
  })
}