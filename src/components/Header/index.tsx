/*
 * @Description: 头部布局
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-10-30 15:51:30
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-01-09 13:40:05
 */
import { useResponsive } from 'ahooks'
import { Col, ConfigProvider, Image, Row, Space, theme, Typography } from 'antd'
import { FC, ReactNode, useMemo } from 'react'

import Logo from '/logo.svg'

import RealTime from './RealTime'

const { Title, Text } = Typography

const { useToken } = theme;

type HeaderProps = {
  children: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
  const { token } = useToken();
  // 获取响应式信息。
  const { md } = useResponsive();

  /**
   * @description: 渲染副文本
   */
  const renderSecondary = (text: string) => <Text type="secondary" style={{ fontSize: 12 }}>{text}</Text>

  /**
   * @description: 渲染 logo 和标题
   */
  const renderTitle = useMemo(() => (
    <Space>
      <Image src={Logo} alt="今日热榜" width={50} height={50} preview={false} />
      <Space direction="vertical" size={0} style={{ display: 'flex' }}>
        <ConfigProvider theme={{
          components: {
            Typography: {
              titleMarginBottom: 0,
              // 此 Token 不生效
              titleMarginTop: 0,
            }
          }
        }}>
          <Title level={4} style={{ marginTop: 0 }}>今日热榜</Title>
        </ConfigProvider>
        {renderSecondary('汇聚全网热点，热门尽览无余')}
      </Space>
    </Space>
  ), [])

  return (
    <div id="hot-header" style={{ background: token.colorBgContainer, boxShadow: token.boxShadowTertiary }}>
      {md ? (
        <Row align='middle'>
          {/* 标题 */}
          <Col span={8}>{renderTitle}</Col>
          {/* 实时日期 */}
          <Col span={8}><RealTime /></Col>
          {/* 主题色 */}
          <Col span={8}>{children}</Col>
        </Row>
      ) : (
        <Row wrap={false}>
          {/* 标题 */}
          <Col flex="auto">{renderTitle}</Col>
          {/* 主题色 */}
          <Col flex="none">{children}</Col>
        </Row>
      )}
    </div>
  )
}
export default Header