/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-01-09 08:58:20
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-01-09 09:01:17
 * @Description: 实时时间
 */
import { useInterval, useUnmount } from 'ahooks'
import { Space, Typography } from 'antd'
import dayjs from 'dayjs'
import calendar from 'js-calendar-converter'
import { FC, useState } from 'react';
const { Text } = Typography

const RealTime: FC = () => {
  // 实时时间
  const [nowTime, setNowTime] = useState<string>('');
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
    <Space direction="vertical" size={0} style={{ display: 'flex' }} align="center" className="hot-header-time">
      {
        nowTime ? (
          <>
            <Text>{nowTime}</Text>
            {renderLunarCalendar()}
          </>
        ) : <Text type='secondary'>正在加载时间...</Text>
      }
    </Space>
  )
}
export default RealTime;
