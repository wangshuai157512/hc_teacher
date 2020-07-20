
export function request(obj: any = {}): Promise<object> {
  return new Promise((resolve, reject) => {
        const { url, data } = obj;
        wx.request({
          url,
          data: data,
          method: 'POST',
          success: (res: any) => {
            if (res.statusCode === 200 && res.data.success) {
              resolve(res)
            } else {
              reject(res);
            }
          },
          fail: err => {
            console.log('err')
            console.log(err)
            reject(err);
          }
      })
  });
}
