import { ReactNode } from 'react'

const WeatherCardContainer = ({ label, desc, children }: { label: string; desc?: string | ReactNode; children: ReactNode }) => {
    return (
        <>
            <div className="bg-dark-elevated-1 rounded-md flex-1 px-6 pt-7 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className='text-large'>{label}</div>
                    <div className='text-base'>{desc}</div>
                </div>
                {children}
            </div>
        </>
    )
}

export default WeatherCardContainer
