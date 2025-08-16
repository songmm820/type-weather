/**
 * 系统信息上下文
 */

import { createContext, ReactNode, useEffect, useState } from 'react'
import { getCurrentVersion, getOsInfo } from '~/libs/OsLib.ts'

/** 系统信息类型 */
export type AppSystemOSInfoType = {
    /** 设备类型 */
    osType: string
    /** 操作系统平台 */
    platform: string
    /** 操作系统类型 */
    family: string
    /** 版本 */
    version: string
    /** 架构 */
    arch: string
    /** 语言 */
    locale: string | null
    /** 主机名 */
    hostname: string | null
    /** 应用版本号 */
    appVersion: string
}

/** 系统信息上下文类型 */
export type AppSystemOSInfoContext = AppSystemOSInfoType & {
    /** 获取系统信息 */
    onGetSystemOSInfo: () => Promise<void>
}

export const AppSystemOSInfoContext = createContext<AppSystemOSInfoContext | null>(null)

// 创建系统信息提供者组件
export const AppSystemInfoProvider = ({ children }: { children: ReactNode }) => {
    // 获取系统信息
    const [systemInfo, setSystemInfo] = useState<Omit<AppSystemOSInfoContext, 'onGetSystemOSInfo'> | null>(null)

    /** 获取系统信息 */
    const onGetSystemOSInfo = async () => {
        const { osType, platform, family, version, arch, locale, hostname } = await getOsInfo()
        const appVersion = await getCurrentVersion()
        setSystemInfo({ osType, platform, family, version, arch, locale, hostname,appVersion })
    }

    // 初始化获取系统信息
    useEffect(() => {
        onGetSystemOSInfo().then()
    }, [])

    return <AppSystemOSInfoContext.Provider value={systemInfo ? { ...systemInfo, onGetSystemOSInfo } : null}>{children}</AppSystemOSInfoContext.Provider>
}
