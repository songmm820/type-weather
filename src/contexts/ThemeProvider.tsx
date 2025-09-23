/**
 * 主题信息上下文配置
 */

import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export const ThemeMode = {
    /** 暗黑模式 */
    DARK: 'dark',
    /** 亮色模式 */
    LIGHT: 'light',
    /** 跟随OS */
    SYSTEM: 'system'
} as const

export type Theme = (typeof ThemeMode)[keyof typeof ThemeMode]

/** 主题上下文配置类型 */
export type ThemeContext = {
    /** 主题 */
    theme: Theme
    /** 设置主题 */
    setTheme: (theme: Theme) => void
}

const initialState: ThemeContext = {
    theme: ThemeMode.LIGHT,
    setTheme: () => null
}

const ThemeContext = createContext<ThemeContext>(initialState)

// 创建主题信息提供者
export const ThemeProvider = ({
    children,
    defaultTheme = ThemeMode.SYSTEM,
    storageKey = 'vite-ui-theme'
}: {
    children: ReactNode
    defaultTheme?: Theme
    storageKey?: string
}) => {
    // 主题
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    )

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove(ThemeMode.LIGHT, ThemeMode.DARK)

        // 跟随系统
        if (theme === ThemeMode.SYSTEM) {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? ThemeMode.DARK
                : ThemeMode.LIGHT
            root.classList.add(systemTheme)
            return
        }
        root.classList.add(theme)
    }, [theme])

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme)
            setTheme(theme)
        }
    }

    return (
        <>
            <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
        </>
    )
}

type ThemeHookType = ThemeContext & {}

export const useTheme = (): ThemeHookType => {
    return useContext(ThemeContext)
}
