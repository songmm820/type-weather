/**
 * 进入离开动画处理
 *
 * 注意：保证路由的唯一key，否则动画只会触发首次。
 */

import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Transition } from 'motion'
import { motion, AnimatePresence, Variants } from 'motion/react'

const variants: Variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
}

const springTransition: Transition = {
    type: 'spring',
    stiffness: 300,
    damping: 25
}

const AnimatedLayout = ({ children }: { children: ReactNode }) => {
    // 保证路由变化时重新挂载
    const location = useLocation()
    return (
        <AnimatePresence mode="wait">
            <motion.div
                className="w-full h-full t-f-center"
                key={location.pathname}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={springTransition}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

export default AnimatedLayout
