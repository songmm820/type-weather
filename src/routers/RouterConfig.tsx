/**
 * 路由配置
 */

// createBrowserRouter 暂时不支持 hash 模式，所以使用 createHashRouter
import { createHashRouter, Navigate } from 'react-router-dom'
import { LazyImportComponent } from '~/routers/RouterLazyLoad.tsx'
import { lazy } from 'react'
import MainLayout from '~/layouts/MainLayout.tsx'
import { RouterConstants } from '~/constants/router-constants'

const router = createHashRouter([
    {
        path: RouterConstants.ROOT,
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Navigate to={RouterConstants.HOME} replace />
            },
            {
                path: RouterConstants.HOME,
                element: (
                    <LazyImportComponent
                        lazyChildren={lazy(() => import('~/pages/HomePage'))}
                        isRequiredAuth={false}
                    />
                )
            },
            {
                path: RouterConstants.SYSTEM_SETTING,
                element: (
                    <LazyImportComponent
                        lazyChildren={lazy(() => import('~/pages/SystemSettingPage'))}
                        isRequiredAuth={false}
                    />
                )
            },
            {
                path: '*',
                element: (
                    <LazyImportComponent
                        lazyChildren={lazy(() => import('~/pages/404NotFoundPage'))}
                        isRequiredAuth={false}
                        title="404"
                    />
                )
            }
        ]
    }
])

export default router
