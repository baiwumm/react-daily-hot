import { isNumber, isString } from 'lodash-es'

import type { HotListConfig } from '@/types'

/**
 * @description: 热榜配置
 * @author: 白雾茫茫丶
 */
export const hotDataSource: HotListConfig[] = [
  {
    value: 'weibo',
    label: '微博',
    tip: '热搜榜'
  },
  {
    value: 'bilibili',
    label: '哔哩哔哩',
    tip: '热门榜'
  },
  {
    value: 'douyin',
    label: '抖音',
    tip: '热点榜'
  },
  {
    value: 'toutiao',
    label: '今日头条',
    tip: '热榜'
  },
  {
    value: 'zhihu',
    label: '知乎',
    tip: '热榜'
  },
  {
    value: 'baidu',
    label: '百度',
    tip: '热搜榜'
  },
  {
    value: 'baidutieba',
    label: '百度贴吧',
    tip: '热议榜'
  },
  {
    value: 'qq',
    label: '腾讯新闻',
    tip: '热点榜'
  },
  {
    value: 'juejin',
    label: '稀土掘金',
    tip: '热榜'
  },
  {
    value: 'netease',
    label: '网易新闻',
    tip: '热榜'
  },
  {
    value: 'lol',
    label: '英雄联盟',
    tip: '更新公告'
  },
  {
    value: 'thepaper',
    label: '澎湃新闻',
    tip: '热榜'
  },
]

/**
 * @description: Tag 颜色配置
 * @author: 白雾茫茫丶
 */
export const hotTagColor: Record<string, string> = {
  0: '#ea444d',
  1: '#ed702d',
  2: '#eead3f'
}

/**
 * @description: 微博爆点配置
 * @author: 白雾茫茫丶
 */
export const weiboLable: Record<string, string> = {
  '热': '#ff9406',
  '沸': '#f86400',
  '新': '#ff3852',
  '暖': '#ffab5a',
  '爆': '#bd0000'
}

/**
 * @description: 格式化热度
 * @author: 白雾茫茫丶
 */
export const formatNumber = (value: number | string) => {
  if (!isString(value) && !isNumber(value)) {
    return
  }
  return (Math.floor((Number(value) / 10000) * 100) / 100) + '万';
}