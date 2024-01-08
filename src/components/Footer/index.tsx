/*
 * @Description: 底部版权
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-11-01 08:55:11
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-01-08 10:14:13
 */
import { CopyrightOutlined, GithubOutlined } from '@ant-design/icons'
import { Divider, Row, Space, Typography } from 'antd'
import { FC } from 'react'

import BeianImage from '@/assets/gongan.png'
import IcpImage from '@/assets/icp.png'

const { Text } = Typography;

const Footer: FC = () => {
  return (
    <Space direction="vertical" size="small" style={{ display: 'flex', padding: '20px 0' }}>
      <Row justify="center" align="middle">
        <Space size="small" align="center" wrap>
          <Text type="secondary"><CopyrightOutlined style={{ marginRight: 5 }} />Power by</Text>
          <a href="https://github.com/baiwumm" target="_blank">
            <Text type="secondary"><GithubOutlined style={{ marginRight: 5 }} />白雾茫茫丶</Text>
          </a>
        </Space>
        <Divider type="vertical" />
        <Space size="small" align="center" wrap>
          <Text type="secondary">本项目基于</Text>
          <a href="https://github.com/imsyy/DailyHot" target="_blank">
            <Space size="small" align="center" wrap>
              <Text type="secondary"><GithubOutlined style={{ marginRight: 5 }} />imsyy - DailyHot</Text>
            </Space>
          </a>
          <Text type="secondary">改造</Text>
        </Space>
      </Row>
      <Row justify="center" align="middle">
        <a href="https://beian.miit.gov.cn/" target="_blank" title="粤ICP备2023007649号">
          <img src={IcpImage} alt="粤ICP备2023007649号" style={{ width: 16, marginRight: 5 }} />
          <Text type="secondary">粤ICP备2023007649号</Text>
        </a>
        <Divider type="vertical" />
        <a href="https://beian.mps.gov.cn/#/query/webSearch" target="_blank" title="粤公网安备44030402006402号">
          <img src={BeianImage} alt="粤公网安备44030402006402号" style={{ width: 16, marginRight: 5 }} />
          <Text type="secondary">粤公网安备44030402006402号</Text>
        </a>
      </Row>
    </Space>
  )
}
export default Footer