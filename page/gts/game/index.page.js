import { createWidget, widget, prop } from '@zos/ui'
import { log as Logger } from '@zos/utils'
import { VIEW_CONTAINER_STYLE, BTN_NUM1_STYLE, BTN_NUM2_STYLE, BTN_NUM3_STYLE, BTN_NUM4_STYLE, 
  BTN_PAD7_STYLE, BTN_PAD8_STYLE, BTN_PAD9_STYLE, BTN_PAD4_STYLE, BTN_PAD5_STYLE, BTN_PAD6_STYLE,
  BTN_PAD1_STYLE, BTN_PAD2_STYLE, BTN_PAD3_STYLE, BTN_CLR_STYLE, BTN_PAD0_STYLE, BTN_SEND_STYLE,
  BTN_HISTORY_STYLE, BTN_NEWGAME_STYLE, SPACER_STYLE } from './index.style'
import { onKey, KEY_HOME, KEY_EVENT_PRESS, KEY_EVENT_RELEASE } from '@zos/interaction'
import { back } from '@zos/router'
import { Vibrator, VIBRATOR_SCENE_SHORT_MIDDLE, VIBRATOR_SCENE_SHORT_STRONG } from '@zos/sensor'
import { px } from '@zos/utils'
import { getText } from '@zos/i18n'

const logger = Logger.getLogger("zepp-1a2b-game");

params = null;
let btn_num1, btn_num2, btn_num3, btn_num4;
let btn_pad7, btn_pad8, btn_pad9;
let btn_pad4, btn_pad5, btn_pad6;
let btn_clr, btn_pad0, btn_send;
let btn_history, btn_newgame;

current_index = 0;

// difficult
gamemode = 0;

function handle_keypad(key_id) {
  logger.log(`handle key ${key_id}, index ${current_index}`);
  input_btns = [btn_num1, btn_num2, btn_num3, btn_num4];
  // 處理數字鍵 (0-9)
  if (key_id >= 0 && key_id <= 9) {
    // 1. 更新當前按鈕的文字，取消高亮
    logger.log(`change input btn`);
    input_btns[current_index].setProperty(prop.MORE, {
      text: key_id.toString(),
      normal_color: 0x202020
    });

    // 3. 移動到下一個索引，若超過 3 則回到 0
    current_index = (current_index + 1) % 4;

    // 4. 設定下一個按鈕為高亮
    input_btns[current_index].setProperty(prop.MORE, {
      normal_color: 0x404040
    });
  } 
  
  // 處理清除鍵 (20)
  else if (key_id === 20) {
    for (var i = 0; i < input_btns.length; i++) {
      // 將文字重設為 "-" 並取消所有高亮
      input_btns[i].setProperty(prop.MORE, {
        text: key_id.toString(),
        normal_color: 0x202020
      });
    }
    // 回到第一個數字並設定高亮
    current_index = 0;
    input_btns[current_index].setProperty(prop.MORE, {
      normal_color: 0x404040
    });
  } 
  
  // 處理傳送鍵 (21)
  else if (key_id === 21) {
    send_data();
  }
}

// 預留的擴充函式
function send_data() {
  // 在此實作傳送邏輯
  console.log("Data sent!");
}

Page({
  build() {
    logger.debug('page build invoked')
    const viewContainer = createWidget(widget.VIEW_CONTAINER, {
      ...VIEW_CONTAINER_STYLE
    })
    btn_num1 = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_NUM1_STYLE,
      click_func: () => {
        handle_keypad(11);
      }
    });
    btn_num2 = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_NUM2_STYLE,
      click_func: () => {
        handle_keypad(12);
      }
    });
    btn_num3 = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_NUM3_STYLE,
      click_func: () => {
        handle_keypad(13);
      }
    });
    btn_num4 = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_NUM4_STYLE,
      click_func: () => {
        handle_keypad(14);
      }
    });
    btn_pad7 = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_PAD7_STYLE,
      click_func: () => {
        handle_keypad(7);
      }
    });
    btn_pad8 = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_PAD8_STYLE,
      click_func: () => {
        handle_keypad(8);
      }
    });
    btn_pad9 = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_PAD9_STYLE,
      click_func: () => {
        handle_keypad(9);
      }
    });
    btn_pad4 = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_PAD4_STYLE,
      click_func: () => {
        handle_keypad(4);
      }
    });
    btn_pad5 = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_PAD5_STYLE,
      click_func: () => {
        handle_keypad(5);
      }
    });
    btn_pad6 = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_PAD6_STYLE,
      click_func: () => {
        handle_keypad(6);
      }
    });
    btn_pad1 = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_PAD1_STYLE,
      click_func: () => {
        handle_keypad(1);
      }
    });
    btn_pad2 = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_PAD2_STYLE,
      click_func: () => {
        handle_keypad(2);
      }
    });
    btn_pad3 = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_PAD3_STYLE,
      click_func: () => {
        handle_keypad(3);
      }
    });
    btn_clr = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_CLR_STYLE,
      click_func: () => {
        handle_keypad(20);
      }
    });
    btn_pad0 = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_PAD0_STYLE,
      click_func: () => {
        handle_keypad(0);
      }
    });
    btn_send = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_SEND_STYLE,
      click_func: () => {
        handle_keypad(21);
      }
    });
    btn_history = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_HISTORY_STYLE,
      click_func: () => {
      }
    });
    btn_newgame = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_NEWGAME_STYLE,
      click_func: () => {
      }
    });
    spacer = viewContainer.createWidget(widget.TEXT, {
      ...SPACER_STYLE
    });
  },
  onInit(p) {
    logger.debug("page onInit invoked");
    params = JSON.parse(p)
  },

  onDestroy() {
    logger.debug("page onDestroy invoked");
  },
});
