/**
 * 天气搜索详情
 */
import { useEffect, useMemo, useState } from 'react'
import Logo from '~/pages/weather/other/WeatherLogo.tsx'
import WeatherSearchInput from '~/pages/weather/other/WeatherSearchInput.tsx'
import classNames from 'classnames'
import WeatherCardContainer from '~/pages/weather/other/WeatherCardContainer.tsx'
import { useWeather } from '~/hooks/useWeather.ts'
import IconPark from '~/conponents/IconPark.tsx'
import { customDayjs } from '~/libs/DateTimeLib.ts'
import { useGeographicLocation } from '~/hooks/useGeographicLocation.ts'
import { getBackgroundByTime, getWeatherIcon, getWeatherStatus } from '~/libs/WeatherLib.ts'
import { useSystemOSInfo } from '~/hooks/useSystemOSInfo.ts'
import { useSearchParams } from 'react-router-dom'
import { getAdCodeByCityName, getWeatherInfoByAdCodeApi } from '~/apis/amap/AmapWebApis.ts'

type WeatherDetail = {
    icon: string
    label: string
    value?: string
    unit?: string
}

type WeatherInfoType = {
    icon: string
    background: string
    temperature: string
    windpower: string
    weather: string
    city: string
    weatherDetailList: WeatherDetail[]
}

