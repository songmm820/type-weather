/**
 * 地理位置信息上下文配置
 */

import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { getAdCodeByLocationApi } from '~/apis/amap/amap-web-api'
import { invoke } from '@tauri-apps/api/core'
import { TAURI_INVOKE } from '~/constants/tauri-constants'

/** 地理信息类型 */
export type GeographicLocationType = {
    /** 城市编码 */
    adCode: string
    /** 国家 */
    country: string
    /** 省 */
    province: string
    /** 城市 */
    city: string
    /** 区 */
    district: string
    /** 街道 */
    township: string
}

/** 地理位置上下文类型 */
export type GeographicLocationContext = GeographicLocationType & {
    /** 获取位置信息函数 */
    onGetLocation: () => Promise<void>
}

export const GeographicLocationContext = createContext<GeographicLocationContext | null>(null)

// 创建位置提供者组件
export const GeographicLocationProvider = ({ children }: { children: ReactNode }) => {
    // 位置信息
    const [location, setLocation] = useState<Omit<
        GeographicLocationContext,
        'onGetLocation'
    > | null>(null)

    /**
     * 获取位置信息
     */
    const onGetLocation = async () => {
        try {
            const locationArr = (await invoke(TAURI_INVOKE.GET_LOCATION)) as {
                longitude: number
                latitude: number
            }
            const requestLocation = [
                locationArr.longitude.toFixed(6),
                locationArr.latitude.toFixed(6)
            ]
            const resp = await getAdCodeByLocationApi(requestLocation)
            const locationData = {
                adCode: resp.regeocode.addressComponent.adcode,
                country: resp.regeocode.addressComponent.country,
                province: resp.regeocode.addressComponent.province,
                city: resp.regeocode.addressComponent.city,
                district: resp.regeocode.addressComponent.district,
                township: resp.regeocode.addressComponent.township
            }
            setLocation(locationData)
        } catch (error) {
            throw new Error(`获取地理位置失败: ${error}`)
        }
    }

    useEffect(() => {
        // 应用启动时获取位
        onGetLocation().then()
    }, [])

    return (
        <>
            <GeographicLocationContext.Provider
                value={location ? { ...location, onGetLocation } : null}
            >
                {/* 如果没有位置信息阻塞渲染 */}
                {location && Object.keys(location).length > 0 && children}
            </GeographicLocationContext.Provider>
        </>
    )
}

type GeographicLocationHookType = GeographicLocationType & {
    onGetLocation: () => Promise<void>
}

// 因为为null阻塞渲染 这里直接断言不为null
export const useGeographicLocation = (): GeographicLocationHookType => {
    return useContext(GeographicLocationContext)!
}
