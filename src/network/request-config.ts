/**
 * Axios 网络请求配置
 */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { requestInterceptorsConfig, requestInterceptorsError } from './request-interceptors'
import { responseInterceptorsConfig, responseInterceptorsError } from './response-interceptors'

// 定义基础的响应类型（默认实现）
export interface BaseResponseData<T = unknown> {
    code: number
    data: T
    message: string
}

export class AxiosClientClass<R = BaseResponseData> {
    readonly instance: AxiosInstance

    constructor(public config: AxiosRequestConfig) {
        this.instance = axios.create(config)
        // 全局请求拦截
        this.instance.interceptors.request.use(requestInterceptorsConfig, requestInterceptorsError)
        // 全局响应拦截
        this.instance.interceptors.response.use(
            responseInterceptorsConfig,
            responseInterceptorsError
        )
    }

    // 封装get请求
    get<P, T>(url: string, params?: P): Promise<R & T> {
        return this.instance.get(url, { params })
    }

    // 封装post请求
    post<P, T>(url: string, data?: P): Promise<R & T> {
        return this.instance.post(url, data)
    }

    // 封装put请求
    put<P, T>(url: string, data?: P): Promise<R & T> {
        return this.instance.put(url, data)
    }

    // 封装delete请求
    delete<P, T>(url: string, params?: P): Promise<R & T> {
        return this.instance.delete(url, { params })
    }
}
