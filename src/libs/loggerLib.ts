import { error, warn, info, debug, trace } from '@tauri-apps/plugin-log'

export type LogLevel = 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR'

const levelWeight: Record<LogLevel, number> = {
    TRACE: 0,
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4
}

type Transport = (level: LogLevel, message: string) => void | Promise<void>

const transports: Transport[] = [
    // ① Tauri 官方插件（文件 + stdout）
    (lvl, msg) => {
        const fn = {
            ERROR: error,
            WARN: warn,
            INFO: info,
            DEBUG: debug,
            TRACE: trace
        }[lvl]
        fn(msg) // 异步，不 await
    }
    // ② SQLite（可选）
    // (lvl, msg) => worker.write(lvl, msg)
]

let globalLevel: LogLevel = 'INFO'

/**
 * 记录日志
 *
 * @param level 日志级别
 * @param message 日志内容
 */
function log(level: LogLevel, message: string) {
    if (levelWeight[level] < levelWeight[globalLevel]) return
    transports.forEach((t) => t(level, message))
}

export const logger = {
    trace: (m: string) => log('TRACE', m),
    debug: (m: string) => log('DEBUG', m),
    info: (m: string) => log('INFO', m),
    warn: (m: string) => log('WARN', m),
    error: (m: string) => log('ERROR', m),

    /**
     * 动态改级别
     */
    setLevel: (l: LogLevel) => {
        globalLevel = l
    }
} as const
