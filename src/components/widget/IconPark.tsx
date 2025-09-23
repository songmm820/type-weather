/**
 * 组件：IconPark 图表组件
 *
 * @see https://iconpark.oceanengine.com/projects
 */

type IconParkProps = {
    icon: string
    color?: string
    onClick?: () => void
    size?: number
}

function IconPark(props: IconParkProps) {
    const iconColor = props.color || 'var(--text-base)'
    const iconSize = props.size || 18

    const handleClick = () => {
        props.onClick?.()
    }

    return (
        <>
            <svg
                aria-hidden={true}
                style={{ color: iconColor }}
                width={iconSize}
                height={iconSize}
                onClick={handleClick}
            >
                <use xlinkHref={`#${props.icon}`}></use>
            </svg>
        </>
    )
}

export default IconPark
