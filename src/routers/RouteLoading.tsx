import { motion, Variants } from 'motion/react'

// noinspection JSUnusedGlobalSymbols
const bounceVariants: Variants = {
    animate: (i: number) => ({
        y: [0, -30, 0],
        scale: [1, 0.3, 1],
        transition: {
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut'
        }
    })
}

const RouteLoading = () => (
    <div className="w-full h-full flex flex-col justify-center items-center">
        <motion.ul className="flex w-[60px] justify-around" style={{ listStyle: 'none' }}>
            {[0, 1, 2].map((i) => (
                <motion.li
                    key={i}
                    className="w-3 h-3 bg-[#bfbfd4] rounded-full"
                    custom={i}
                    variants={bounceVariants}
                    animate="animate"
                />
            ))}
        </motion.ul>
    </div>
)

export default RouteLoading
