import { ChangeEvent } from 'react'

const WeatherSearchInput = ({ onInput }: { onInput?: (e: ChangeEvent<HTMLInputElement>) => void }) => {
    return <input className="bg-dark-elevated-2 w-126 h-14 rounded-lg px-5" placeholder="搜索城市" onInput={onInput} />
}

export default WeatherSearchInput
