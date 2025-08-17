// src/layouts/MainLayout.tsx
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import bg from '~/assets/weather/common/background.png'
import IconPark from '~/conponents/IconPark.tsx'
import { RouterConstantsEnum } from '~/constants/RouterConstants.ts'
import { useGeographicLocation } from '~/hooks/useGeographicLocation.ts'
import { useWeather } from '~/hooks/useWeather.ts'
import { useSystemOSInfo } from '~/hooks/useSystemOSInfo.ts'

const MainLayout = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const geoLocationCtx = useGeographicLocation()
    const weatherCtx = useWeather()
    const systemOsCtx = useSystemOSInfo()

    // 判断当前是否还可以返回
    const isCanBack = () => {
        // 当前路由不为首页
        return location.pathname !== RouterConstantsEnum.WEATHER
    }

    // 返回上一页
    const onGoBack = () => {
        navigate(-1)
    }

    // 设置
    const onSetting = () => {
        navigate(RouterConstantsEnum.SYSTEM_SETTING)
    }

    return (
        <div className="w-full h-full flex flex-col" style={{ backgroundImage: `url(${bg})` }}>
            {/* 路由页面渲染区域 */}
            <div className="@container flex-1">
                <Outlet />
            </div>

            {/* 底部导航栏 */}
            <nav className="bg-[#131319] h-10 flex justify-end py-1.5 px-6">
                {/* 左侧导航栏 */}
                <div className="h-full flex-1 flex items-center gap-2">
                    {systemOsCtx && systemOsCtx?.systemTime.length > 0 && (
                        <div>
                            {systemOsCtx?.systemTime[3]}:{systemOsCtx?.systemTime[4]}
                        </div>
                    )}
                    {geoLocationCtx?.city && <div className="text-sm">{geoLocationCtx?.city}</div>}
                    {weatherCtx?.temperature && <div className="text-sm">{weatherCtx?.temperature}°</div>}
                </div>

                {/* 右侧导航栏 */}
                <div className="h-full flex gap-4">
                    {isCanBack() && (
                        <div className="cursor-pointer h-full t-f-center rounded-sm px-2 py-1" onClick={onGoBack}>
                            <IconPark icon="left-small" size={18} />
                            <span className="text-small">返回上一页</span>
                        </div>
                    )}

                    <div className="cursor-pointer h-full t-f-center rounded-sm px-2 py-1 t-f-center gap-1" onClick={onSetting}>
                        <IconPark icon="setting-two" size={15} />
                        <span className="text-small">设置</span>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default MainLayout
