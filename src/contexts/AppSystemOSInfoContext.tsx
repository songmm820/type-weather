/**
 * 系统信息上下文
 */

import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { getCurrentVersion, getOsInfo } from '~/libs/osLib.ts'
import { listen } from '@tauri-apps/api/event'
import { customDayjs } from '~/libs/dateTimeLib.ts'
import { TAURI_LISTEN } from '~/constants/TauriConstants'

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
    /** 系统时间 */
    systemTime: string[]
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
    const [systemInfo, setSystemInfo] = useState<Omit<AppSystemOSInfoContext, 'onGetSystemOSInfo' | 'systemTime'> | null>(null)

    // 默认取当前时间 年月日时分
    const year = customDayjs().format('YYYY')
    const month = customDayjs().format('MM')
    const day = customDayjs().format('DD')
    const hour = customDayjs().format('HH')
    const minute = customDayjs().format('mm')

    // 实时时间
    const [systemTime, setSystemTime] = useState<string[]>([year, month, day, hour, minute])

    // 获取系统信息
    const onGetSystemOSInfo = async () => {
        const { osType, platform, family, version, arch, locale, hostname } = await getOsInfo()
        const appVersion = await getCurrentVersion()
        setSystemInfo({ osType, platform, family, version, arch, locale, hostname, appVersion })
    }

    // 初始化获取系统信息
    useEffect(() => {
        // Rust 每间隔一段时间更新客户端时间
        const unlisten = listen<string[]>(TAURI_LISTEN.GET_LIVE_TIME, (event) => {
            setSystemTime(event.payload)
        })
        onGetSystemOSInfo().then()

        return () => {
            unlisten.then((fn) => fn?.())
        }
    }, [])

    return (
        <AppSystemOSInfoContext.Provider value={systemInfo ? { ...systemInfo, systemTime, onGetSystemOSInfo } : null}>
            {/* 如果没有位置信息阻塞渲染 */}
            {systemInfo && Object.keys(systemInfo).length > 0 && children}
        </AppSystemOSInfoContext.Provider>
    )
}

type SystemOSInfoHookType = AppSystemOSInfoType & {
    onGetSystemOSInfo: () => Promise<void>
}

export const useSystemOSInfo = (): SystemOSInfoHookType => {
    const context = useContext(AppSystemOSInfoContext)!

    return {
        ...context,
        onGetSystemOSInfo: context.onGetSystemOSInfo
    }
}
