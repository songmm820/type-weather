/**
 * 窗口管理工具类
 */

import { WebviewWindow } from '@tauri-apps/api/webviewWindow'

type CreateWindowParams = ConstructorParameters<typeof WebviewWindow>

/**
 * 创建新窗口
 *
 * 需要有窗口创建权限（ core:webview:allow-create-webview-window ）
 */
export async function createWindow(label: CreateWindowParams[0], options: CreateWindowParams[1]) {
    const webview = new WebviewWindow(label, options)

    await webview.once('tauri://created', (event) => {
        // eslint-disable-next-line no-console
        console.log('窗口创建成功!', event)
    })

    // 监听错误事件
    await webview.once('tauri://error', (e) => {
        // eslint-disable-next-line no-console
        console.error('窗口创建失败:', e)
    })
}
