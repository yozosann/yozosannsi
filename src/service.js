import { resolve } from "url";

const devApi = 'http://127.0.0.1:9998';
const vipApi = 'https://yozosann.com';
const requestUrl  = process.env.NODE_ENV === 'development' ? devApi : vipApi;

const install = (Vue, opts={}) => {
  Vue.prototype.$service = (requestObj) => {
    console.log('request: ' + requestUrl + requestObj.path);
    return new Promise((resolve, reject) => {
      wx.request({
        ...requestObj,
        url: requestUrl + requestObj.path,
        success(res) {
          if(res.data.code === 0) {
            resolve(res.data.data);
          } else {
            throw(new Error('返回出错'))
          }
        },
        fail(err) {
          reject(err);
        }
      });
    })
  }
}

export default {install};