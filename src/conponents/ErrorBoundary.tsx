/**
 * 错误边界 捕获子组件错误 防止页面崩溃
 */

import { Component, ErrorInfo, ReactNode } from 'react'

type ErrorBoundaryType = {
    /** 子组件 */
    children: ReactNode
    /** 错误展示内容 */
    fallback: ReactNode
    /** 重置 key，当 key 变化时，重置错误状态 */
    resetKeys?: Array<unknown>
    /** 重置回调 */
    onReset?: () => void
}

type State = { hasError: boolean }

export class ErrorBoundary extends Component<ErrorBoundaryType, State> {
    state: State = { hasError: false }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static getDerivedStateFromError(_error: Error): State {
        return { hasError: true }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    componentDidCatch(_error: Error, _info: ErrorInfo) {}

    componentDidUpdate(prevProps: ErrorBoundaryType) {
        const { hasError } = this.state
        const { resetKeys = [] } = this.props
        if (!hasError) return

        // 任一 key 变化 => 重置
        const hasChanged = resetKeys.some((key, idx) => key !== prevProps.resetKeys?.[idx])
        if (hasChanged) {
            this.props.onReset?.()
            this.setState({ hasError: false })
        }
    }

    render() {
        return this.state.hasError ? this.props.fallback : this.props.children
    }
}
