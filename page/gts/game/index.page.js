import { createWidget, widget, prop } from '@zos/ui'
import { log as Logger } from '@zos/utils'
import { VIEW_CONTAINER_STYLE, BTN_NUM1_STYLE, BTN_NUM2_STYLE, BTN_NUM3_STYLE, BTN_NUM4_STYLE, 
  BTN_PAD7_STYLE, BTN_PAD8_STYLE, BTN_PAD9_STYLE, BTN_PAD4_STYLE, BTN_PAD5_STYLE, BTN_PAD6_STYLE,
  BTN_PAD1_STYLE, BTN_PAD2_STYLE, BTN_PAD3_STYLE, BTN_CLR_STYLE, BTN_PAD0_STYLE, BTN_SEND_STYLE,
  BTN_HISTORY_STYLE, SPACER_STYLE } from './index.style'
import { localStorage } from '@zos/storage'
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
let btn_history;

current_index = 0;
max_num = 9;
guess_arr = [20, 20, 20, 20];
ans_number = [20, 20, 20, 20];

// difficult
gamemode = 0;

const vibrator = new Vibrator()

function handle_keypad(key_id) {
  input_btns = [btn_num1, btn_num2, btn_num3, btn_num4];
  i_btn_styles = [BTN_NUM1_STYLE, BTN_NUM2_STYLE, BTN_NUM3_STYLE, BTN_NUM4_STYLE];
  logger.log(`handle key ${key_id}, index ${current_index}`);
  // 處理數字鍵 (0-9)
  if (key_id >= 0 && key_id <= max_num) {
    // 1. 更新當前按鈕的文字，取消高亮
    input_btns[current_index].setProperty(prop.MORE, {
      x: i_btn_styles[current_index].x,
      y: i_btn_styles[current_index].y,
      w: i_btn_styles[current_index].w,
      h: i_btn_styles[current_index].h,
      text: key_id.toString(),
      normal_color: 0x202020,
      press_color: 0x808080,
    });
    guess_arr[current_index] = key_id;
    // Vibrate short
    vibrator.setMode(VIBRATOR_SCENE_SHORT_MIDDLE);
    vibrator.start();

    // 3. 驗證按下的數字合法性，上一個重複的數字會被刪除
    for (var i = 0; i < guess_arr.length; i++) {
      // 邏輯：如果該位置的數字等於現在按下的 key_id，且位置不是剛剛填入的位置
      if (i !== current_index && guess_arr[i] === key_id) {
        logger.log(`Duplicate found at index ${i}, resetting to "-"`);
        
        // 將該重複位置的 guess_arr 改為 20
        guess_arr[i] = 20;

        // 更新該重複位置按鈕的文字與樣式 (維持非高亮狀態)
        input_btns[i].setProperty(prop.MORE, {
          x: i_btn_styles[i].x,
          y: i_btn_styles[i].y,
          w: i_btn_styles[i].w,
          h: i_btn_styles[i].h,
          text: "-",
        });
      }
    }

    // 4. 移動到下一個索引，若超過 3 則回到 0
    current_index = (current_index + 1) % 4;
    
    // 5. 設定下一個按鈕為高亮
    input_btns[current_index].setProperty(prop.MORE, {
      x: i_btn_styles[current_index].x,
      y: i_btn_styles[current_index].y,
      w: i_btn_styles[current_index].w,
      h: i_btn_styles[current_index].h,
      normal_color: 0x404040,
      press_color: 0x808080,
    });
  }  
  else if (key_id >= 10 && key_id < 20) {
    // 移動到按壓的索引
    current_index = key_id - 10;

    for (var i = 0; i < input_btns.length; i++) {
      // 取消所有高亮
      input_btns[i].setProperty(prop.MORE, {
        x: i_btn_styles[i].x,
        y: i_btn_styles[i].y,
        w: i_btn_styles[i].w,
        h: i_btn_styles[i].h,
        normal_color: 0x202020,
        press_color: 0x808080,
      });
    }

    // 將按壓的索引高亮
    input_btns[current_index].setProperty(prop.MORE, {
      x: i_btn_styles[current_index].x,
      y: i_btn_styles[current_index].y,
      w: i_btn_styles[current_index].w,
      h: i_btn_styles[current_index].h,
      normal_color: 0x404040,
      press_color: 0x808080,
    });

    // Vibrate short
    vibrator.setMode(VIBRATOR_SCENE_SHORT_MIDDLE);
    vibrator.start();
  }
  // 處理清除鍵 (20)
  else if (key_id === 20) {
    for (var i = 0; i < input_btns.length; i++) {
      // 將文字重設為 "-" 並取消所有高亮
      input_btns[i].setProperty(prop.MORE, {
        x: i_btn_styles[i].x,
        y: i_btn_styles[i].y,
        w: i_btn_styles[i].w,
        h: i_btn_styles[i].h,
        text: "-",
        normal_color: 0x202020,
        press_color: 0x808080,
      });
      guess_arr[i] = key_id;
    }
    // 回到第一個數字並設定高亮
    current_index = 0;
    input_btns[current_index].setProperty(prop.MORE, {
      x: i_btn_styles[current_index].x,
      y: i_btn_styles[current_index].y,
      w: i_btn_styles[current_index].w,
      h: i_btn_styles[current_index].h,
      normal_color: 0x404040,
      press_color: 0x808080,
    });

    // Vibrate strong
    vibrator.setMode(VIBRATOR_SCENE_SHORT_STRONG);
    vibrator.start();
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
        handle_keypad(10);
      }
    });
    btn_num2 = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_NUM2_STYLE,
      click_func: () => {
        handle_keypad(11);
      }
    });
    btn_num3 = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_NUM3_STYLE,
      click_func: () => {
        handle_keypad(12);
      }
    });
    btn_num4 = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_NUM4_STYLE,
      click_func: () => {
        handle_keypad(13);
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
    spacer = viewContainer.createWidget(widget.TEXT, {
      ...SPACER_STYLE
    });
  },
  onInit(p) {
    logger.debug("page onInit invoked");
    params = JSON.parse(p);
    // 難度值準備
    if(params.diffcult > 0){
      gamemode = params.diffcult;
      // 清除資料
      localStorage.clear();
      // 儲存難度值
      localStorage.setItem("gamemode", params.diffcult);
      // 難度為簡單時限制最大數字
      if(gamemode === 1) {max_num = 5};
      // 1. 建立一個包含 0 到 max_num 的候選池
      // 例如 max_num 為 5，候選池就是 [0, 1, 2, 3, 4, 5]
      let candidates = [];
      for (let i = 0; i <= max_num; i++) {
          candidates.push(i);
      }
      // 2. 從候選池中隨機抽取數字填充到 ans_number
      for (let i = 0; i < ans_number.length; i++) {
          // 隨機產生一個候選池的索引值
          const randomIndex = Math.floor(Math.random() * candidates.length);
          // 將該位置的數字取出並存入 ans_number，同時從候選池中移除（避免重複）
          ans_number[i] = candidates.splice(randomIndex, 1)[0];
      }
      // 儲存答案
      localStorage.setItem("ans_number", ans_number);
      logger.log(`Generated answer = ${ans_number}`)
      logger.log(`Current gamemode = ${gamemode}`)
    }
    else {
      // 讀取難度值
      gamemode = localStorage.getItem("gamemode")
      // 讀取答案
      ans_number = localStorage.getItem("ans_number")
      // 難度為簡單時限制最大數字
      if(gamemode === 1) {max_num = 5};
      logger.log(`Loaded answer = ${ans_number}`)
      logger.log(`Loaded gamemode = ${gamemode}`)
    }    
  },

  onDestroy() {
    logger.debug("page onDestroy invoked");
  },
});
