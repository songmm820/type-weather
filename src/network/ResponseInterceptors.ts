/**
 * 网络请求：axios 响应拦截器
 */

import { AxiosResponse } from 'axios'

/**
 * 响应拦截器配置
 *
 * 可以对响应数据进行处理
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const responseInterceptorsConfig = (response: AxiosResponse<any, unknown>) => {
    const res = response.data
    if (response.status === 200 && res.code === 200) {
        return res
    }

    return res
}

/**
 * 响应拦截器错误处理
 *
 * 可以对响应错误进行处理
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const responseInterceptorsError = (error: any) => {
    return Promise.reject(error)
}

export { responseInterceptorsConfig, responseInterceptorsError }
