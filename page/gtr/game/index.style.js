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

// Row 1

export const BTN_NUM1_STYLE = {
  x: 0, 
  y: CORNER_Y, 
  w: ( DISPLAY_WIDTH - px(30) ) / 4, 
  h: px(80), 
  text_size: 48,
  radius: 12,
  normal_color: 0x404040,
  press_color: 0x808080,
  text: "-",
  ...ALIGN
}

export const BTN_NUM2_STYLE = {
  x: BTN_NUM1_STYLE.x + BTN_NUM1_STYLE.w + px(10),
  y: CORNER_Y, 
  w: ( DISPLAY_WIDTH - px(30) ) / 4, 
  h: px(80), 
  text_size: 48,
  radius: 12,
  normal_color: 0x202020,
  press_color: 0x808080,
  text: "-",
  ...ALIGN
}

export const BTN_NUM3_STYLE = {
  x: BTN_NUM2_STYLE.x + BTN_NUM2_STYLE.w + px(10),
  y: CORNER_Y, 
  w: ( DISPLAY_WIDTH - px(30) ) / 4, 
  h: px(80), 
  text_size: 48,
  radius: 12,
  normal_color: 0x202020,
  press_color: 0x808080,
  text: "-",
  ...ALIGN
}

export const BTN_NUM4_STYLE = {
  x: BTN_NUM3_STYLE.x + BTN_NUM3_STYLE.w + px(10),
  y: CORNER_Y, 
  w: ( DISPLAY_WIDTH - px(30) ) / 4, 
  h: px(80), 
  text_size: 48,
  radius: 12,
  normal_color: 0x202020,
  press_color: 0x808080,
  text: "-",
  ...ALIGN
}

// Row 2

export const BTN_PAD7_STYLE = {
  x: 0,
  y: BTN_NUM4_STYLE.y + BTN_NUM1_STYLE.h + px(10), 
  w: ( DISPLAY_WIDTH - px(20) ) / 3, 
  h: px(80), 
  text_size: 48,
  radius: 12,
  normal_color: 0xc6701b,
  press_color: 0xffc285,
  text: "7",
  ...ALIGN
}

export const BTN_PAD8_STYLE = {
  x: BTN_PAD7_STYLE.x + BTN_PAD7_STYLE.w + px(10),
  y: BTN_NUM4_STYLE.y + BTN_NUM1_STYLE.h + px(10), 
  w: ( DISPLAY_WIDTH - px(20) ) / 3, 
  h: px(80), 
  text_size: 48,
  radius: 12,
  normal_color: 0xc6701b,
  press_color: 0xffc285,
  text: "8",
  ...ALIGN
}

export const BTN_PAD9_STYLE = {
  x: BTN_PAD8_STYLE.x + BTN_PAD8_STYLE.w + px(10),
  y: BTN_NUM4_STYLE.y + BTN_NUM1_STYLE.h + px(10), 
  w: ( DISPLAY_WIDTH - px(20) ) / 3, 
  h: px(80), 
  text_size: 48,
  radius: 12,
  normal_color: 0xc6701b,
  press_color: 0xffc285,
  text: "9",
  ...ALIGN
}

// Row 3

export const BTN_PAD4_STYLE = {
  x: 0,
  y: BTN_PAD7_STYLE.y + BTN_PAD7_STYLE.h + px(10), 
  w: ( DISPLAY_WIDTH - px(20) ) / 3, 
  h: px(80), 
  text_size: 48,
  radius: 12,
  normal_color: 0xc6701b,
  press_color: 0xffc285,
  text: "4",
  ...ALIGN
}

export const BTN_PAD5_STYLE = {
  x: BTN_PAD4_STYLE.x + BTN_PAD4_STYLE.w + px(10),
  y: BTN_PAD7_STYLE.y + BTN_PAD7_STYLE.h + px(10), 
  w: ( DISPLAY_WIDTH - px(20) ) / 3, 
  h: px(80), 
  text_size: 48,
  radius: 12,
  normal_color: 0xc6701b,
  press_color: 0xffc285,
  text: "5",
  ...ALIGN
}

