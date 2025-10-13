/**
 * 权限工具类
 */

import { customLocalStorage } from './storage'

/* Auth sign Key */
export const AUTH_SIGN_KEY: string = 'AUTH_SIGN_TOKEN'

/**
 * 设置用户本地认证信息
 */
export function setPermissionAuth(auth: string): void {
    customLocalStorage.set(AUTH_SIGN_KEY, auth)
}

/**
 * 获取用户本地认证信息
 */
export function getPermissionAuth(): string | null {
    return customLocalStorage.get(AUTH_SIGN_KEY)
}
