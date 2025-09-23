import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.tsx'

// 生产环境屏蔽右键菜单
if (import.meta.env.PROD) {
    document.addEventListener('contextmenu', (e) => e.preventDefault())
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <App />
    </StrictMode>
)
