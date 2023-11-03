/*
 * @Description: 热榜列表
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-10-30 16:01:49
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-11-03 17:47:52
*/
import 'dayjs/locale/zh-cn'

import { SyncOutlined } from '@ant-design/icons'
import { useInterval, useRequest, useUnmount } from 'ahooks'
import { Button, Card, ConfigProvider, Image, List, Result, Row, Skeleton, Space, Tag, Tooltip, Typography } from 'antd'
import dayjs from 'dayjs'
// 引入处理相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
import { eq, get } from 'lodash-es'
import { FC, ReactNode, useState } from 'react'

import { LOCAL_KEY } from '@/enums'
import type { HotListConfig, HotListItem, UpdateTime } from '@/types'
import { getLocalStorageItem, setLocalStorageItem } from '@/utils'

import { hotTagColor, weiboLable } from './config'
import styles from './index.module.scss'
const { Text } = Typography
// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

type HotListProps = {
  primaryColor: string;
}

const HotList: FC<HotListConfig & HotListProps> = ({ value, label, tip, primaryColor }) => {
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
  })

  /**
   * @description: 渲染头部
   */
  const renderTitle = (
    <Row justify="space-between">
      <Space align='center'>
        <Image src={`/${value}.svg`} alt={label} width={20} height={20} preview={false} />
        <Text>{label}</Text>
      </Space>
      <Tag bordered={false} color={primaryColor} style={{ fontSize: 12, marginInlineEnd: 0 }}>{tip}</Tag>
    </Row>
  )

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
        bodyStyle={{ height: 300, overflow: 'hidden scroll', padding: '5px 20px' }}
        hoverable
      >
        <Skeleton active loading={loading} paragraph={{ rows: 10 }}>
          <List
            rowKey={(item) => item.id + item.hot}
            size="small"
            dataSource={get(data, 'list', [])}
            pagination={false}
            locale={{
              emptyText: <Result
                status="error"
                title="加载失败"
                subTitle="抱歉，可能服务器遇到问题了，请稍微重试。"
              />
            }}
            renderItem={(item: HotListItem, index: number) => {
              const hasWeiboLabel: boolean = eq(value, 'weibo') && item.label
              return (
                <List.Item style={{ justifyContent: 'start' }}>
                  <Tag
                    bordered={false}
                    color={hasWeiboLabel && item.label ? weiboLable[item.label] : (hotTagColor[index] || undefined)}>
                    {hasWeiboLabel ? item.label : index + 1}
                  </Tag>
                  <Text
                    className={styles.hotUrl}
                    ellipsis={{ tooltip: item.title }}
                    onClick={() => window.open(item.url)}>
                    {item.title}
                  </Text>
                </List.Item>
              )
            }}
          />
        </Skeleton>
      </Card>
    </ConfigProvider >
  )
}
export default HotList