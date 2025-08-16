import full_Logo from '~/assets/weather/full_logo.png'
import logo from '~/assets/weather/logo.png'

const Logo = ({ fullLogo, size = 100 }: { fullLogo: boolean; size: number }) => {
    return <img style={{ width: size, height: 'auto' }} src={fullLogo ? full_Logo : logo} alt="Logo" />
}

export default Logo
