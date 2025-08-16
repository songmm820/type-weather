import { ReactNode } from 'react'

const WeatherCardContainer = ({ label, children }: { label: string; children: ReactNode }) => {
    return (
        <>
            <div className="bg-dark-elevated-1 rounded-md flex-1 px-6 pt-7 flex flex-col gap-4">
                <div>{label}</div>
                {children}
            </div>
        </>
    )
}

export default WeatherCardContainer
