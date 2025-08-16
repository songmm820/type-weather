/**
 * App 常量信息
 */

/* 应用名称 */
export const APP_NAME: string = '情绪玻璃'

/** 主题模式 */
export enum ThemeModeEnum {
    /** 暗黑模式 */
    DARK = 'dark',
    /** 亮色模式 */
    LIGHT = 'light'
}

/* 路由常量 */
export const ROUTER_PATH = {}

export type ProjectModuleType = {
    key: string
    name: string
    module: string
}

/** 项目模块 */
export const PROJECT_MODULES: ProjectModuleType[] = [
    {
        key: 'tab_aggregator',
        name: '「浏览器标签页」桌面聚合器',
        module: 'TabAggregator'
    }
]
