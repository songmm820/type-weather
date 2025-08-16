/**
 * 地理定位信息 Hook
 */

import { useContext } from 'react'
import { GeographicLocationContext, GeographicLocationType } from '~/contexts/GeographicLocationContext.tsx'

type GeographicLocationHookType = GeographicLocationType & {
    onGetLocation: () => Promise<void>
} | null

export const useGeographicLocation = (): GeographicLocationHookType => {
    const context = useContext(GeographicLocationContext)

    if (!context) {
        return null
    }

    return {
        province: context.province,
        city: context.city,
        adCode: context.adCode,
        onGetLocation: context.onGetLocation
    }
}
