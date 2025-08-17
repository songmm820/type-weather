/**
 * 天气搜索详情
 */
import Logo from '~/pages/weather/other/WeatherLogo.tsx'
import WeatherSearchInput from '~/pages/weather/other/WeatherSearchInput.tsx'
import classNames from 'classnames'
import WeatherCardContainer from '~/pages/weather/other/WeatherCardContainer.tsx'
import { useWeather } from '~/hooks/useWeather.ts'
import { useMemo } from 'react'
import IconPark from '~/conponents/IconPark.tsx'
import { customDayjs } from '~/libs/DateTimeLib.ts'
import { useGeographicLocation } from '~/hooks/useGeographicLocation.ts'
import { getBackgroundByTime, getWeatherIcon, getWeatherStatus } from '~/libs/WeatherLib.ts'
import { useSystemOSInfo } from '~/hooks/useSystemOSInfo.ts'
import { useSearchParams } from 'react-router-dom'

type WeatherDetail = {
    icon: string
    label: string
    value?: string
    unit?: string
}

const WeatherSearchDetailPage = () => {
    // 获取系统实时时间
    const systemOsCtx = useSystemOSInfo()
    const geoLocationCtx = useGeographicLocation()
    const weatherCtx = useWeather()
    const [search] = useSearchParams()

    // 获取路由source字段
    const source = search.get('source') || ('self' as string)

    // 计算当前天气背景和图标
    const curBackgroundAndIcon = useMemo(() => {
        // 获取天气
        const weatherText = weatherCtx?.weather
        // 获取温度
        const temperature = weatherCtx?.temperature
        // 获取风力
        const windpower = weatherCtx?.windpower as '<=3' | number
        if (!weatherText || !temperature || !windpower || systemOsCtx?.systemTime?.length === 0) return

        const weathers = getWeatherStatus(weatherText, Number(temperature), windpower)
        const hour = systemOsCtx?.systemTime[3]
        if (!hour) return
        return {
            background: getBackgroundByTime(Number(hour), weathers),
            icon: getWeatherIcon(weathers)
        }
    }, [systemOsCtx?.systemTime[3], weatherCtx?.weather, weatherCtx?.temperature, weatherCtx?.windpower])

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

    // 今日天气详情维度
    const todayWeatherDetailsDimension = useMemo<WeatherDetail[]>(() => {
        if (!source) return []
        // 如果是获取当前定位城市
        const { temperature, humidity, windDirection, windpower } = weatherCtx ?? {}
        return [
            { icon: 'temperature', label: '体感温度', value: temperature ?? '', unit: '°c' },
            { icon: 'water-dot', label: '空气湿度', value: humidity ?? '', unit: '%' },
            { icon: 'wind', label: '风向', value: windDirection ?? '' },
            { icon: 'wind-rate', label: '风力等级', value: windpower ?? '' }
        ]
    }, [source, weatherCtx?.temperature, weatherCtx?.humidity, weatherCtx?.windDirection, weatherCtx?.windpower])

    return (
        <div className="w-full h-full flex gap-6 p-4.5">
            <div className="p-4 w-1/2 h-full bg-dark-elevated-1 rounded-md flex flex-col">
                <div className="flex items-center gap-3">
                    <Logo fullLogo={false} size={56} />
                    <WeatherSearchInput />
                </div>
                <div className="mt-4 flex-1 h-full relative">
                    {curBackgroundAndIcon?.background && (
                        <div className="px-8 py-4 w-full h-full rounded-lg bg-no-repeat bg-cover" style={{ backgroundImage: `url(${curBackgroundAndIcon.background})` }}>
                            <div className="h-full flex flex-col justify-between">
                                <div className="h-full w-full flex justify-between items-end">
                                    <div className='w-full flex items-center justify-between'>
                                        {weatherCtx?.temperature && (
                                            <div className="text-white">
                                                <div className="font-semibold text-7xl">{weatherCtx?.temperature}°c</div>
                                                <div className="flex flex-col  mt-3">
                                                    <div className="text-[#fafafa] text-base">{geoLocationCtx?.city}</div>
                                                    <div className="text-small">
                                                        {currentDateAndWeek.date}, {currentDateAndWeek.week}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex flex-col">
                                            <img className="w-60" src={curBackgroundAndIcon.icon} alt={weatherCtx?.weather} />
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
                        {todayWeatherDetailsDimension &&
                            todayWeatherDetailsDimension.map((item, index) => (
                                <div
                                    key={index}
                                    className={classNames(
                                        'flex items-center justify-between gap-2',
                                        index != todayWeatherDetailsDimension.length - 1 && 'border-b border-[#1c1c27] '
                                    )}
                                >
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
