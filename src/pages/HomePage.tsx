import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '~/components/ui/DropdownMenu'
import { useTheme } from '~/contexts/ThemeProvider'

const HomePage = () => {
    const { setTheme } = useTheme()

    return (
        <>
            <div className="w-full h-full bg-no-repeat bg-cover p-6">
                <DropdownMenu>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <p>
                    <button onClick={() => setTheme('light')}>light</button>
                    <br />
                    <button onClick={() => setTheme('dark')}>dark</button>
                    <br />
                    <button onClick={() => setTheme('system')}>system</button>
                </p>
            </div>
        </>
    )
}

export default HomePage
