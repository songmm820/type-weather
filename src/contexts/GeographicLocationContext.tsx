/**
 * 地理位置信息上下文配置
 */

import { createContext, ReactNode, useEffect, useState } from 'react'
import { getLocationByIp } from '~/apis/amap/AmapWebApis.ts'
import { getLocationByStore, setLocationByStore } from '~/stores/GeographicLocationStore.ts'

/** 地理信息类型 */
export type GeographicLocationType = {
    /** 省 */
    province: string
    /** 城市 */
    city: string
    /** 城市编码 (对应高德地图) */
    adCode: string | null
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
    const [location, setLocation] = useState<Omit<GeographicLocationContext, 'onGetLocation'> | null>(null)

    /**
     * 获取位置信息
     *
     * 说明：这里的位置信息，只有首次会通过IP发起网络定位，后续都会从Store从获取，如果Store中没有，则重新发起网络定位重新获取。
     */
    const onGetLocation = async () => {
        try {
            // 首先从状态中获取位置信息
            const locationStoreData = await getLocationByStore()
            if (locationStoreData) {
                setLocation(locationStoreData)
                return
            }
            // 取当前网络IP获取位置信息
            const response = await getLocationByIp()
            // 高德为获取定位，会返回一个空数组
            if (!Array.isArray(response.adcode)) {
                setLocation({
                    province: response.province,
                    city: response.city,
                    adCode: response.adcode
                })
            }
            await setLocationByStore({ province: response.province, city: response.city, adCode: response.adcode })
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
            <GeographicLocationContext.Provider value={location ? { ...location, onGetLocation } : null}>{children}</GeographicLocationContext.Provider>
        </>
    )
}
