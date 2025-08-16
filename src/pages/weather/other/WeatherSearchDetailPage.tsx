/**
 * 天气搜索详情
 */
import Logo from '~/pages/weather/other/WeatherLogo.tsx'
import WeatherSearchInput from '~/pages/weather/other/WeatherSearchInput.tsx'
import night_bg from '~/assets/weather/night_bg.png'
import classNames from 'classnames'
import WeatherCardContainer from '~/pages/weather/other/WeatherCardContainer.tsx'
import { useWeather } from '~/hooks/useWeather.ts'
import { useEffect, useState } from 'react'
import IconPark from '~/conponents/IconPark.tsx'

type WeatherDetail = {
    icon: string
    label: string
    value?: string
    unit?: string
}

const WeatherSearchDetailPage = () => {
    const weatherCtx = useWeather()

    // 今日天气详情维度
    const [todayWeatherDetailsDimension, setTodayWeatherDetailsDimension] = useState<WeatherDetail[]>([])

    // 获取天气详情
    const getWeatherDetail = () => {
        const { temperature, humidity, windDirection, windpower } = weatherCtx ?? {}
        setTodayWeatherDetailsDimension([
            {
                icon: 'temperature',
                label: '体感温度',
                value: temperature,
                unit: '°'
            },
            {
                icon: 'water-dot',
                label: '空气湿度',
                value: humidity,
                unit: '%'
            },
            {
                icon: 'wind',
                label: '风向',
                value: windDirection
            },
            {
                icon: 'wind-rate',
                label: '风力等级',
                value: windpower
            }
        ])
    }

    useEffect(() => {
        getWeatherDetail()
    }, [weatherCtx?.temperature, weatherCtx?.humidity, weatherCtx?.windDirection, weatherCtx?.windpower])

    return (
        <div className="w-full h-full flex gap-6 p-4.5">
            <div className="p-4 w-1/2 h-full bg-dark-elevated-1 rounded-md flex flex-col">
                <div className="flex items-center gap-3">
                    <Logo fullLogo={false} size={56} />
                    <WeatherSearchInput />
                </div>
                <div className="mt-4 flex-1 h-full relative">
                    <div className="p-8 w-full h-full rounded-lg bg-no-repeat bg-cover" style={{ backgroundImage: `url(${night_bg})` }}>
                        <div className="">123</div>
                    </div>
                </div>
            </div>
            <div className="w-1/2 h-full flex flex-col gap-6">
                <WeatherCardContainer label="今日天气详情">
                    <div className="flex-1 flex flex-col justify-center">
                        {todayWeatherDetailsDimension.map((item, index) => (
                            <div
                                key={index}
                                className={classNames('flex items-center justify-between gap-2', index != todayWeatherDetailsDimension.length - 1 && 'border-b border-[#1c1c27] ')}
                            >
                                <div className="flex items-center gap-4">
                                    <IconPark icon={item.icon} size={26} />
                                    <div className="py-4">{item.label}</div>
                                </div>
                                <div className="py-4 text-white text-large font-semibold">
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
