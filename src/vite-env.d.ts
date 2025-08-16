/* eslint-disable spaced-comment */
/// <reference types="vite/client" />

// 环境变量类型声明
interface ImportMetaEnv {
    // App 标识
    readonly VITE_APP_KEY: string
    // 地图 API Key
    readonly VITE_APP_MAP_KEY: string
    // 图标库地址
    readonly VITE_APP_ICON_CDN: string
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
