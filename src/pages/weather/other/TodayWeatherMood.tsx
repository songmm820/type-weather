import { memo, useMemo } from 'react'
import { WeatherInfoType } from '~/pages/weather/other/WeatherSearchDetailPage.tsx'
import { customDayjs } from '~/libs/DateTimeLib.ts'

const TodayWeatherMood = memo(function TodayWeatherMood(props: { weatherInfo: WeatherInfoType }) {
    const { weatherInfo } = props

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

    return (
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
    )
})

export default TodayWeatherMood