export const BTN_PAD6_STYLE = {
  x: BTN_PAD5_STYLE.x + BTN_PAD5_STYLE.w + px(10),
  y: BTN_PAD7_STYLE.y + BTN_PAD7_STYLE.h + px(10), 
  w: ( DISPLAY_WIDTH - px(20) ) / 3, 
  h: px(80), 
  text_size: 48,
  radius: 12,
  normal_color: 0xc6701b,
  press_color: 0xffc285,
  text: "6",
  ...ALIGN
}

// Row 4

export const BTN_PAD1_STYLE = {
  x: 0,
  y: BTN_PAD6_STYLE.y + BTN_PAD6_STYLE.h + px(10), 
  w: ( DISPLAY_WIDTH - px(20) ) / 3, 
  h: px(80), 
  text_size: 48,
  radius: 12,
  normal_color: 0xc6701b,
  press_color: 0xffc285,
  text: "1",
  ...ALIGN
}

export const BTN_PAD2_STYLE = {
  x: BTN_PAD1_STYLE.x + BTN_PAD1_STYLE.w + px(10),
  y: BTN_PAD6_STYLE.y + BTN_PAD6_STYLE.h + px(10), 
  w: ( DISPLAY_WIDTH - px(20) ) / 3, 
  h: px(80), 
  text_size: 48,
  radius: 12,
  normal_color: 0xc6701b,
  press_color: 0xffc285,
  text: "2",
  ...ALIGN
}

export const BTN_PAD3_STYLE = {
  x: BTN_PAD2_STYLE.x + BTN_PAD2_STYLE.w + px(10),
  y: BTN_PAD6_STYLE.y + BTN_PAD6_STYLE.h + px(10), 
  w: ( DISPLAY_WIDTH - px(20) ) / 3, 
  h: px(80), 
  text_size: 48,
  radius: 12,
  normal_color: 0xc6701b,
  press_color: 0xffc285,
  text: "3",
  ...ALIGN
}

// Row 5

export const BTN_CLR_STYLE = {
  x: 0,
  y: BTN_PAD3_STYLE.y + BTN_PAD3_STYLE.h + px(10), 
  w: ( DISPLAY_WIDTH - px(20) ) / 3, 
  h: px(80), 
  text_size: 48,
  radius: 12,
  normal_color: 0xc6701b,
  press_color: 0xffc285,
  text: "C",
  ...ALIGN
}

export const BTN_PAD0_STYLE = {
  x: BTN_CLR_STYLE.x + BTN_CLR_STYLE.w + px(10),
  y: BTN_PAD3_STYLE.y + BTN_PAD3_STYLE.h + px(10), 
  w: ( DISPLAY_WIDTH - px(20) ) / 3, 
  h: px(80), 
  text_size: 48,
  radius: 12,
  normal_color: 0xc6701b,
  press_color: 0xffc285,
  text: "0",
  ...ALIGN
}

export const BTN_SEND_STYLE = {
  x: BTN_PAD0_STYLE.x + BTN_PAD0_STYLE.w + px(10),
  y: BTN_PAD3_STYLE.y + BTN_PAD3_STYLE.h + px(10), 
  w: ( DISPLAY_WIDTH - px(20) ) / 3, 
  h: px(80), 
  text_size: 48,
  radius: 12,
  normal_color: 0xc6701b,
  press_color: 0xffc285,
  text: "✓",
  ...ALIGN
}

// Row 6

export const BTN_HISTORY_STYLE = {
  x: 0, 
  y: BTN_SEND_STYLE.y + BTN_SEND_STYLE.h + px(10), 
  w: DISPLAY_WIDTH, 
  h: px(72), 
  text_size: 36,
  radius: 12,
  normal_color: 0x404040,
  press_color: 0x808080,
  text: getText("historyBtn"),
  ...ALIGN
}

export const SPACER_STYLE = {
  x: 0,
  y: BTN_HISTORY_STYLE.y + BTN_HISTORY_STYLE.h,
  w: DISPLAY_WIDTH,
  h: SPACER_SIZE,
}
