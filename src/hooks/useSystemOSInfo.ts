/**
 * 系统信息 Hook
 */

import { useContext } from 'react'
import { AppSystemOSInfoContext, AppSystemOSInfoType } from '~/contexts/AppSystemOSInfoContext.tsx'

type SystemOSInfoHookType = AppSystemOSInfoType & {
    onGetSystemOSInfo: () => Promise<void>
}

export const useSystemOSInfo = (): SystemOSInfoHookType => {
    const context = useContext(AppSystemOSInfoContext)!

    return {
        osType: context.osType,
        platform: context.platform,
        family: context.family,
        version: context.version,
        arch: context.arch,
        locale: context.locale,
        hostname: context.hostname,
        appVersion: context.appVersion,
        systemTime: context.systemTime,
        onGetSystemOSInfo: context.onGetSystemOSInfo
    }
}
