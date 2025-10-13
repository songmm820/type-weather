/**
 * 系统设置页面
 */

import { ask } from '@tauri-apps/plugin-dialog'
import { useEffect, useState } from 'react'
import { Update } from '@tauri-apps/plugin-updater'
import { checkUpdateOS, downloadAndInstall, getCurrentVersion } from '~/libs/os'

const SystemSettingPage = () => {
    // 当前版本号
    const [currentVersion, setCurrentVersion] = useState<string>('')

    // 当前下载进度
    const [downloadPercent, setDownloadPercent] = useState<number | null>(null)

    // 检查更新
    const onCheckUpdate = async () => {
        const update = await checkUpdateOS()
        if (update === 'NO_UPDATE') {
            // 没有更新
            return
        }
        const yes = await ask('检测到新版本，是否立即更新？', 'Tauri')
        if (yes) {
            await onDownloadUpdate(update)
        }
    }

    // 开始下载更新
    const onDownloadUpdate = async (update: Update) => {
        await downloadAndInstall(update, setDownloadPercent)
    }

    // 获取版本信息
    const onGetAppVersion = async () => {
        const version = await getCurrentVersion()
        setCurrentVersion(version)
    }

    useEffect(() => {
        onGetAppVersion().then()
    }, [])

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4.5">
            <div>当前版本：{currentVersion}</div>
            <div
                className="cursor-pointer flex flex-col items-center justify-center gap-4"
                onClick={onCheckUpdate}
            >
                <div>检查更新</div>
                {downloadPercent !== null && <div>下载进度：{downloadPercent}%</div>}
            </div>
        </div>
    )
}

export default SystemSettingPage
