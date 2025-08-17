import { useState } from 'react'
import WeatherSearchInput from '~/pages/weather/other/WeatherSearchInput.tsx'
import WeatherLogo from '~/pages/weather/other/WeatherLogo.tsx'
import { useNavigate } from 'react-router-dom'
import { RouterConstantsEnum } from '~/constants/RouterConstants.ts'
import IconPark from '~/conponents/IconPark.tsx'

const SearchIndex = () => {
    const navigate = useNavigate()

    // 跳转天气详情

    // 搜索词
    const [searchWord, setSearchWord] = useState<string>('')

    // 触发搜索
    const handleChangeInputSearch = (e: string) => {
        if (!e) return
        setSearchWord(e)
        onLinkToWeatherDetail(e)
    }

    // 跳转天气详情
    const onLinkToWeatherDetail = (key?: string) => {
        const urlSearchParams = new URLSearchParams()
        if (key) {
            urlSearchParams.append('source', key)
        }
        navigate(`${RouterConstantsEnum.WEATHER_DETAIL}?${urlSearchParams.toString()}`)
    }

    return (
        <div className="flex flex-col py-12 w-full h-full">
            <div className="w-full flex justify-center">
                <WeatherLogo fullLogo size={180} />
            </div>
            <div className="flex-1 flex flex-col justify-center w-full">
                <div className="w-full flex flex-col pb-20">
                    <div className="w-wull flex justify-center">
                        <div className="flex flex-col gap-6">
                            <div className="text-4xl flex gap-3 items-center justify-center">
                                <span>Boas vindas ao</span>
                                <span className="text-self">TypeWeather</span>
                            </div>
                            <div className="text-2xl text-center">择一处佳境，静候天时</div>
                        </div>
                    </div>
                    <div className="mt-16 w-full flex items-center justify-center">
                        <WeatherSearchInput value={searchWord} onSearch={handleChangeInputSearch} />
                    </div>
                </div>

                <div className="w-full flex justify-center">
                    <div className="cursor-pointer t-f-center p-6 t-bg-hover rounded-full" onClick={() => onLinkToWeatherDetail()}>
                        <IconPark icon="go-end" size={32} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const WeatherHomePage = () => {
    return (
        <>
            <div className="w-full h-full  bg-no-repeat bg-cover p-6">
                <SearchIndex />
            </div>
        </>
    )
}

export default WeatherHomePage
