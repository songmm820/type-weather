/**
 * 系统信息 Hook
 */

import { useContext } from 'react'
import { AppSystemOSInfoContext, AppSystemOSInfoType } from '~/contexts/AppSystemOSInfoContext.tsx'

type SystemOSInfoHookType =
    | (AppSystemOSInfoType & {
          onGetSystemOSInfo: () => Promise<void>
      })
    | null

export const useSystemOSInfo = (): SystemOSInfoHookType => {
    const context = useContext(AppSystemOSInfoContext)

    if (!context) {
        return null
    }

    return {
        osType: context.osType,
        platform: context.platform,
        family: context.family,
        version: context.version,
        arch: context.arch,
        locale: context.locale,
        hostname: context.hostname,
        appVersion: context.appVersion,
        onGetSystemOSInfo: context.onGetSystemOSInfo
    }
}
