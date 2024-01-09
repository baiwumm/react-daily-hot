/*
 * @Description: 今日热榜
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-10-30 16:01:49
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-01-09 13:49:36
 */
import { Col } from 'antd'
import { map } from 'lodash-es'
import { FC } from 'react'

import type { HotListConfig } from '@/types'

import HotList from './HotList'

type HotContainerProps = {
  primaryColor: string;
  hotConfig: HotListConfig[];
  isDark: boolean;
}

const HotContainer: FC<HotContainerProps> = ({ primaryColor, hotConfig = [], isDark }) => {

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(20rem,1fr))', gap: '1.2rem', padding: '0 4vw' }}>
      {
        map(hotConfig, (config: HotListConfig) => (
          <Col span={24} key={config.value}>
            <HotList {...config} primaryColor={primaryColor} isDark={isDark} />
          </Col>
        ))
      }
    </div>
  )
}
export default HotContainer