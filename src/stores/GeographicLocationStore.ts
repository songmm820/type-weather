/**
 * 位置信息 Store
 *
 * 需要权限 （ store:default ）
 */
import { LazyStore } from '@tauri-apps/plugin-store'
import { GeographicLocationType } from '~/contexts/GeographicLocationContext.tsx'

/** 位置信息 key */
const STORE_LOCATION_KEY = 'store-location'

const geographicLocationStore = new LazyStore('location.json')

/**
 * 存储位置信息状态
 *
 * @param location 位置信息
 */
export async function setLocationByStore(location: GeographicLocationType) {
    await geographicLocationStore.set(STORE_LOCATION_KEY, location)
    await geographicLocationStore.save()
}

/**
 * 获取位置信息状态
 */
export async function getLocationByStore() {
    const storeData = await geographicLocationStore.get<GeographicLocationType>(STORE_LOCATION_KEY)
    if (storeData && !Array.isArray(storeData?.adCode)) {
        return Object.keys(storeData).length > 0 ? storeData : null
    }
    return null
}
