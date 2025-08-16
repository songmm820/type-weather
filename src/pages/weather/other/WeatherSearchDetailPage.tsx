/**
 * 天气搜索详情
 */
import Logo from '~/pages/weather/other/WeatherLogo.tsx'
import WeatherSearchInput from '~/pages/weather/other/WeatherSearchInput.tsx'
import night_bg from '~/assets/weather/night_bg.png'
import classNames from 'classnames'
import WeatherCardContainer from '~/pages/weather/other/WeatherCardContainer.tsx'

// 今日天气详情维度
const todayWeatherDetailsDimension = [
    {
        key: 'temperature',
        label: '温度',
        value: '26°'
    },
    {
        label: '湿度',
        value: '70%'
    },
    {
        label: '风速',
        value: '3级'
    },
    {
        label: '紫外线',
        value: '强'
    }
]

const WeatherSearchDetailPage = () => {
    return (
        <div className="w-full h-full flex gap-6">
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
                                <div className="py-4">{item.label}</div>
                                <div className="py-4">{item.value}</div>
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
