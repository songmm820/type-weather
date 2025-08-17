/**
 * RouterPermission 高阶组件（懒加载 Loading）
 */

import React, { LazyExoticComponent, Suspense } from 'react'
import RouterPermission, { IPermissionRouterProps } from '~/routers/RouterPermission.tsx'
import RouteLoading from '~/routers/RouteLoading.tsx'
import AnimatedLayout from '~/layouts/AnimatedLayout.tsx'

type ILazyImportComponentProps = IPermissionRouterProps & {
    /** 懒加载组件 */
    lazyChildren: LazyExoticComponent<() => React.ReactNode>
}
/**
 * Lazy Import Component *  Must in [views] Folder
 *
 * 懒加载组件
 */
export const LazyImportComponent = (props: ILazyImportComponentProps) => {
    return (
        <Suspense fallback={<RouteLoading />}>
            <RouterPermission isRequiredAuth={props.isRequiredAuth} title={props.title}>
                <AnimatedLayout>
                    <props.lazyChildren />
                </AnimatedLayout>
            </RouterPermission>
        </Suspense>
    )
}
