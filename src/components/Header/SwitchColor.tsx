/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-01-09 11:34:05
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-01-09 14:19:58
 * @Description: 切换主题色
 */
import { blue, green, presetPalettes, red } from '@ant-design/colors';
import { DownOutlined } from '@ant-design/icons'
import type { ColorPickerProps } from 'antd';
import { ColorPicker, Row, Tooltip } from 'antd'
import type { Color } from 'antd/es/color-picker'
import { FC, useState } from 'react';

import { LOCAL_KEY } from '@/enums'
import { setLocalStorageItem } from '@/utils'
type Presets = Required<ColorPickerProps>['presets'][number];

type SwitchColorProps = {
  setPrimaryColor: (color: string) => void;
}

const SwitchColor: FC<SwitchColorProps> = ({ setPrimaryColor }) => {
  // 显示颜色选择器
  const [openColor, setOpenColor] = useState(false);
  // 预设颜色
  const genPresets = (presets = presetPalettes) =>
    Object.entries(presets).map<Presets>(([label, colors]) => ({
      label,
      colors,
    }));

  const presets = genPresets({
    blue,
    red,
    green,
  });

  /**
   * @description: 切换颜色
   */
  const changeColor = (color: Color) => {
    setPrimaryColor(color.toHexString());
    setLocalStorageItem(LOCAL_KEY.PRIMARYCOLOR, color.toHexString())
  }
  return (
    <Row justify='end'>
      {/* 主题色 */}
      <Tooltip title="主题色">
        <ColorPicker
          onOpenChange={setOpenColor}
          onChangeComplete={changeColor}
          presets={presets}
          showText={() => <DownOutlined rotate={openColor ? 180 : 0} />} />
      </Tooltip>
    </Row>
  )
}
export default SwitchColor
