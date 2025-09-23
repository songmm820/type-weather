/**
 * 操作系统信息工具
 */

import { platform, version, arch, locale, hostname, family, type } from '@tauri-apps/plugin-os'
import { check, Update } from '@tauri-apps/plugin-updater'
import { getVersion } from '@tauri-apps/api/app'
import { error, info } from '@tauri-apps/plugin-log'
import { relaunch } from '@tauri-apps/plugin-process'

/**
 * 获取操作系统类型
 *
 * 需要有读取系统信息权限（ core:default & os:allow-hostname ）
 * 可能返回的类型 'linux' | 'macos' | 'ios' | 'freebsd' | 'dragonfly' | 'netbsd' | 'openbsd' | 'solaris' | 'android' | 'windows';
 */
export async function getOsInfo(): Promise<{
    osType: ReturnType<typeof type>
    platform: ReturnType<typeof platform>
    version: ReturnType<typeof version>
    arch: ReturnType<typeof arch>
    locale: Awaited<ReturnType<typeof locale>>
    hostname: Awaited<ReturnType<typeof hostname>>
    family: ReturnType<typeof family>
}> {
    return {
        osType: type(),
        /** 操作系统平台 */
        platform: platform(),
        /** 操作系统类型 */
        family: family(),
        /** 操作系统版本 */
        version: version(),
        /** 操作系统架构 */
        arch: arch(),
        /** 操作系统语言 */
        locale: await locale(),
        /** 操作系统主机名 */
        hostname: await hostname()
    }
}

/**
 * 检查更新
 *
 * @returns {Promise<Update | 'NO_UPDATE'>} 更新器，如果没有更新，返回 NO_UPDATE
 */
export async function checkUpdateOS(): Promise<Update | 'NO_UPDATE'> {
    // 如果有更新，返回更新器，否则返回无更新标记
    try {
        const update = await check({
            // 超时时间,这个时间必须尽量大一些，防止请求更新文件失败。
            timeout: 300000
        })
        if (!update) return 'NO_UPDATE'
        return update
    } catch (err) {
        await error(`获取更新失败，请检查网路连接。: ${err}`)
        throw new Error(`获取更新失败，请检查网路连接。: ${err}`)
    }
}

/**
 * 下载并安装
 *
 * @param update 更新器
 * @param setPercent 设置下载进度
 */
export async function downloadAndInstall(
    update: Update,
    setPercent: (percent: number) => void
): Promise<void> {
    // 当前下载量
    let downloaded = 0
    // 总下载量
    let contentLength: number = 0
    // 下载并更新
    await update.downloadAndInstall((e) => {
        switch (e.event) {
            case 'Started':
                contentLength = e.data.contentLength ?? 0
                break
            case 'Progress':
                downloaded += e.data.chunkLength
                setPercent(
                    contentLength
                        ? Number(Math.min((downloaded / contentLength) * 100, 100).toFixed(2))
                        : 0
                )
                break
            case 'Finished':
                setPercent(100)
                break
        }
    })

    await info(`更新完成，即将重启应用。`)
    // 重启
    await relaunch()
}

/**
 * 获取当前本版本号
 *
 * @return {Promise<string>} 版本号
 */
export async function getCurrentVersion(): Promise<string> {
    return await getVersion()
}
