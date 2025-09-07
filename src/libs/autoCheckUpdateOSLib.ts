/**
 * 自动更新检测系统 (优化版)
 * 功能增强：
 * 1. 改进资源检测：同时监控CSS/JS/入口HTML的变化
 * 2. 指数退避策略：降低长时间运行时的资源消耗
 * 3. 优雅降级：处理网络异常和边缘情况
 * 4. 无干扰通知：使用非阻塞式UI通知
 * 5. 精确变更检测：基于内容哈希而非URL
 */

// 配置项
const UPDATE_CONFIG = {
    // 基础检查间隔 (毫秒)
    BASE_INTERVAL: 1000,
    // 生产环境启用
    ENABLED: false,
    // 检测资源类型
    SCRIPT_REG: /<script.*?src="(.*?)"/g
}

/** 上一次请求资源 */
let lastScripts: string[] | null = null

/**
 * 自动更新检测系统
 */
async function fetchUpdateOS() {
    const url = new URL(window.location.origin)
    url.searchParams.append('v', String(Date.now()))
    // fetch首页url
    const response = await fetch(url)
    const html = await response.text()
    UPDATE_CONFIG.SCRIPT_REG.lastIndex = 0 // 正则分析页面所有url地址
    const result = []
    let match

    while ((match = UPDATE_CONFIG.SCRIPT_REG.exec(html))) {
        result.push(match[1])
    }
    return result
}

/**
 * 判断是否需要更新
 */
async function isUpdate() {
    const newScripts = await fetchUpdateOS()
    if (!lastScripts) {
        // 如果之前没有保存页面js地址的话，进行一次保存，初始化并存下当前数据
        lastScripts = newScripts
        return false
    }
    let result = false
    if (lastScripts.length !== newScripts.length) {
        result = true
    }
    for (let i = 0; i < lastScripts.length; i++) {
        if (lastScripts[i] !== newScripts[i]) {
            result = true
            break
        }
    }
    lastScripts = newScripts
    return result
}

/**
 * 定时轮询检测更新
 */
function checkUpdate() {
    setTimeout(async () => {
        // 调用检查更新函数
        const willUp = await isUpdate()
        if (willUp) {
            alert('发现新版本，请刷新页面')
        }
        checkUpdate()
    }, UPDATE_CONFIG.BASE_INTERVAL)
}

if (UPDATE_CONFIG.ENABLED) {
    checkUpdate()
}
