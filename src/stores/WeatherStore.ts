/**
 * 天气信息 Store
 *
 * 需要权限 （ store:default ）
 */
import { LazyStore } from '@tauri-apps/plugin-store'
import { LiveWeatherType } from '~/contexts/WeatherContent.tsx'

/** 位置信息 key */
const STORE_LOCATION_KEY = 'store-live-weather'

const geographicLocationStore = new LazyStore('live-weather.json')

/**
 * 存储位置信息状态
 *
 * @param liveWeather 实况位置信息
 */
export async function setLiveWeather(liveWeather: LiveWeatherType) {
    await geographicLocationStore.set(STORE_LOCATION_KEY, liveWeather)
    await geographicLocationStore.save()
}

/**
 * 获取位置信息状态
 */
export async function getLiveWeatherByStore() {
    return await geographicLocationStore.get<LiveWeatherType>(STORE_LOCATION_KEY)
}
