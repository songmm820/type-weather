/**
 * Storage 工具类
 */

export class StorageClass {
    private readonly prefix: string
    private storage: Storage

    constructor(storage: Storage, prefix: string) {
        this.storage = storage
        this.prefix = prefix
    }

    get<T>(key: string): T {
        const value = this.storage.getItem(this.getPrefixedKey(key))
        return JSON.parse(value as string) as T
    }

    set<T>(key: string, value: T): void {
        this.storage.setItem(this.getPrefixedKey(key), JSON.stringify(value))
    }
    remove(key: string): void {
        this.storage.removeItem(this.getPrefixedKey(key))
    }

    clear(): void {
        this.storage.clear()
    }

    private getPrefixedKey(key: string): string {
        return `${this.prefix}${key}`
    }
}

const prefixKey = `${import.meta.env.VITE_APP_KEY}_`

export const customLocalStorage = new StorageClass(localStorage, prefixKey)

export const customSessionStorage = new StorageClass(sessionStorage, prefixKey)
