/*
 * @Description: 热榜列表
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-10-30 16:01:49
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-01-09 17:28:53
*/
import 'dayjs/locale/zh-cn'

import { SyncOutlined } from '@ant-design/icons'
import { useInterval, useRequest, useUnmount } from 'ahooks'
import { Button, Card, ConfigProvider, Image, Result, Row, Skeleton, Space, Tag, Tooltip, Typography } from 'antd'
import dayjs from 'dayjs'
// 引入处理相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
import { eq, get, map } from 'lodash-es'
import { FC, ReactNode, useEffect, useMemo, useState } from 'react'

import { LOCAL_KEY } from '@/enums'
import type { HotListConfig, HotListItem, UpdateTime } from '@/types'
import { formatNumber, getLocalStorageItem, setLocalStorageItem } from '@/utils'

import { hotTagColor, weiboLable } from './config'
import styles from './index.module.scss'
const { Text } = Typography
// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

type HotListProps = {
  primaryColor: string;
  isDark: boolean;
}

const HotList: FC<HotListConfig & HotListProps> = ({ value, label, tip, primaryColor, isDark = false }) => {
  // 实时更新时间
  const [relativeTime, setRelativeTime] = useState<string>('');
  /**
   * @description: 请求榜单接口
   */
  const { data, loading, run } = useRequest(async () => {
    const response = await fetch(`https://api.baiwumm.com/hot/${value}`)
    if (eq(response.status, 200)) {
      const result = await response.json()
      const updateTime = getLocalStorageItem<UpdateTime>(LOCAL_KEY.UPDATETIME);
      if (updateTime) {
        setLocalStorageItem(LOCAL_KEY.UPDATETIME, { ...updateTime, [value]: dayjs().valueOf() })
      } else {
        setLocalStorageItem(LOCAL_KEY.UPDATETIME, { [value]: dayjs().valueOf() })
      }
      return result.data || []
    }
    return []
  }, {
    manual: true,
    // 防抖等待时间, 单位为毫秒，设置后，进入防抖模式
    debounceWait: 300,
    // 错误重试次数。如果设置为 -1，则无限次重试。
    retryCount: 3
  })

  /**
   * @description: 渲染头部
   */
  const renderTitle = useMemo(() => (
    <div>
      <Row style={{ justifyContent: 'space-between' }}>
        <Space align='center'>
          <Image src={`/${value}.svg`} alt={label} width={20} height={20} preview={false} />
          <Text>{label}</Text>
        </Space>
        <Tag bordered={false} color={primaryColor} style={{ fontSize: 12, marginInlineEnd: 0 }}>{tip}</Tag>
      </Row>
    </div>
  ), [primaryColor])

  /**
   * @description: 渲染主体
   */
  const renderContent = useMemo(() => {
    return (
      data ? (
        <ul className={styles['hot-container']}>
          {map(get(data, 'list', []), (item: HotListItem, index: number) => {
            const hasWeiboLabel: boolean = eq(value, 'weibo') && item.label
            return (
              <li key={item.id}>
                <div className='hot-box'>
                  <div
                    className="hot-index"
                    style={{
                      background: hasWeiboLabel && item.label ? weiboLable[item.label] : (hotTagColor[index] || (isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0,0,0,.04)')),
                      color: !isDark && (weiboLable[item.label || ''] || hotTagColor[index]) ? '#ffffff' : 'inherit'
                    }}>
                    {hasWeiboLabel ? item.label : index + 1}
                  </div>
                  <Tooltip title={item.title}>
                    <div className="hot-title" onClick={() => window.open(item.url)}>
                      {item.title}
                    </div>
                  </Tooltip>
                  {item.hot && <div className='hot-number' style={{
                    color: !isDark ? 'rgba(0, 0, 0, 0.45)' : 'inherit'
                  }}>{formatNumber(item.hot)}</div>}
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <Result
          status="error"
          title="加载失败"
          subTitle="抱歉，可能服务器遇到问题了，请稍微重试。"
        />
      )
    )
  }, [data, isDark])

  /**
   * @description: 渲染底部
   */
  const renderFooter = (): ReactNode[] => {
    return [
      <Text type="secondary" style={{ fontSize: 12 }} key="update">
        {relativeTime ? `${relativeTime}更新` : '正在加载中...'}
      </Text>,
      <Tooltip title="获取最新">
        <Button type="primary" shape="round" icon={<SyncOutlined spin={loading} />} size="small" onClick={run} />
      </Tooltip>
    ]
  }

  const clearInterval = useInterval(() => {
    const updateTime = getLocalStorageItem<UpdateTime>(LOCAL_KEY.UPDATETIME);
    // 更新文案
    const updateText = updateTime ? dayjs(updateTime[value]).fromNow() : dayjs().fromNow()
    setRelativeTime(updateText)
  }, 1000)

  useUnmount(() => {
    clearInterval();
  })

  // 只在可视范围内才加载数据
  useEffect(() => {
    if (!data && !loading) {
      run();
    }
  }, [])
  return (
    <ConfigProvider theme={{
      components: {
        List: {
          itemPaddingSM: '8px 0'
        },
        Result: {
          iconFontSize: 30,
          titleFontSize: 16,
          subtitleFontSize: 12
        }
      }
    }}>
      <Card
        title={renderTitle}
        actions={renderFooter()}
        headStyle={{ padding: '0 15px' }}
        bodyStyle={{ height: 300, overflow: 'hidden scroll', padding: '5px 15px' }}
        hoverable
      >
        <Skeleton active loading={loading} paragraph={{ rows: 10 }}>
          {renderContent}
        </Skeleton>
      </Card>
    </ConfigProvider >
  )
}
export default HotList