const WeatherSearchDetailPage = () => {
    // 获取系统实时时间
    const systemOsCtx = useSystemOSInfo()
    const geoLocationCtx = useGeographicLocation()
    const weatherCtx = useWeather()
    const [search] = useSearchParams()

    // 天气信息
    const [weatherInfo, setWeatherInfo] = useState<WeatherInfoType>()

    // 搜索词
    const [searchWord, setSearchWord] = useState<string>('')

    // 获取路由source字段
    const source = search.get('source') || ('self' as string)

    // 输入框触发搜索
    const handleChangeInputSearch = async (e: string) => {
        setSearchWord(e)
    }

    // 获取当前日期（年月日星期）
    const currentDateAndWeek = useMemo(() => {
        // 日期
        const date = customDayjs().format('YYYY年MM月DD日')
        // 星期
        const week = customDayjs().format('dddd')
        return {
            date,
            week
        }
    }, [])

    // 是否获取当前城市信息
    const isGetLocal = useMemo(() => {
        return Boolean(!searchWord)
    }, [searchWord])

    // 当前实时时间时
    const currentHour = useMemo(() => {
        if (!systemOsCtx || systemOsCtx.systemTime?.length === 0 || !systemOsCtx.systemTime) return
        return systemOsCtx?.systemTime[3]
    }, [systemOsCtx?.systemTime[3]])

    // 获取当前城市天气信息
    const onGetLocalWeather = () => {
        if (!geoLocationCtx?.city || !weatherCtx?.weather || !weatherCtx?.temperature || !weatherCtx?.windpower || systemOsCtx?.systemTime?.length === 0) return
        const weathers = getWeatherStatus(weatherCtx?.weather, Number(weatherCtx?.temperature), Number(weatherCtx.windpower))
        if (!currentHour) return
        const weatherInfo: WeatherInfoType = {
            weather: weatherCtx.weather,
            temperature: weatherCtx?.temperature,
            windpower: weatherCtx?.windpower,
            background: getBackgroundByTime(Number(currentHour), weathers),
            icon: getWeatherIcon(weathers),
            city: geoLocationCtx.city,
            weatherDetailList: [
                { icon: 'temperature', label: '体感温度', value: weatherCtx?.temperature ?? '', unit: '°c' },
                { icon: 'water-dot', label: '空气湿度', value: weatherCtx?.humidity ?? '', unit: '%' },
                { icon: 'wind', label: '风向', value: weatherCtx?.windDirection ?? '' },
                { icon: 'wind-rate', label: '风力等级', value: weatherCtx?.windpower ?? '' }
            ]
        }
        setWeatherInfo(weatherInfo)
    }

    // 获取搜索城市天气信息
    const onGetSearchWeather = async () => {
        const cityRes = await getAdCodeByCityName(searchWord)
        if (cityRes.geocodes?.length === 0) return
        const adCode = cityRes?.geocodes?.[0]?.adcode
        if (!adCode) return
        const weatherInfoRes = await getWeatherInfoByAdCodeApi(adCode)
        const weatherLive = weatherInfoRes?.lives?.[0]
        if (!weatherLive) return
        const weathers = getWeatherStatus(weatherLive.weather, Number(weatherLive?.temperature), Number(weatherLive.windpower))
        setWeatherInfo({
            weather: weatherLive.weather,
            temperature: weatherLive.temperature,
            windpower: weatherLive.windpower,
            background: getBackgroundByTime(Number(currentHour), weathers),
            icon: getWeatherIcon(weathers),
            city: weatherLive.city,
            weatherDetailList: [
                { icon: 'temperature', label: '体感温度', value: weatherLive?.temperature ?? '', unit: '°c' },
                { icon: 'water-dot', label: '空气湿度', value: weatherLive?.humidity ?? '', unit: '%' },
                { icon: 'wind', label: '风向', value: weatherLive?.winddirection ?? '' },
                { icon: 'wind-rate', label: '风力等级', value: weatherLive?.windpower ?? '' }
            ]
        })
    }

    // 今日天气详情维度
    useEffect(() => {
        // 如果是获取当前定位城市
        if (isGetLocal) {
            onGetLocalWeather()
        } else {
            onGetSearchWeather().then()
        }
    }, [
        source,
        isGetLocal,
        searchWord,
        weatherCtx?.weather,
        weatherCtx?.temperature,
        weatherCtx?.humidity,
        weatherCtx?.windDirection,
        weatherCtx?.windpower,
        systemOsCtx?.systemTime[3]
    ])

    return (
        <div className="w-full h-full flex gap-6 p-4.5">
            {isGetLocal}
            <div className="p-4 w-1/2 h-full bg-dark-elevated-1 rounded-md flex flex-col">
                <div className="flex items-center gap-3">
                    <Logo fullLogo={false} size={56} />
                    <WeatherSearchInput
                        value={searchWord}
                        placeholder={geoLocationCtx?.city ? `已自动定位到${geoLocationCtx.city} 搜索查询其他城市` : ''}
                        onSearch={handleChangeInputSearch}
                    />
                </div>
                <div className="mt-4 flex-1 h-full relative">
                    {weatherInfo?.background && (
                        <div className="px-8 py-4 w-full h-full rounded-lg bg-no-repeat bg-cover" style={{ backgroundImage: `url(${weatherInfo.background})` }}>
                            <div className="h-full flex flex-col justify-between">
                                <div className="h-full w-full flex justify-between items-end">
                                    <div className="w-full flex items-center justify-between">
                                        {weatherInfo?.temperature && (
                                            <div className="text-white">
                                                <div className="font-semibold text-7xl">{weatherInfo.temperature}°c</div>
                                                <div className="flex flex-col  mt-3">
                                                    <div className="text-[#fafafa] text-base">
                                                        <span className="mr-2">{weatherInfo.weather},</span>
                                                        <span>{weatherInfo?.city}</span>
                                                    </div>
                                                    <div className="text-small">
                                                        {currentDateAndWeek.date}, {currentDateAndWeek.week}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex flex-col">
                                            <img className="w-60" src={weatherInfo.icon} alt={weatherInfo?.weather} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-1/2 h-full flex flex-col gap-6">
                <WeatherCardContainer
                    label="今日天气详情"
                    desc={
                        <div className="text-small">
                            <span>{customDayjs(weatherCtx?.reportTime).format('MM-DD HH:mm')}&nbsp;发布</span>
                        </div>
                    }
                >
                    <div className="flex-1 flex flex-col justify-center">
                        {weatherInfo?.weatherDetailList &&
                            weatherInfo?.weatherDetailList.map((item, index) => (
                                <div key={index} className={classNames('flex items-center justify-between gap-2 border-b border-[#1c1c27] ')}>
                                    <div className="flex items-center gap-4">
                                        <IconPark icon={item.icon} size={26} />
                                        <div className="py-4">{item.label}</div>
                                    </div>
                                    <div className="py-4 text-white text-xxlarge font-semibold">
                                        <span>{item?.value}</span>
                                        <span>{item?.unit}</span>
                                    </div>
                                </div>
                            ))}
                    </div>
                </WeatherCardContainer>
                <WeatherCardContainer label="未来五日天气">
                    <div className="flex-1 flex justify-center">
                        <div className="w-1/5 flex justify-center">123</div>
                        <div className="w-1/5 flex justify-center">123</div>
                        <div className="w-1/5 flex justify-center">123</div>
                        <div className="w-1/5 flex justify-center">123</div>
                        <div className="w-1/5 flex justify-center">123</div>
                    </div>
                </WeatherCardContainer>
            </div>
        </div>
    )
}

export default WeatherSearchDetailPage
