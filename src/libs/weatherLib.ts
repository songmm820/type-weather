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
// 雨天图标
import rainIcon from '~/assets/weather/common/rain.png'
// 阴天图标
import overcastIcon from '~/assets/weather/common/overcast.png'
// 晴天图标
import sunCloudyIcon from '~/assets/weather/common/sun_cloudy.png'
// 高温图标
import hotIcon from '~/assets/weather/common/hot.png'
// 大雨图标
import bigRainIcon from '~/assets/weather/common/big_rain.png'
// 下雪雪图标
import snowIcon from '~/assets/weather/common/snow.png'

/** 天气状态枚举 */
export enum WeatherStatusEnum {
    /** 晴多云 */
    SUNNY_CLOUDY = 'SUNNY_CLOUDY',
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
    /** 雨 */
    RAIN = 'RAIN',
    /** 大雨 */
    HEAVY_RAIN = 'HEAVY_RAIN',
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
    const rainList = ['阵雨', '小雨', '中雨', '毛毛雨/细雨', '雨', '小雨-中雨', '雨雪天气', '雨夹雪', '阵雨夹雪', '冻雨']
    // 雷阵雨
    const heavyRainList = [
        '雷阵雨',
        '雷阵雨并伴有冰雹',
        '强雷阵雨',
        '大雨',
        '暴雨',
        '大暴雨',
        '特大暴雨',
        '强阵雨',
        '极端降雨',
        '中雨-大雨',
        '大雨-暴雨',
        '暴雨-大暴雨',
        '大暴雨-特大暴雨'
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
    // 判断是雷阵雨、大雨
    if (heavyRainList.includes(weatherText)) {
        statusSet.add(WeatherStatusEnum.HEAVY_RAIN)
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
export function getBackgroundByTime(hour: number, weatherList: WeatherStatusEnum[]): string {
    // 是否是夜晚
    const isNight = hour <= 6 || hour >= 18
    // 是否有雨
    const isRain = weatherList.some((w) => w === WeatherStatusEnum.RAIN || w === WeatherStatusEnum.OVERCAST)
    return isNight ? (isRain ? overcastNight : sunnyCloudyNight) : isRain ? overcastLight : sunnyCloudyLight
}

/**
 * 根据天气列表获取天气图标
 *
 * @param weatherList 天气列表
 */
export function getWeatherIcon(weatherList: WeatherStatusEnum[]): string {
    const weatherMap: Record<WeatherStatusEnum, string> = {
        [WeatherStatusEnum.SUNNY_CLOUDY]: sunCloudyIcon,
        [WeatherStatusEnum.RAIN]: rainIcon,
        [WeatherStatusEnum.OVERCAST]: overcastIcon,
        [WeatherStatusEnum.HOT]: hotIcon,
        [WeatherStatusEnum.HEAVY_RAIN]: bigRainIcon,
        [WeatherStatusEnum.COLD]: bigRainIcon,
        [WeatherStatusEnum.WIND]: bigRainIcon,
        [WeatherStatusEnum.SNOW]: snowIcon,
        [WeatherStatusEnum.FOG]: bigRainIcon,
        [WeatherStatusEnum.UNKNOWN]: bigRainIcon
    }
    return weatherMap[weatherList[0]]
}

// 全国地级市列表（337个）
export const prefectureLevelCities: string[] = [
    '北京市',
    '天津市',
    '上海市',
    '重庆市',
    '石家庄市',
    '唐山市',
    '秦皇岛市',
    '邯郸市',
    '邢台市',
    '保定市',
    '张家口市',
    '承德市',
    '沧州市',
    '廊坊市',
    '衡水市',
    '太原市',
    '大同市',
    '阳泉市',
    '长治市',
    '晋城市',
    '朔州市',
    '晋中市',
    '运城市',
    '忻州市',
    '临汾市',
    '吕梁市',
    '呼和浩特市',
    '包头市',
    '乌海市',
    '赤峰市',
    '通辽市',
    '鄂尔多斯市',
    '呼伦贝尔市',
    '巴彦淖尔市',
    '乌兰察布市',
    '沈阳市',
    '大连市',
    '鞍山市',
    '抚顺市',
    '本溪市',
    '丹东市',
    '锦州市',
    '营口市',
    '阜新市',
    '辽阳市',
    '盘锦市',
    '铁岭市',
    '朝阳市',
    '葫芦岛市',
    '长春市',
    '吉林市',
    '四平市',
    '辽源市',
    '通化市',
    '白山市',
    '松原市',
    '白城市',
    '哈尔滨市',
    '齐齐哈尔市',
    '鸡西市',
    '鹤岗市',
    '双鸭山市',
    '大庆市',
    '伊春市',
    '佳木斯市',
    '七台河市',
    '牡丹江市',
    '黑河市',
    '绥化市',
    '南京市',
    '无锡市',
    '徐州市',
    '常州市',
    '苏州市',
    '南通市',
    '连云港市',
    '淮安市',
    '盐城市',
    '扬州市',
    '镇江市',
    '泰州市',
    '宿迁市',
    '杭州市',
    '宁波市',
    '温州市',
    '嘉兴市',
    '湖州市',
    '绍兴市',
    '金华市',
    '衢州市',
    '舟山市',
    '台州市',
    '丽水市',
    '合肥市',
    '芜湖市',
    '蚌埠市',
    '淮南市',
    '马鞍山市',
    '淮北市',
    '铜陵市',
    '安庆市',
    '黄山市',
    '滁州市',
    '阜阳市',
    '宿州市',
    '六安市',
    '亳州市',
    '池州市',
    '宣城市',
    '福州市',
    '厦门市',
    '莆田市',
    '三明市',
    '泉州市',
    '漳州市',
    '南平市',
    '龙岩市',
    '宁德市',
    '南昌市',
    '景德镇市',
    '萍乡市',
    '九江市',
    '新余市',
    '鹰潭市',
    '赣州市',
    '吉安市',
    '宜春市',
    '抚州市',
    '上饶市',
    '济南市',
    '青岛市',
    '淄博市',
    '枣庄市',
    '东营市',
    '烟台市',
    '潍坊市',
    '济宁市',
    '泰安市',
    '威海市',
    '日照市',
    '临沂市',
    '德州市',
    '聊城市',
    '滨州市',
    '菏泽市',
    '郑州市',
    '开封市',
    '洛阳市',
    '平顶山市',
    '安阳市',
    '鹤壁市',
    '新乡市',
    '焦作市',
    '濮阳市',
    '许昌市',
    '漯河市',
    '三门峡市',
    '南阳市',
    '商丘市',
    '信阳市',
    '周口市',
    '驻马店市',
    '武汉市',
    '黄石市',
    '十堰市',
    '宜昌市',
    '襄阳市',
    '鄂州市',
    '荆门市',
    '孝感市',
    '荆州市',
    '黄冈市',
    '咸宁市',
    '随州市',
    '长沙市',
    '株洲市',
    '湘潭市',
    '衡阳市',
    '邵阳市',
    '岳阳市',
    '常德市',
    '张家界市',
    '益阳市',
    '郴州市',
    '永州市',
    '怀化市',
    '娄底市',
    '广州市',
    '韶关市',
    '深圳市',
    '珠海市',
    '汕头市',
    '佛山市',
    '江门市',
    '湛江市',
    '茂名市',
    '肇庆市',
    '惠州市',
    '梅州市',
    '汕尾市',
    '河源市',
    '阳江市',
    '清远市',
    '东莞市',
    '中山市',
    '潮州市',
    '揭阳市',
    '云浮市',
    '南宁市',
    '柳州市',
    '桂林市',
    '梧州市',
    '北海市',
    '防城港市',
    '钦州市',
    '贵港市',
    '玉林市',
    '百色市',
    '贺州市',
    '河池市',
    '来宾市',
    '崇左市',
    '海口市',
    '三亚市',
    '三沙市',
    '儋州市',
    '成都市',
    '自贡市',
    '攀枝花市',
    '泸州市',
    '德阳市',
    '绵阳市',
    '广元市',
    '遂宁市',
    '内江市',
    '乐山市',
    '南充市',
    '眉山市',
    '宜宾市',
    '广安市',
    '达州市',
    '雅安市',
    '巴中市',
    '资阳市',
    '贵阳市',
    '六盘水市',
    '遵义市',
    '安顺市',
    '毕节市',
    '铜仁市',
    '昆明市',
    '曲靖市',
    '玉溪市',
    '保山市',
    '昭通市',
    '丽江市',
    '普洱市',
    '临沧市',
    '拉萨市',
    '西安市',
    '铜川市',
    '宝鸡市',
    '咸阳市',
    '渭南市',
    '延安市',
    '汉中市',
    '榆林市',
    '安康市',
    '商洛市',
    '兰州市',
    '嘉峪关市',
    '金昌市',
    '白银市',
    '天水市',
    '武威市',
    '张掖市',
    '平凉市',
    '酒泉市',
    '庆阳市',
    '定西市',
    '陇南市',
    '西宁市',
    '银川市',
    '石嘴山市',
    '吴忠市',
    '固原市',
    '中卫市',
    '乌鲁木齐市',
    '克拉玛依市'
]
