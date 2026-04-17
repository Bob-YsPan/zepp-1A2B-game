import { align, text_style } from '@zos/ui'
import { getText } from '@zos/i18n'
import { getDeviceInfo } from '@zos/device'
import { px } from '@zos/utils'

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();

const CORNER_X = DEVICE_WIDTH / 6;
const CORNER_Y = DEVICE_HEIGHT / 6 + px(12);
const DISPLAY_WIDTH = DEVICE_WIDTH - DEVICE_WIDTH / 3;
const SPACER_SIZE = DEVICE_HEIGHT / 6 + px(12);

const ALIGN = { align_h: align.CENTER_H, align_v: align.CENTER_V }

export const VIEW_CONTAINER_STYLE = {
  x: CORNER_X, 
  y: 0, 
  w: DISPLAY_WIDTH, 
  h: DEVICE_HEIGHT, 
}

export const TEXT_TITLE_STYLE = {
  text: getText("historyBtn"),
  x: 0,
  y: CORNER_Y,
  w: DISPLAY_WIDTH,
  h: px(60),
  color: 0xffffff,
  text_size: px(36),
  text_style: text_style.WRAP,
  ...ALIGN
}

export const RECT_LINE_STYLE = {
  x: 0, 
//   y: TEXT_TITLE_STYLE.y + TEXT_TITLE_STYLE.h + px(10), 
  w: DISPLAY_WIDTH, 
  h: px(72), 
  radius: 12,
  color: 0x404040,
  ...ALIGN
}

export const TEXT_LINE_STYLE = {
//   text: "???? - ?A?B",
  x: 0,
//   y: TEXT_TITLE_STYLE.y + TEXT_TITLE_STYLE.h + px(10),
  w: DISPLAY_WIDTH,
  h: px(72),
  color: 0xffffff,
  text_size: px(36),
  text_style: text_style.WRAP,
  ...ALIGN
}

export const SPACER_STYLE = {
  x: 0,
//   y: TEXT_LINE_STYLE.y + TEXT_LINE_STYLE.h + px(10),
  w: DISPLAY_WIDTH,
  h: SPACER_SIZE,
}
