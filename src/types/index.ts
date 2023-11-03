/**
 * @description: 榜单类型
 * @author: 白雾茫茫丶
 */
export type HotTypes = 'weibo' | 'bilibili' | 'douyin' | 'toutiao' | 'zhihu' | 'baidu' | 'baidutieba' | 'qq' | 'juejin' | 'netease' | 'lol' | 'thepaper'

/**
 * @description: 表单子项
 * @author: 白雾茫茫丶
 */
export type HotListItem = {
  id: string;
  title: string;
  desc: string;
  pic: string;
  hot: number | string;
  url: string;
  mobileUrl: string;
  label?: string;
}

/**
 * @description: 榜单配置
 * @author: 白雾茫茫丶
 */
export type HotListConfig = {
  value: HotTypes;
  label: string;
  tip: string;
}

/**
 * @description: 更新时间
 * @author: 白雾茫茫丶
 */
export type UpdateTime = Record<HotTypes, number>

/**
 * @description: 主题模式
 * @author: 白雾茫茫丶
 */
export type ThemeName = 'light' | 'dark';