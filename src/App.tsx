import '~/styles/App.css'
import router from '~/routers/RouterConfig.tsx'
import { RouterProvider } from 'react-router-dom'
import { GeographicLocationProvider } from '~/contexts/GeographicLocationProvider'
import { AppSystemInfoProvider } from '~/contexts/AppSystemOSInfoProvider'
import { WeatherProvider } from '~/contexts/WeatherProvider'
import { ThemeProvider } from '~/contexts/ThemeProvider'

const App = () => {
    return (
        <AppSystemInfoProvider>
            <ThemeProvider>
                <GeographicLocationProvider>
                    <WeatherProvider>
                        <RouterProvider router={router} />
                    </WeatherProvider>
                </GeographicLocationProvider>
            </ThemeProvider>
        </AppSystemInfoProvider>
    )
}

export default App
