import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'


/**
 * 拼接多个类名，并去除重复的类名
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
