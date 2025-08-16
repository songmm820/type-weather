import { ChangeEvent, useState } from 'react'
import WeatherSearchInput from '~/pages/weather/other/WeatherSearchInput.tsx'
import WeatherLogo from '~/pages/weather/other/WeatherLogo.tsx'
import { useNavigate } from 'react-router-dom'
import { RouterConstantsEnum } from '~/constants/RouterConstants.ts'
import IconPark from '~/conponents/IconPark.tsx'

const SearchIndex = ({ onInput, onLinkToDetail }: { onInput: (e: ChangeEvent<HTMLInputElement>) => void; onLinkToDetail: (key: '_SELF' | string) => void }) => {
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
                            <div className="text-2xl text-center">Escolha um local para ver a previsão do tempo</div>
                        </div>
                    </div>
                    <div className="mt-16 w-full flex items-center justify-center">
                        <WeatherSearchInput onInput={onInput} />
                    </div>
                </div>

                <div className="w-full flex justify-center">
                    <div className="cursor-pointer t-f-center p-6 t-bg-hover rounded-full" onClick={() => onLinkToDetail('_SELF')}>
                        <IconPark icon="go-end" size={32} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const WeatherHomePage = () => {
    const navigate = useNavigate()

    const [searchKey, setSearchKey] = useState<string>('')

    // 搜索事件
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchKey(e.target.value)
    }

    // 跳转搜索页面
    const onLinkSearch = (key: string) => {
        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append('searchKey', key || searchKey)
        navigate(`${RouterConstantsEnum.WEATHER_DETAIL}?${urlSearchParams.toString()}`)
    }

    return (
        <>
            <div className="@container w-full h-full  bg-no-repeat bg-cover p-6">
                <SearchIndex onInput={handleInput} onLinkToDetail={onLinkSearch} />
            </div>
        </>
    )
}

export default WeatherHomePage
