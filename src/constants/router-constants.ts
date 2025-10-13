/**
 * Router 路由 常量信息
 *
 */

export const RouterConstants = {
    /** 根路由 */
    ROOT: '/',
    /** 首页 */
    HOME: '/home',
    /** 系统设置 */
    SYSTEM_SETTING: '/system-setting'
} as const

export type RouterConstants = (typeof RouterConstants)[keyof typeof RouterConstants]
