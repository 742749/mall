import axios from 'axios'

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({

		// 如想要接口地址，请加老师微信进群，费用9元
		baseURL: 'http://127.0.0.1/api'
    timeout: 5000
  })

  // 2.axios的请求拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
  })

  // 2.2.axios的响应拦截器
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  // 3.发送真正的网络请求
  return instance(config)
}
