import axios from "axios";

const chatboxApi = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// 请求拦截器（加Token、请求头）
chatboxApi.interceptors.request.use(config => {
  // config.headers.token = 'xxx'
  return config
})

// 响应拦截器（统一错误处理）
chatboxApi.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err)
)

export default chatboxApi