/**
 * 天气信息 Hook
 */

import { useContext } from 'react'
import { LiveWeatherType, WeatherContext } from '~/contexts/WeatherContent.tsx'

type LiveWeatherHookType = (LiveWeatherType & {}) | null

export const useWeather = (): LiveWeatherHookType => {
    const context = useContext(WeatherContext)

    if (!context) {
        return null
    }

    return {
        weather: context.weather,
        temperature: context.temperature,
        windDirection: context.windDirection,
        windpower: context.windpower,
        humidity: context.humidity,
        reportTime: context.reportTime,
        requestTime: context.requestTime
    }
}
