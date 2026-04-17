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

export const BTN_LOAD_STYLE = {
  x: 0, 
  y: CORNER_Y, 
  w: DISPLAY_WIDTH, 
  h: px(72), 
  text_size: 36,
  radius: 12,
  normal_color: 0xc6701b,
  press_color: 0xffc285,
  text: getText("continueBtn"),
  ...ALIGN
}

export const TEXT_LOAD_STYLE = {
  text: getText("continueHint"),
  x: 0,
  y: BTN_LOAD_STYLE.y + BTN_LOAD_STYLE.h + px(5),
  w: DISPLAY_WIDTH,
  h: px(70),
  color: 0xffffff,
  text_size: px(24),
  text_style: text_style.WRAP,
  ...ALIGN
}

export const BTN_EASY_STYLE = {
  x: 0, 
  y: TEXT_LOAD_STYLE.y + TEXT_LOAD_STYLE.h + px(5), 
  w: DISPLAY_WIDTH, 
  h: px(72), 
  text_size: 36,
  radius: 12,
  normal_color: 0xc6701b,
  press_color: 0xffc285,
  text: getText("easyBtn"),
  ...ALIGN
}

export const TEXT_EASY_STYLE = {
  text: getText("easyHint"),
  x: 0,
  y: BTN_EASY_STYLE.y + BTN_EASY_STYLE.h + px(5),
  w: DISPLAY_WIDTH,
  h: px(70),
  color: 0xffffff,
  text_size: px(24),
  text_style: text_style.WRAP,
  ...ALIGN
}

export const BTN_MEDIUM_STYLE = {
  x: 0, 
  y: TEXT_EASY_STYLE.y + TEXT_EASY_STYLE.h + px(5), 
  w: DISPLAY_WIDTH, 
  h: px(72), 
  text_size: 36,
  radius: 12,
  normal_color: 0xc6701b,
  press_color: 0xffc285,
  text: getText("mediumBtn"),
  ...ALIGN
}

export const TEXT_MEDIUM_STYLE = {
  text: getText("mediumHint"),
  x: 0,
  y: BTN_MEDIUM_STYLE.y + BTN_MEDIUM_STYLE.h + px(5),
  w: DISPLAY_WIDTH,
  h: px(70),
  color: 0xffffff,
  text_size: px(24),
  text_style: text_style.WRAP,
  ...ALIGN
}

export const BTN_HARD_STYLE = {
  x: 0, 
  y: TEXT_MEDIUM_STYLE.y + TEXT_MEDIUM_STYLE.h + px(5), 
  w: DISPLAY_WIDTH, 
  h: px(72), 
  text_size: 36,
  radius: 12,
  normal_color: 0xc6701b,
  press_color: 0xffc285,
  text: getText("hardBtn"),
  ...ALIGN
}

export const TEXT_HARD_STYLE = {
  text: getText("hardHint"),
  x: 0,
  y: BTN_HARD_STYLE.y + BTN_HARD_STYLE.h + px(5),
  w: DISPLAY_WIDTH,
  h: px(70),
  color: 0xffffff,
  text_size: px(24),
  text_style: text_style.WRAP,
  ...ALIGN
}

export const SPACER_STYLE = {
  x: 0,
  y: TEXT_HARD_STYLE.y + TEXT_HARD_STYLE.h + px(5),
  w: DISPLAY_WIDTH,
  h: SPACER_SIZE,
}
