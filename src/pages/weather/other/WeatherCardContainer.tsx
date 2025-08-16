import { ReactNode } from 'react'

const WeatherCardContainer = ({ label, desc, children }: { label: string; desc?: string | ReactNode; children: ReactNode }) => {
    return (
        <>
            <div className="bg-dark-elevated-1 rounded-md flex-1 px-6 pt-7 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>{label}</div>
                    <div>{desc}</div>
                </div>
                {children}
            </div>
        </>
    )
}

export default WeatherCardContainer
