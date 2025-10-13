/**
 * 天气信息上下文配置
 */

import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { getWeatherInfoByAdCodeApi } from '~/apis/amap/amap-web-api'
import { customDayjs } from '~/libs/date'
import { useGeographicLocation } from '~/contexts/GeographicLocationProvider'

/** 实况天气信息类型 */
export type LiveWeatherType = {
    /** 天气现象（汉字描述）*/
    weather: string
    /** 实时气温，单位：摄氏度 */
    temperature: string
    /** 风向描述 */
    windDirection: string
    /** 风力等级，单位：级 */
    windpower: string
    /** 湿度，百分比 */
    humidity: string
    /** 数据观测时间 */
    reportTime: string
    /** 请求时间 YYYY-MM-DD HH:mm:ss */
    requestTime: string
}

/** 天气上下文类型 */
export type WeatherContext = LiveWeatherType & {
    /** 获取实况天气信息函数 */
    onGetLiveWeather: () => Promise<void>
}

export const WeatherContext = createContext<WeatherContext | null>(null)

// 创建位置提供者组件
export const WeatherProvider = ({ children }: { children: ReactNode }) => {
    // 位置信息上下文
    const locationCtx = useGeographicLocation()
    // 位置信息
    const [weather, setWeather] = useState<Omit<WeatherContext, 'onGetLiveWeather'> | null>(
        null
    )

    /**
     * 获取实况天气信息
     *
     */
    const onGetLiveWeather = async () => {
        try {
            // 先获取位置信息上下文中的城市adCode
            const adCode = locationCtx?.adCode
            if (!adCode) return
            // 获取实况天气信息
            const response = await getWeatherInfoByAdCodeApi(adCode, 'base')
            const liveWeather = response?.lives?.[0]
            if (!liveWeather) return
            // 设置实况天气信息
            const weather = {
                temperature: liveWeather.temperature,
                weather: liveWeather.weather,
                windDirection: liveWeather.winddirection,
                windpower: liveWeather.windpower,
                humidity: liveWeather.humidity,
                reportTime: liveWeather.reporttime,
                requestTime: customDayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
            }
            setWeather(weather)
        } catch (error) {
            throw new Error(`获取实况天气信息失败: ${error}`)
        }
    }

    useEffect(() => {
        onGetLiveWeather().then()
    }, [locationCtx?.adCode])

    return (
        <>
            <WeatherContext.Provider value={weather ? { ...weather, onGetLiveWeather } : null}>
                {/* 如果没有天气信息阻塞渲染 */}
                {weather && Object.keys(weather).length > 0 && children}
            </WeatherContext.Provider>
        </>
    )
}

type LiveWeatherHookType = LiveWeatherType & {}

export const useWeather = (): LiveWeatherHookType => {
    return useContext(WeatherContext)!
}
