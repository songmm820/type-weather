import { AnimatePresence, motion } from 'motion/react'
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { prefectureLevelCities } from '~/libs/WeatherLib.ts'

const WeatherSearchInput = ({ value = '', placeholder, onSearch }: { value?: string; placeholder?: string; onSearch?: (e: string) => void }) => {
    // 提示值ref
    const tipKeywordsRef = useRef<HTMLDivElement>(null)

    // 提示值
    const [tipKeywords, setTipKeywords] = useState<string[]>([])

    // 输入框值
    const [inputValue, setInputValue] = useState<string>(value ?? '')

    // 输入事件
    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        // 获取提示词
        const valueFormat = e.target.value.trim()
        if (valueFormat === '') {
            setTipKeywords([])
            onSearch?.('')
            return
        }
        const tipKeywords: string[] = prefectureLevelCities.filter((item) => item.includes(valueFormat))
        setTipKeywords(tipKeywords)
    }

    // 回车选中第一个
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (tipKeywords.length === 0) return
            handleClickSearch(tipKeywords[0])
        }
    }

    // 触发搜索
    const handleClickSearch = (e: string) => {
        if (!onSearch) return
        onSearch?.(e)
        setTipKeywords([])
    }

    useEffect(() => {
        setInputValue(value)
    }, [value])

    // 点击外部时间清空提示词，关闭浮层
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (tipKeywordsRef.current && !tipKeywordsRef.current.contains(e.target as Node)) {
                setTipKeywords([])
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div ref={tipKeywordsRef} className="w-126 flex items-center rounded-lg relative z-2 bg-dark-elevated-2">
            <input
                autoComplete={'off'}
                name="weather-search-input"
                className="w-full h-14 rounded-lg px-5 caret-self focus:border-2 focus:border-self transition-all duration-75 ease-linear"
                placeholder={placeholder ?? '搜索城市'}
                value={inputValue}
                onKeyDown={handleKeyDown}
                onInput={handleChangeInput}
                onFocus={handleChangeInput}
            />
            <AnimatePresence>
                {tipKeywords.length > 0 && (
                    <motion.div
                        className="p-2 mt-2 absolute top-full left-0 w-full h-auto max-h-60 overflow-auto rounded-lg bg-dark-elevated-2"
                        initial={{ opacity: 0, y: -10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                        <div className="flex flex-col items-center justify-center">
                            {tipKeywords.map((item, index) => (
                                <div
                                    key={index}
                                    className="w-full h-full flex items-center py-3 px-6 hover:bg-dark-elevated-3 cursor-pointer"
                                    onClick={() => handleClickSearch(item)}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default WeatherSearchInput
