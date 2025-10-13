/**
 * 高德地图api请求类型定义
 */

/** 高德地图api请求返回参数类型定义 */
export type AmapWebApiResponse = {
    /** 返回结果状态值 值为0或1,0表示失败；1表示成功*/
    readonly status: 0 | 1
    /** 返回状态说明 返回状态说明，status 为0时，info 返回错误原因，否则返回“OK”*/
    readonly info: string
    /** 状态码 返回状态说明,10000代表正确,详情参阅 info 状态表 */
    readonly infocode: number
}

/** ************************ 位置信息 类型定义 ************************ */

/** IP 地址定位响应参数 */
export type AmapWebApiIpResponse = {
    /**
     * 省份名称
     *
     * 若为直辖市则显示直辖市名称；如果在局域网 IP 网段内，则返回“局域网”；非法 IP 以及国外 IP 则返回空。
     * */
    readonly province: string
    /**
     * 城市名称
     *
     * 若为直辖市则显示直辖市名称；如果为局域网网段内 IP 或者非法 IP 或国外 IP，则返回空。
     * */
    readonly city: string
    /**
     * 城市的 adcode 编码
     *
     * @see https://lbs.amap.com/api/webservice/download
     * */
    readonly adcode: string
    /** 所在城市矩形区域范围 所在城市范围的左下右上对标对 */
    readonly rectangle: string
}

/** ************************ 天气信息 类型定义 ************************ */

/** 天气信息请求数据 */
export type AmapWebApiWeatherRequestParams = {
    /** 高德地图api key */
    key: string
    /** 城市行政区划编码 */
    city: string
    /** 气象类型 base: 实况天气， all：预测天气 */
    extensions: 'base' | 'all'
}

/** 实况天气信息响应数据 */
export type AmapWebApiWeatherLiveResponse = Pick<
    AmapWebApiIpResponse,
    'province' | 'city' | 'adcode'
> & {
    /** 天气现象（汉字描述）*/
    readonly weather: string
    /** 实时气温，单位：摄氏度 */
    readonly temperature: string
    /** 风向描述 */
    readonly winddirection: string
    /** 风力等级，单位：级 */
    readonly windpower: string
    /** 湿度，百分比 */
    readonly humidity: string
    /** 数据观测时间 */
    readonly reporttime: string
}

/** 预报天气信息数据 */
export type AmapWebApiWeatherForecastResponse = Pick<
    AmapWebApiIpResponse,
    'province' | 'city' | 'adcode'
> & {
    /** 数据观测时间 */
    readonly reporttime: string
    /** 预报数据 list 结构，元素 cast,按顺序为当天、第二天、第三天的预报数据 */
    readonly casts: {
        /** 日期 */
        date: string
        /** 星期 */
        week: string
        /** 白天天气现象 */
        dayweather: string
        /** 夜间天气现象 */
        nightweather: string
        /** 白天温度，单位：摄氏度 */
        daytemp: string
        /** 夜间温度，单位：摄氏度 */
        nighttemp: string
        /** 白天风向 */
        daywind: string
        /** 夜间风向 */
        nightwind: string
        /** 白天风力，单位：级 */
        daypower: string
        /** 夜间风力，单位：级 */
        nightpower: string
    }[]
}

/** 获取天气信息响应参数 */
export type AmapWebApiWeatherResponse = {
    /** 实况天气数据信息 */
    lives?: AmapWebApiWeatherLiveResponse[]
    /** 预报天气信息数据 */
    forecast?: AmapWebApiWeatherForecastResponse[]
}

/** 逆地理编码 响应参数 */
export type AmapWebApiRegeoResponse = {
    /** 逆地理编码列表 */
    readonly regeocode: {
        /** 地址元素列表 */
        readonly addressComponent: {
            /** 坐标点所在国家名称 例如：中国 */
            country: string
            /** 坐标点所在省份名称 例如：北京市 */
            province: string
            /** 坐标点所在城市名称 请注意：当城市是省直辖县时返回为空，以及城市为北京、上海、天津、重庆四个直辖市时，该字段返回为空 */
            city: string
            /** 城市编码 例如：010 */
            citycode: string
            /** 坐标点所在区名称 例如：海淀区 */
            district: string
            /** 坐标点所在乡镇街道名称 例如：上地街道 */
            township: string
            /** 行政区编码 例如：110108 */
            adcode: string
        }
        readonly formatted_address: string
    }
}
