/**
 * Main Layout 布局
 */

import { memo } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import IconPark from '~/components/widget/IconPark'
import { useWeather } from '~/contexts/WeatherProvider'
import { useGeographicLocation } from '~/contexts/GeographicLocationProvider'
import { RouterConstants } from '~/constants/router-constants'

const MainLayout = () => {
    const location = useLocation()
    const navigate = useNavigate()

    // 判断当前是否还可以返回
    const isCanBack = () => {
        // 当前路由不为首页
        return location.pathname !== RouterConstants.HOME
    }

    // 返回上一页
    const onGoBack = () => {
        navigate(-1)
    }

    // 设置
    const onSetting = () => {
        navigate(RouterConstants.SYSTEM_SETTING)
    }

    return (
        <div className="w-full h-full flex flex-col">
            {/* 路由页面渲染区域 */}
            <div className="@container flex-1">
                <Outlet />
            </div>

            {/* 底部导航栏 */}
            <nav className="bg-[#131319] h-10 flex justify-end py-1.5 px-6">
                {/* 左侧导航栏 */}
                <div className="h-full flex-1 flex items-center gap-2">
                    <GeoCity />
                    <Weather />
                </div>

                {/* 右侧导航栏 */}
                <div className="h-full flex gap-4">
                    {isCanBack() && (
                        <div
                            className="cursor-pointer h-full t-f-center rounded-sm px-2 py-1"
                            onClick={onGoBack}
                        >
                            <IconPark icon="left-small" size={18} />
                            <span className="text-small">返回上一页</span>
                        </div>
                    )}

                    {location.pathname !== RouterConstants.SYSTEM_SETTING && (
                        <div
                            className="cursor-pointer h-full t-f-center rounded-sm px-2 py-1 t-f-center gap-1"
                            onClick={onSetting}
                        >
                            <IconPark icon="setting-two" size={15} />
                            <span className="text-small">设置</span>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    )
}

const Weather = memo(function Weather() {
    const weatherCtx = useWeather()
    return weatherCtx?.temperature && <div className="text-sm">{weatherCtx?.temperature}°</div>
})

const GeoCity = memo(function GeoCity() {
    const geoLocationCtx = useGeographicLocation()
    return geoLocationCtx?.city && <div className="text-sm">{geoLocationCtx?.city}</div>
})

export default MainLayout
