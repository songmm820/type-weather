/**
 * 高德地图api请求
 */

import { AxiosClientClass } from '~/network/request-config'
import {
    AmapWebApiIpResponse,
    AmapWebApiRegeoResponse,
    AmapWebApiResponse,
    AmapWebApiWeatherRequestParams,
    AmapWebApiWeatherResponse
} from '~/apis/amap/amap-type'

/** WebApi Key */
const WEB_API_KEY = import.meta.env.VITE_APP_MAP_KEY

export const amapWebApiInstance = new AxiosClientClass<AmapWebApiResponse>({
    baseURL: 'https://restapi.amap.com/v3',
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json'
    }
})

/**
 * IP 定位城市
 *
 * @see https://lbs.amap.com/api/webservice/guide/api/ipconfig
 *
 * @param ip ip地址
 */
export function getLocationByIpApi(ip?: string) {
    const params = {
        key: WEB_API_KEY,
        ip: ip
    }
    return amapWebApiInstance.get<{ ip?: string }, AmapWebApiResponse & AmapWebApiIpResponse>(
        '/ip',
        params
    )
}

/**
 * 获取天气信息
 *
 * @see https://lbs.amap.com/api/webservice/guide/api/weatherinfo
 *
 * @param adCode 城市行政区划编码
 * @param extensions 气象类型 base: 实况天气， all：预测天气
 */
export function getWeatherInfoByAdCodeApi(adCode: string, extensions: 'base' | 'all' = 'base') {
    const params: AmapWebApiWeatherRequestParams = {
        key: WEB_API_KEY,
        city: adCode,
        extensions: extensions
    }
    return amapWebApiInstance.get<
        AmapWebApiWeatherRequestParams,
        AmapWebApiResponse & AmapWebApiWeatherResponse
    >('/weather/weatherInfo', params)
}

/**
 * 逆地理编码（根据城市名称获取相应的adcode）
 *
 * https://lbs.amap.com/api/webservice/guide/api/georegeo
 *
 * @param cityName 城市名称
 */
export function getAdCodeByCityNameApi(cityName: string) {
    const params = {
        key: WEB_API_KEY,
        address: cityName
    }
    return amapWebApiInstance.get<
        {
            key: string
            address: string
        },
        AmapWebApiResponse & {
            readonly geocodes?: {
                adcode: string
            }[]
        }
    >('/geocode/geo', params)
}

/**
 * 逆地理编码（根据经纬度获取相应的adcode）
 *
 * https://lbs.amap.com/api/webservice/guide/api/georegeo
 *
 * @param location 经纬度数组
 */
export function getAdCodeByLocationApi(location: string[]) {
    const params = {
        key: WEB_API_KEY,
        location: location.join(',')
    }
    return amapWebApiInstance.get<
        {
            key: string
            location: string
        },
        AmapWebApiResponse & AmapWebApiRegeoResponse
    >('geocode/regeo', params)
}
