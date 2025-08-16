/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 网络请求：axios 请求拦截器
 */

import { InternalAxiosRequestConfig } from 'axios'

/**
 * 请求拦截器配置
 *
 * 可以在这里统一设置请求头，token 等信息
 */
const requestInterceptorsConfig = (config: InternalAxiosRequestConfig<any>) => {
    return config
}

/**
 * 请求拦截器错误处理
 */
const requestInterceptorsError = (error: any) => {
    return Promise.reject(error)
}

export { requestInterceptorsConfig, requestInterceptorsError }
