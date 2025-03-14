import axios, { type AxiosResponse, type AxiosInstance, type InternalAxiosRequestConfig, AxiosError } from "axios";
import { ElNotification } from 'element-plus'
const service: AxiosInstance = axios.create({
  baseURL: 'https://www.demo.com', //后面会把它替换成环境变量
  timeout: 5000
})

//请求拦截器
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config
}, (error: AxiosError) => {
  ElNotification({
    title: 'Error',
    message: error.message,
    type: 'error'
  })
  return Promise.reject(error)
})

//响应拦截器
service.interceptors.response.use((response: AxiosResponse) => {
  if (response.data.code != 200) {
    ElNotification({
      title: 'Error',
      message: response.data.message,
      type: 'error'
    })
  } else {
    return response.data
  }
}, (error: AxiosError) => {
  ElNotification({
    title: 'Error',
    message: error.message,
    type: 'error'
  })
  return Promise.reject(error)
})

export default service

