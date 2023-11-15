/*
 * @Description: 热榜列表
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-10-30 16:01:49
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-11-15 09:45:05
*/
import 'dayjs/locale/zh-cn'

import { SyncOutlined } from '@ant-design/icons'
import { useInterval, useRequest, useResponsive, useUnmount } from 'ahooks'
import { Button, Card, Col, ConfigProvider, Empty, Image, List, Result, Row, Skeleton, Space, Tag, Tooltip, Typography } from 'antd'
import dayjs from 'dayjs'
// 引入处理相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
import { eq, get } from 'lodash-es'
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
}

const HotList: FC<HotListConfig & HotListProps> = ({ value, label, tip, primaryColor }) => {
  // 实时更新时间
  const [relativeTime, setRelativeTime] = useState<string>('');
  // 获取响应式信息。
  const { md } = useResponsive();
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
      <List
        rowKey={(item) => item.id + item.hot}
        size="small"
        dataSource={get(data, 'list', [])}
        pagination={false}
        locale={{
          emptyText: data ? <Result
            status="error"
            title="加载失败"
            subTitle="抱歉，可能服务器遇到问题了，请稍微重试。"
          /> : <Empty />
        }}
        renderItem={(item: HotListItem, index: number) => {
          const hasWeiboLabel: boolean = eq(value, 'weibo') && item.label
          return (
            <List.Item style={{ justifyContent: 'start' }}>
              <Row gutter={10} wrap={false} style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <Col flex="none">
                  <Tag
                    bordered={false}
                    style={{ marginInlineEnd: 0 }}
                    color={hasWeiboLabel && item.label ? weiboLable[item.label] : (hotTagColor[index] || undefined)}>
                    {hasWeiboLabel ? item.label : index + 1}
                  </Tag>
                </Col>
                {md ? (
                  <Col flex="auto">
                    <Text
                      className={styles.hotUrl}
                      ellipsis={{ tooltip: item.title }}
                      onClick={() => window.open(item.url)}
                    >
                      {item.title}
                    </Text>
                  </Col>
                ) : (
                  <Col flex="auto">
                    <Text
                      className={styles.hotUrl}
                      ellipsis={{ tooltip: item.title }}
                      onClick={() => window.open(item.mobileUrl)}
                    >
                      {item.title}
                    </Text>
                  </Col>
                )}
                {
                  item.hot && (
                    <Col flex="none">
                      <Text type='secondary' style={{ fontSize: 12 }}>{formatNumber(item.hot)}</Text>
                    </Col>
                  )
                }
              </Row>
            </List.Item>
          )
        }}
      />
    )
  }, [data])

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