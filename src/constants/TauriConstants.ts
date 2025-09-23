/**
 * Tauri 通信常量
 */

/**
 * Invoke 通信常量
 */
export const TAURI_INVOKE = {
    /** 预载  */
    PING: 'ping',
    /** 获取IP */
    GET_IP: 'get_ip',
    /** 获取地理位置经纬度 */
    GET_LOCATION: 'get_windows_position'
} as const

/**
 * listen 通信常量
 */
export const TAURI_LISTEN = {
    /** 获取实时时间 */
    GET_LIVE_TIME: 'get_live_time'
}
