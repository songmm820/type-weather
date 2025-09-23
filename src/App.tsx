import '~/styles/App.css'
import router from '~/routers/RouterConfig.tsx'
import { RouterProvider } from 'react-router-dom'
import { GeographicLocationProvider } from '~/contexts/GeographicLocationContext.tsx'
import { AppSystemInfoProvider } from '~/contexts/AppSystemOSInfoContext.tsx'
import { WeatherProvider } from '~/contexts/WeatherContent.tsx'

const App = () => {
    return (
        // <AppSystemInfoProvider>
        //     <GeographicLocationProvider>
        //         <WeatherProvider>
        //             <RouterProvider router={router} />
        //         </WeatherProvider>
        //     </GeographicLocationProvider>
        // </AppSystemInfoProvider>
        <RouterProvider router={router} />
    )
}

export default App
