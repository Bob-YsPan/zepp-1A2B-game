import { createWidget, widget, prop } from '@zos/ui'
import { log as Logger } from '@zos/utils'
import { VIEW_CONTAINER_STYLE, BTN_NUM1_STYLE, BTN_NUM2_STYLE, BTN_NUM3_STYLE, BTN_NUM4_STYLE, 
  BTN_PAD7_STYLE, BTN_PAD8_STYLE, BTN_PAD9_STYLE, BTN_PAD4_STYLE, BTN_PAD5_STYLE, BTN_PAD6_STYLE,
  BTN_PAD1_STYLE, BTN_PAD2_STYLE, BTN_PAD3_STYLE, BTN_CLR_STYLE, BTN_PAD0_STYLE, BTN_SEND_STYLE,
  BTN_HISTORY_STYLE, SPACER_STYLE } from './index.style'
import { localStorage } from '@zos/storage'
import { showToast } from '@zos/interaction'
import { Vibrator, VIBRATOR_SCENE_SHORT_MIDDLE, VIBRATOR_SCENE_SHORT_STRONG } from '@zos/sensor'
import { push } from '@zos/router'
import { getText } from '@zos/i18n'

const logger = Logger.getLogger("zepp-1a2b-game");

params = null;
let btn_num1, btn_num2, btn_num3, btn_num4;
let btn_pad7, btn_pad8, btn_pad9;
let btn_pad4, btn_pad5, btn_pad6;
let btn_clr, btn_pad0, btn_send;
let btn_history;
let a, b;
let from_history;

let current_index = 0;
let max_num = 9;
let guess_arr = [20, 20, 20, 20];
let ans_number = [20, 20, 20, 20];
let key_disabled = false;
let tries = 0;
let history_arr = [];

// difficult
let gamemode = 0;

const vibrator = new Vibrator()

// 鍵盤處理函式
function handle_keypad(key_id) {
  // 使用 key_disabled 凍結按鍵
  if(!key_disabled) {
    input_btns = [btn_num1, btn_num2, btn_num3, btn_num4];
    i_btn_styles = [BTN_NUM1_STYLE, BTN_NUM2_STYLE, BTN_NUM3_STYLE, BTN_NUM4_STYLE];
    logger.debug(`handle key ${key_id}, index ${current_index}`);
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
          logger.debug(`Duplicate found at index ${i}, resetting to "-"`);
          
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
      // Vibrate strong
      vibrator.setMode(VIBRATOR_SCENE_SHORT_STRONG);
      vibrator.start();
      // 空欄位檢查
      invaild = false;
      for (let i = 0; i < guess_arr.length; i++) {
        if (guess_arr[i] === 20) {
          showToast({
            content: getText("checkHint"),
          })
          invaild = true;
          break;
        }
      }
      if(!invaild) {
        guess_check();
      }
    }
  }
}

