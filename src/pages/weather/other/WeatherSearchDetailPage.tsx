/**
 * 天气搜索详情
 */
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import Logo from '~/pages/weather/other/WeatherLogo.tsx'
import WeatherSearchInput from '~/pages/weather/other/WeatherSearchInput.tsx'
import WeatherCardContainer from '~/pages/weather/other/WeatherCardContainer.tsx'
import { useWeather } from '~/hooks/useWeather.ts'
import { useGeographicLocation } from '~/hooks/useGeographicLocation.ts'
import { getBackgroundByTime, getWeatherIcon, getWeatherStatus } from '~/libs/WeatherLib.ts'
import { useSystemOSInfo } from '~/hooks/useSystemOSInfo.ts'
import { useSearchParams } from 'react-router-dom'
import { getAdCodeByCityNameApi, getWeatherInfoByAdCodeApi } from '~/apis/amap/AmapWebApis.ts'
import TodayWeatherCard from '~/pages/weather/other/TodayWeatherCard.tsx'
import TodayWeatherMood from '~/pages/weather/other/TodayWeatherMood.tsx'

type WeatherDetail = {
    icon: string
    label: string
    value?: string
    unit?: string
}

export type WeatherInfoType = {
    icon: string
    background: string
    temperature: string
    windpower: string
    weather: string
    city: string
    weatherDetailList: WeatherDetail[]
}

const WeatherSearchDetailPage = () => {
    const [search] = useSearchParams()
    // 获取路由source字段
    const source = search.get('source') || ''

    // 获取系统实时时间
    const systemOsCtx = useSystemOSInfo()
    const geoLocationCtx = useGeographicLocation()
    const weatherCtx = useWeather()

    // 天气信息
    const [weatherInfo, setWeatherInfo] = useState<WeatherInfoType>()

    // 搜索词
    const [searchWord, setSearchWord] = useState<string>(source || '')

    // 输入框触发搜索
    const handleChangeInputSearch = useCallback((e: string) => {
        setSearchWord(e)
    }, [])

    // 是否获取当前城市信息
    const isGetLocal = useMemo(() => {
        return Boolean(!searchWord)
    }, [searchWord])

    // 当前实时时间时
    const currentHour = useMemo(() => {
        if (!systemOsCtx || systemOsCtx.systemTime?.length === 0 || !systemOsCtx.systemTime) return
        return systemOsCtx?.systemTime[2]
    }, [systemOsCtx?.systemTime[2]])

    // 获取当前城市天气信息
    const onGetLocalWeather = () => {
        const weathers = getWeatherStatus(weatherCtx.weather, Number(weatherCtx.temperature), Number(weatherCtx.windpower))
        if (!currentHour) return
        const weatherInfo: WeatherInfoType = {
            weather: weatherCtx.weather,
            temperature: weatherCtx.temperature,
            windpower: weatherCtx.windpower,
            background: getBackgroundByTime(Number(currentHour), weathers),
            icon: getWeatherIcon(weathers),
            city: geoLocationCtx.city,
            weatherDetailList: [
                { icon: 'temperature', label: '体感温度', value: weatherCtx.temperature, unit: '°c' },
                { icon: 'water-dot', label: '空气湿度', value: weatherCtx.humidity, unit: '%' },
                { icon: 'wind', label: '风向', value: weatherCtx.windDirection },
                { icon: 'wind-rate', label: '风力等级', value: weatherCtx?.windpower }
            ]
        }
        setWeatherInfo(weatherInfo)
    }

    // 获取搜索城市天气信息
    const onGetSearchWeather = async () => {
        const cityRes = await getAdCodeByCityNameApi(searchWord)
        const adCode = cityRes?.geocodes?.[0]?.adcode
        if (!adCode) return
        const weatherInfoRes = await getWeatherInfoByAdCodeApi(adCode)
        const weatherLive = weatherInfoRes?.lives?.[0]
        if (!weatherLive) return
        const weathers = getWeatherStatus(weatherLive.weather, Number(weatherLive.temperature), Number(weatherLive.windpower))
        if (!currentHour) return
        setWeatherInfo({
            weather: weatherLive.weather,
            temperature: weatherLive.temperature,
            windpower: weatherLive.windpower,
            background: getBackgroundByTime(Number(currentHour), weathers),
            icon: getWeatherIcon(weathers),
            city: weatherLive.city,
            weatherDetailList: [
                { icon: 'temperature', label: '体感温度', value: weatherLive.temperature, unit: '°c' },
                { icon: 'water-dot', label: '空气湿度', value: weatherLive.humidity, unit: '%' },
                { icon: 'wind', label: '风向', value: weatherLive.winddirection },
                { icon: 'wind-rate', label: '风力等级', value: weatherLive.windpower }
            ]
        })
    }

    useEffect(() => {
        if (!source) return
        setSearchWord(source)
    }, [source])

    // 今日天气详情维度
    useEffect(() => {
        // 如果是获取当前定位城市
        if (isGetLocal) {
            onGetLocalWeather()
        } else {
            onGetSearchWeather().then()
        }
    }, [source, isGetLocal, searchWord, weatherCtx.weather, weatherCtx.temperature, weatherCtx.humidity, weatherCtx.windDirection, weatherCtx.windpower, currentHour])

    return (
        <div className="w-full h-full flex gap-6 p-4.5">
            {weatherInfo && Object.keys(weatherInfo).length > 0 && (
                <>
                    <SearchCityBar weatherInfo={weatherInfo} searchWord={searchWord} city={geoLocationCtx?.city} onSearch={handleChangeInputSearch} />
                    <div className="w-1/2 h-full flex flex-col gap-6">
                        <TodayWeatherCard weatherInfo={weatherInfo} />
                        <WeatherCardContainer label="未来五日天气">
                            <div className="flex-1 flex justify-center">
                                <div className="w-1/5 flex justify-center">null</div>
                                <div className="w-1/5 flex justify-center">null</div>
                                <div className="w-1/5 flex justify-center">null</div>
                                <div className="w-1/5 flex justify-center">null</div>
                                <div className="w-1/5 flex justify-center">null</div>
                            </div>
                        </WeatherCardContainer>
                    </div>
                </>
            )}
        </div>
    )
}

const SearchCityBar = memo(function SearchCityBar(props: { weatherInfo: WeatherInfoType; searchWord: string; city?: string; onSearch: (e: string) => void }) {
    const { weatherInfo, searchWord, city, onSearch } = props

    return (
        <div className="p-4 w-1/2 h-full bg-dark-elevated-1 rounded-md flex flex-col">
            <div className="flex items-center gap-3">
                <Logo fullLogo={false} size={56} />
                <WeatherSearchInput value={searchWord} placeholder={city ? `已自动定位到${city} 搜索查询其他城市` : ''} onSearch={onSearch} />
            </div>
            <div className="mt-4 flex-1 h-full relative">
                <TodayWeatherMood weatherInfo={weatherInfo} />
            </div>
        </div>
    )
})

export default WeatherSearchDetailPage
