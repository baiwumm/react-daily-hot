/*
 * @Description: 底部版权
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-11-01 08:55:11
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-11-14 13:46:50
 */
import { CopyrightOutlined, GithubOutlined } from '@ant-design/icons'
import { Row, Space, Typography } from 'antd'
import { FC } from 'react'

const { Text } = Typography;

const Footer: FC = () => {
  return (
    <Row style={{ padding: '1em' }} justify="center" align="middle">
      <Space size="small" align="center" wrap style={{ justifyContent: 'center' }}>
        <Text type="secondary"><CopyrightOutlined /> Power by </Text>
        <a href="https://github.com/baiwumm" target="_blank" style={{ marginLeft: 10 }}>
          <Text type="secondary"><GithubOutlined style={{ marginRight: 5 }} />白雾茫茫丶</Text>
        </a>
        <a href="https://beian.miit.gov.cn/" target="_blank" title="粤ICP备2023007649号-2">
          <img src="https://cdn.baiwumm.com/blog/images/icp.png!baiwu" alt="粤ICP备2023007649号-2" style={{ width: 16, marginRight: 5 }} />
          <Text type="secondary">粤ICP备2023007649号-2</Text>
        </a>
      </Space>
    </Row>
  )
}
export default Footer