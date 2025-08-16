/**
 * 路由配置
 */

// createBrowserRouter 暂时不支持 hash 模式，所以使用 createHashRouter
import { createHashRouter, Navigate } from 'react-router-dom'
import { LazyImportComponent } from '~/routers/RouterLazyLoad.tsx'
import { lazy } from 'react'
import MainLayout from '~/layouts/Main.Layout.tsx'
import { RouterConstantsEnum } from '~/constants/RouterConstants.ts'

const router = createHashRouter([
    {
        path: RouterConstantsEnum.ROOT,
        element: <MainLayout />,
        children: [
            { index: true, element: <Navigate to={RouterConstantsEnum.WEATHER} replace /> },
            {
                path: RouterConstantsEnum.WEATHER,
                element: <LazyImportComponent lazyChildren={lazy(() => import('~/pages/weather/WeatherHomePage'))} isRequiredAuth={false} title="天气详情" />
            },
            {
                path: RouterConstantsEnum.WEATHER_DETAIL,
                element: <LazyImportComponent lazyChildren={lazy(() => import('~/pages/weather/other/WeatherSearchDetailPage'))} isRequiredAuth={false} title="天气详情" />
            },
            {
                path: RouterConstantsEnum.SYSTEM_SETTING,
                element: <LazyImportComponent lazyChildren={lazy(() => import('~/pages/SystemSettingPage'))} isRequiredAuth={false} title="系统设置" />
            },
            { path: '*', element: <LazyImportComponent lazyChildren={lazy(() => import('~/pages/404NotFoundPage'))} isRequiredAuth={false} title="404" /> }
        ]
    }
])

export default router
