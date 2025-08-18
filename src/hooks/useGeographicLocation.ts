/**
 * 地理定位信息 Hook
 */

import { useContext } from 'react'
import { GeographicLocationContext, GeographicLocationType } from '~/contexts/GeographicLocationContext.tsx'

type GeographicLocationHookType = GeographicLocationType & {
    onGetLocation: () => Promise<void>
}

// 因为为null阻塞渲染 这里直接断言不为null
export const useGeographicLocation = (): GeographicLocationHookType => {
    const context = useContext(GeographicLocationContext)!

    return {
        province: context.province,
        city: context.city,
        adCode: context.adCode,
        onGetLocation: context.onGetLocation
    }
}
