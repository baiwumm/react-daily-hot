/*
 * @Description: 头部布局
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-10-30 15:51:30
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-11-03 09:26:42
 */
import { DownOutlined } from '@ant-design/icons'
import { useInterval, useUnmount } from 'ahooks'
import { ColorPicker, ConfigProvider, Flex, Image, Space, Tooltip, Typography } from 'antd'
import type { Color } from 'antd/es/color-picker'
import dayjs from 'dayjs'
import calendar from 'js-calendar-converter'
import { FC, useState } from 'react'

import Logo from '/favicon.ico'
import { LOCAL_KEY } from '@/enums'
import { setLocalStorageItem } from '@/utils'

const { Title, Text } = Typography

type HeaderProps = {
  primaryColor: string;
  setPrimaryColor: (value: string) => void;
}

const Header: FC<HeaderProps> = ({ primaryColor, setPrimaryColor }) => {
  // 实时时间
  const [nowTime, setNowTime] = useState<string>('')
  // 显示颜色选择器
  const [openColor, setOpenColor] = useState(false);
  /**
   * @description: 切换颜色
   */
  const changeColor = (color: Color) => {
    setPrimaryColor(color.toHexString());
    setLocalStorageItem(LOCAL_KEY.PRIMARYCOLOR, color.toHexString())
  }

  /**
   * @description: 渲染副文本
   */
  const renderSecondary = (text: string) => <Text type="secondary" style={{ fontSize: 12 }}>{text}</Text>

  /**
   * @description: 农历时间
   */
  const renderLunarCalendar = () => {
    // 解构农历对象
    const { gzYear, gzMonth, gzDay, IMonthCn, IDayCn, ncWeek } = calendar.solar2lunar()
    return renderSecondary(`${gzYear}年 ${gzMonth}月 ${gzDay}日 ${IMonthCn}${IDayCn} ${ncWeek}`)
  }

  /**
   * @description: 实时时间定时器
   */
  const clearInterval = useInterval(() => {
    setNowTime(dayjs().format('YYYY-MM-DD HH:mm:ss'));
  }, 1000);

  useUnmount(() => {
    clearInterval()
  })
  return (
    <div id="hot-header">
      <Flex justify="space-between" align="center">
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
        {/* 实时日期 */}
        <Space direction="vertical" size={0} style={{ display: 'flex' }} align="center">
          <Text>{nowTime}</Text>
          {renderLunarCalendar()}
        </Space>
        {/* 主题色 */}
        <Tooltip title="主题色">
          <ColorPicker
            value={primaryColor}
            onOpenChange={setOpenColor}
            onChangeComplete={changeColor}
            showText={() => <DownOutlined rotate={openColor ? 180 : 0} />} />
        </Tooltip>
      </Flex>
    </div>
  )
}
export default Header