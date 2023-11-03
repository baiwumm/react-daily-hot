/*
 * @Description: 入口文件
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-10-30 15:29:07
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-11-03 09:53:52
 */
import { App, ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN';
import { filter, includes } from 'lodash-es'
import { useState } from 'react'

import ActionButtons from '@/components/ActionButtons'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import HotContainer from '@/components/HotContainer'
import { LOCAL_KEY } from '@/enums'
import type { HotListConfig, HotTypes } from '@/types'
import { getLocalStorageItem } from '@/utils'

import { hotDataSource } from './components/HotContainer/config'
const { darkAlgorithm, compactAlgorithm, useToken } = theme;

function AppConatiner() {
  // 主题色
  const [primaryColor, setPrimaryColor] = useState(getLocalStorageItem(LOCAL_KEY.PRIMARYCOLOR) || '#1677ff');
  /**
  * @description: 过滤掉不显示的热榜
  */
  const filterHiddenHot = (): HotListConfig[] => {
    // 不显示的榜单列表
    const hiddenHotList = getLocalStorageItem<HotTypes[]>(LOCAL_KEY.HOTHIDDEN) || [];
    return hiddenHotList.length ? filter(hotDataSource, (config: HotListConfig) => !includes(hiddenHotList, config.value)) : hotDataSource
  }
  const [hotConfig, setHotConfig] = useState<HotListConfig[]>(filterHiddenHot())
  return (
    <ConfigProvider locale={zhCN} theme={{
      // algorithm: darkAlgorithm
      token: {
        colorPrimary: primaryColor,
      },
    }}>
      <App>
        <div id="appContainer" style={{
          // backgroundColor: 'var(--baiwu-bg-color)'
        }}>
          {/* 头部布局 */}
          <Header primaryColor={primaryColor} setPrimaryColor={setPrimaryColor} />
          {/* 今日热榜 */}
          <HotContainer primaryColor={primaryColor} hotConfig={hotConfig} />
          {/* 底部版权 */}
          <Footer />
          {/* 悬浮按钮 */}
          <ActionButtons setHotConfig={setHotConfig} filterHiddenHot={filterHiddenHot} />
        </div>
      </App>
    </ConfigProvider>
  )
}

export default AppConatiner
