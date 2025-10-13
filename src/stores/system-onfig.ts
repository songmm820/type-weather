/**
 * 天气信息 Store
 *
 * 需要权限 （ store:default ）
 */
import { LazyStore } from '@tauri-apps/plugin-store'
import { LiveWeatherType } from '~/contexts/WeatherProvider'

type SystemConfigType = {
    /** 实时天气信息 */
    liveWeather: LiveWeatherType
}

/** 位置信息 key */
const SYSTEM_CONFIG_STORE_KEY = 'SYSTEM_CONFIG_STORE_KEY'

const systemStore = new LazyStore('system-config.json')

/**
 * 存储系统配置
 *
 * @param systemConfig 系统配置
 */
export async function setSystemConfig(systemConfig: SystemConfigType) {
    await systemStore.set(SYSTEM_CONFIG_STORE_KEY, systemConfig)
    await systemStore.save()
}

/**
 * 获取系统配置
 */
export async function getSystemConfig() {
    return await systemStore.get<SystemConfigType>(SYSTEM_CONFIG_STORE_KEY)
}