// 檢查邏輯
function guess_check() {
  logger.debug("Data sent!");
  // 凍結按鈕
  key_disabled = true;
  // 重設 a 和 b
  a = 0;
  b = 0;
  // 為了不影響原始陣列，我們先複製一份出來
  // 這樣在判斷 B 的時候，可以標記已經比對過的數字
  let ansCopy = [...ans_number];
  let guessCopy = [...guess_arr];

  // --- 第一輪：先找 A (位置相同) ---
  for (let i = 0; i < ansCopy.length; i++) {
      if (guessCopy[i] === ansCopy[i]) {
          a++;
          // 標記這兩個位置已經處理過，避免第二輪重複計算 B
          ansCopy[i] = null;
          guessCopy[i] = null;
      }
  }

  // --- 第二輪：再找 B (數字存在但位置不同) ---
  for (let i = 0; i < guessCopy.length; i++) {
      // 跳過第一輪已經變成 null 的位置
      if (guessCopy[i] !== null) {
          // 檢查剩下的數字是否出現在 ansCopy 的其他地方
          let indexInAns = ansCopy.indexOf(guessCopy[i]);
          
          if (indexInAns !== -1) {
              b++;
              // 標記該數字已用過，避免重複計算
              ansCopy[indexInAns] = null;
          }
      }
  }
  logger.debug(`Check result: ${a} A, ${b} B`);
  input_btns = [btn_num1, btn_num2, btn_num3, btn_num4];
  i_btn_styles = [BTN_NUM1_STYLE, BTN_NUM2_STYLE, BTN_NUM3_STYLE, BTN_NUM4_STYLE];
  if (gamemode === 3) {tries++;};
  for (var i = 0; i < input_btns.length; i++) {
    if (a === 4) {
      // 將按鈕背景修改成全部綠色
      input_btns[i].setProperty(prop.MORE, {
        x: i_btn_styles[i].x,
        y: i_btn_styles[i].y,
        w: i_btn_styles[i].w,
        h: i_btn_styles[i].h,
        normal_color: 0x93bf72,
        press_color: 0xd8f7c1,
      });
    }
    else if (tries >= 10) {
      // 將按鈕背景修改成全部紅色
      input_btns[i].setProperty(prop.MORE, {
        x: i_btn_styles[i].x,
        y: i_btn_styles[i].y,
        w: i_btn_styles[i].w,
        h: i_btn_styles[i].h,
        normal_color: 0xff8080,
        press_color: 0xffb0b0,
      });
    }
    else {
      // 將按鈕背景修改成全部灰色
      input_btns[i].setProperty(prop.MORE, {
        x: i_btn_styles[i].x,
        y: i_btn_styles[i].y,
        w: i_btn_styles[i].w,
        h: i_btn_styles[i].h,
        normal_color: 0x202020,
        press_color: 0x808080,
      });
    }
  }
  // 記錄歷史紀錄
  history_arr.push(`${guess_arr[0]}${guess_arr[1]}${guess_arr[2]}${guess_arr[3]} - ${a}A${b}B`)
  // 顯示猜測狀態
  if (a === 4){
    showToast({
      content: getText("guessedHint"),
    })
  }
  else if (tries >= 10) {
    showToast({
      content: `${getText("failHint")} ${ans_number[0]}${ans_number[1]}${ans_number[2]}${ans_number[3]}`,
    })
  }
  else {
    msg = `${a}A${b}B`
    if (gamemode === 3) {
      msg += `\n${getText("remainHint")} ${10 - tries}`
    }
    showToast({
      content: msg,
    })
  }
  // 幾秒後由狀態決定下一步要怎麼處理
  setTimeout(() => {
    // 還可以再猜測
    if (a !== 4 && tries < 10) {
      for (var i = 0; i < input_btns.length; i++) {
        // 將按鈕背景修改成全部灰色，數值重置
        input_btns[i].setProperty(prop.MORE, {
          x: i_btn_styles[i].x,
          y: i_btn_styles[i].y,
          w: i_btn_styles[i].w,
          h: i_btn_styles[i].h,
          normal_color: 0x202020,
          press_color: 0x808080,
          text: "-"
        });
        guess_arr[i] = 20;
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
      key_disabled = false;
    }
    // 無法再猜測提示使用者回首頁
    else {
      showToast({
        content: getText("newgameHint"),
      })
    }
  }, 2000);
}

Page({
  build() {
    logger.debug('page build invoked')
    // 建構UI
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
        // 歷史按鈕按下時，儲存一個變數到永久儲存
        // 返回時透過這個變數確定是不是從歷史頁面返回
        from_history = true;
        localStorage.setItem("from_history", from_history);
        push({
          url: 'page/gts/history/index.page',
          params: {
            history: history_arr,
          }
        })
      }
    });
    spacer = viewContainer.createWidget(widget.TEXT, {
      ...SPACER_STYLE
    });
    // 讀出的狀態已經不能輸入了，凍結按鈕跟提示使用者
    if (a === 4 || tries >= 10) {
      key_disabled = true;
      input_btns = [btn_num1, btn_num2, btn_num3, btn_num4];
      i_btn_styles = [BTN_NUM1_STYLE, BTN_NUM2_STYLE, BTN_NUM3_STYLE, BTN_NUM4_STYLE];
      for (var i = 0; i < input_btns.length; i++) {
        // 將按鈕背景修改成全部灰色，數值重置
        input_btns[i].setProperty(prop.MORE, {
          x: i_btn_styles[i].x,
          y: i_btn_styles[i].y,
          w: i_btn_styles[i].w,
          h: i_btn_styles[i].h,
          normal_color: 0x202020,
          press_color: 0x808080,
          text: "-"
        });
        guess_arr[i] = 20;
      }
      showToast({
        content: getText("newgameHint"),
      });
    };
  },
  onInit(p) {
    logger.debug("page onInit invoked");
    params = JSON.parse(p);
    // 取得是不是從歷史頁面回來的狀態
    from_history = localStorage.getItem("from_history");
    logger.debug(`got from_history = ${from_history}`);
    if(from_history) {
      // 是從歷史頁面回來
      // 強制把從首頁過來的狀態改為讀檔的狀態
      params.diffcult = 0;
      // 放下 Flag
      from_history = false;
      localStorage.setItem("from_history", from_history);
    }
    // 難度值狀態分類
    // 大於 0 >> 新遊戲
    if(params.diffcult > 0){
      gamemode = params.diffcult;
      // 清除資料
      localStorage.clear();
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
      logger.debug(`Generated answer = ${ans_number}`)
      logger.debug(`Current gamemode = ${gamemode}`)
    }
    // 為 0 >> 讀檔模式
    else {
      // 讀取難度值
      gamemode = localStorage.getItem("gamemode")
      // 讀取答案
      ans_number = localStorage.getItem("ans_number")
      // 讀取嘗試次數
      tries = localStorage.getItem("tries")
      // 讀取歷史紀錄
      history_arr = localStorage.getItem("history_arr")
      // 讀取 a 值
      a = localStorage.getItem("last_a");
      // 難度為簡單時限制最大數字
      if(gamemode === 1) {max_num = 5};
      logger.debug(`Loaded answer = ${ans_number}`)
      logger.debug(`Loaded gamemode = ${gamemode}`)
      logger.debug(`Loaded history = ${history_arr}`)
      logger.debug(`Loaded tries = ${tries}`)
      logger.debug(`Loaded a = ${a}`)
    }
  },
  onDestroy() {
    logger.debug("page onDestroy invoked");
    if((a === 4 || tries >= 10) && !from_history) {
      // 如果為不可再猜測了，且不是前往歷史頁面，離開時清除資料
      logger.debug("Erasing the data...");
      localStorage.clear();
    } else {
      // 儲存難度值
      localStorage.setItem("gamemode", gamemode);
      // 儲存答案
      localStorage.setItem("ans_number", ans_number);
      // 儲存嘗試次數
      localStorage.setItem("tries", tries);
      // 儲存 a 值
      localStorage.setItem("last_a", a);
      // 儲存歷史紀錄
      localStorage.setItem("history_arr", history_arr);
    }
  },
});
