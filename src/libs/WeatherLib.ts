/**
 * 天气工具类
 */

// 晴天多云白天
import sunnyCloudyLight from '~/assets/weather/light/light_cloudy.png'
// 阴天白天
import overcastLight from '~/assets/weather/light/light_overcast .png'
// 晴天多云夜晚
import sunnyCloudyNight from '~/assets/weather/night/night_cloudy.png'
// 阴天夜晚
import overcastNight from '~/assets/weather/night/night_overcast.png'

/** 天气状态枚举 */
export enum WeatherStatusEnum {
    /** 晴多云 */
    SUNNY_CLOUDY = 'SUNNY_CLOUDY',
    /** 雨 */
    RAIN = 'RAIN',
    /** 雪 */
    SNOW = 'SNOW',
    /** 雾 / 霾 */
    FOG = 'FOG',
    /** 风 */
    WIND = 'WIND',
    /** 高温 */
    HOT = 'HOT',
    /** 低温 */
    COLD = 'COLD',
    /** 阴天 */
    OVERCAST = 'OVERCAST',
    /** 未知 */
    UNKNOWN = 'UNKNOWN'
}

/** 季节枚举 */
export enum SeasonEnum {
    SPRING = 'SPRING',
    SUMMER = 'SUMMER',
    AUTUMN = 'AUTUMN',
    WINTER = 'WINTER'
}

// 将高德返回的天气情况归类
export const getWeatherStatus = (weatherText: string, temperature: number, windpower: '<=3' | number): WeatherStatusEnum[] => {
    const statusSet: Set<WeatherStatusEnum> = new Set()

    // 阴天
    const overcastList = ['阴']
    // 晴
    const sunnyList = ['热', '晴', '多云', '少云', '晴间多云', '晴有霾', '晴有雾', '晴有风', '微风', '和风', '清风']
    // 雨
    const rainList = [
        '阵雨',
        '雷阵雨',
        '雷阵雨并伴有冰雹',
        '小雨',
        '中雨',
        '大雨',
        '暴雨',
        '大暴雨',
        '特大暴雨',
        '强阵雨',
        '强雷阵雨',
        '极端降雨',
        '毛毛雨/细雨',
        '雨',
        '小雨-中雨',
        '中雨-大雨',
        '大雨-暴雨',
        '暴雨-大暴雨',
        '大暴雨-特大暴雨',
        '雨雪天气',
        '雨夹雪',
        '阵雨夹雪',
        '冻雨'
    ]
    // 雪
    const snowList = ['雨雪天气', '雨夹雪', '阵雨夹雪', '雪', '阵雪', '小雪', '中雪', '大雪', '暴雪', '小雪-中雪', '中雪-大雪', '大雪-暴雪']
    // 雾 / 霾
    const fogList = ['霾', '中度霾', '重度霾', '严重霾', '浮尘', '扬沙', '沙尘暴', '强沙尘暴', '龙卷风', '雾', '浓雾', '强浓雾', '轻雾', '大雾', '特强浓雾']
    // 风
    const windList = ['强风/劲风', '疾风', '大风', '烈风', '风暴', '狂爆风', '飓风', '热带风暴']

    // 1. 首先，根据温度判断是否为高温或低温
    // 高于30度为高温
    if (temperature > 30) {
        statusSet.add(WeatherStatusEnum.HOT)
    }
    // 低于10度为低温
    if (temperature < 10) {
        statusSet.add(WeatherStatusEnum.COLD)
    }

    // 2. 根据天气情况判断
    if (sunnyList.includes(weatherText)) {
        statusSet.add(WeatherStatusEnum.SUNNY_CLOUDY)
    }
    // 判断是否雨雪
    if (rainList.includes(weatherText)) {
        statusSet.add(WeatherStatusEnum.RAIN)
    }
    if (snowList.includes(weatherText)) {
        statusSet.add(WeatherStatusEnum.SNOW)
    }
    // 判断是否雾霾
    if (fogList.includes(weatherText)) {
        statusSet.add(WeatherStatusEnum.FOG)
    }

    // 判断是否风
    if (Number(windpower) >= 4 || windList.includes(weatherText)) {
        statusSet.add(WeatherStatusEnum.WIND)
    }

    // 判断是否阴天
    if (overcastList.includes(weatherText)) {
        statusSet.add(WeatherStatusEnum.OVERCAST)
    }

    // 3. 如果没有匹配到，则默认为未知
    if (statusSet.size === 0) {
        statusSet.add(WeatherStatusEnum.UNKNOWN)
    }

    return Array.from(statusSet)
}

/**
 * 根据月份获取当前季节
 *
 * @param month 月份
 * @returns 当前季节
 */
export function getSeasonByMonth(month: number): SeasonEnum {
    if (month >= 3 && month <= 5) return SeasonEnum.SPRING
    if (month >= 6 && month <= 8) return SeasonEnum.SUMMER
    if (month >= 9 && month <= 11) return SeasonEnum.AUTUMN
    if (month === 12 || month === 1 || month === 2) return SeasonEnum.WINTER
    return SeasonEnum.SPRING
}

/**
 * 根据当前时间、天气获取当前对应背景
 *
 * @param hour 当前时间（时）
 * @param weatherList 天气列表
 */
export function getBackgroundByTime(hour: number, weatherList: WeatherStatusEnum[]) {
    const isNight = hour <= 6 || hour >= 18 // 顺序调换，可读性更好
    const isRain = weatherList.some((w) => w === WeatherStatusEnum.RAIN || w === WeatherStatusEnum.OVERCAST)

    return isNight ? (isRain ? overcastNight : sunnyCloudyNight) : isRain ? overcastLight : sunnyCloudyLight
}
