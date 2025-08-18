import { memo } from 'react'
import { customDayjs } from '~/libs/DateTimeLib.ts'
import classNames from 'classnames'
import IconPark from '~/conponents/IconPark.tsx'
import WeatherCardContainer from '~/pages/weather/other/WeatherCardContainer.tsx'
import { useWeather } from '~/hooks/useWeather.ts'
import { WeatherInfoType } from '~/pages/weather/other/WeatherSearchDetailPage.tsx'

const TodayWeatherCard = memo(function TodayWeatherCard(props: { weatherInfo: WeatherInfoType }) {
    const weatherCtx = useWeather()
    const { weatherInfo } = props

    return (
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
    )
})

export default TodayWeatherCard
