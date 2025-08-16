/**
 * 日期时间工具类
 */

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import duration from 'dayjs/plugin/duration'
import isToday from 'dayjs/plugin/isToday'

// utc时间格式化
dayjs.extend(utc)
// 时长格式化
dayjs.extend(duration)
// 时区格式化
dayjs.extend(timezone)
// 是否是今天
dayjs.extend(isToday)

export { dayjs as customDayjs }
