/**
 * 文本组件
 */

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/libs/template-utils'
import { type ReactNode } from 'react'

const textVariants = cva('my-text', {
    variants: {
        size: {
            xs: 'text-xs',
            sm: 'text-sm',
            base: 'text-base',
            lg: 'text-lg',
            xl: 'text-xl',
            '2xl': 'text-2xl',
            '3xl': 'text-3xl'
        },
        weight: {
            normal: 'font-normal',
            medium: 'font-medium',
            semibold: 'font-semibold',
            bold: 'font-bold'
        },
        italic: { true: 'italic', false: '' },
        leading: {
            none: 'leading-none',
            tight: 'leading-tight',
            snug: 'leading-snug',
            normal: 'leading-normal',
            relaxed: 'leading-relaxed',
            loose: 'leading-loose'
        },
        color: {
            inherit: 'text-inherit',
            current: 'text-current',
            transparent: 'text-transparent',
            black: 'text-black',
            white: 'text-white',
            gray: 'text-gray-900',
            red: 'text-red-900',
            yellow: 'text-yellow-900',
            green: 'text-green-900',
            blue: 'text-blue-900',
            indigo: 'text-indigo-900',
            purple: 'text-purple-900',
            pink: 'text-pink-900'
        },
        userSelect: {
            false: 'select-none',
            true: 'select-text'
        }
    },
    defaultVariants: {
        size: 'base',
        weight: 'normal',
        italic: false,
        leading: 'normal',
        color: 'inherit',
        userSelect: true
    }
})

type Variants = VariantProps<typeof textVariants>

export interface TextProps extends Variants {
    as?: 'span' | 'p' | 'div' | 'label'
    children: ReactNode
    className?: string
}

export const Text = ({
    as: Comp = 'div',
    size,
    weight,
    italic,
    leading,
    color,
    className,
    children,
    ...props
}: TextProps) => {
    return (
        <Comp
            className={cn(textVariants({ size, weight, italic, leading, color }), className)}
            {...props}
        >
            {children}
        </Comp>
    )
}
