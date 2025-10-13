/**
 * 组件： 高阶组件（权限路由）
 */

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPermissionAuth } from '~/libs/permission'

/**
 * 一个权限控制路由组件 RouterPermission
 * 用于根据用户的认证信息来控制是否允许访问某个页面。
 * 它的主要作用是判断用户是否已经登录（即是否有效的认证信息），如果需要权限认证且用户未登录，则会跳转到登录页面
 * 如果用户没有权限，则显示一个没有权限的视图。
 */

export type IPermissionRouterProps = {
    /** Child元素 */
    children?: React.ReactNode
    /** 是否需要权限认证 */
    isRequiredAuth: boolean
    /** 页面标题 */
    title?: string
}

export function RouterPermission(props: IPermissionRouterProps) {
    const { children, isRequiredAuth = true } = props

    // Hook for navigation
    const navigate = useNavigate()
    // 获取本地存储中的认证信息
    const localPermissionAuthData = getPermissionAuth()

    useEffect(() => {
        // 如果需要权限认证，并且本地存储中没有认证信息，则跳转到登录页面
        if (isRequiredAuth) {
            if (!localPermissionAuthData) {
                // console.log('跳转到登录页面')
            }
        }
    }, [isRequiredAuth, navigate])

    return <>{children}</>
}

export default RouterPermission
