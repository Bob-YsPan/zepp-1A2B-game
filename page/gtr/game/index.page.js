import { createWidget, widget, prop } from '@zos/ui'
import { log as Logger } from '@zos/utils'
import { VIEW_CONTAINER_STYLE, TEXT_TITLE_STYLE, TEXT_MAIN_STYLE, TEXT_THIRD_STYLE, TEXT_FORTH_STYLE, SPACER_STYLE } from './index.style'
import { onKey, KEY_HOME, KEY_EVENT_PRESS, KEY_EVENT_RELEASE } from '@zos/interaction'
import { back } from '@zos/router'
import { Vibrator, VIBRATOR_SCENE_SHORT_MIDDLE, VIBRATOR_SCENE_SHORT_STRONG } from '@zos/sensor'
import { px } from '@zos/utils'
import { getText } from '@zos/i18n'

const logger = Logger.getLogger("zepp-1a2b-game");
text_title = null;
text_main = null;
text_third = null;
guess_time = null;
stopwatch_starts = false;
start_ts = null;
text_forth = null;
params = null;
const vibrator = new Vibrator()

onKey({
  callback: (key, keyEvent) => {
    if (key === KEY_HOME && keyEvent === KEY_EVENT_PRESS) {
      console.log("Key Event Press!"); 
      if(stopwatch_starts) {
        const stop_ts = Date.now();
        console.log('Stopwatch Stop!');
        const p_time = ((stop_ts - start_ts) / 1000).toFixed(2);
        text_title.setProperty(prop.MORE, { text: getText("stopWatchTitle") });
        text_main.setProperty(prop.MORE, { text: `${p_time}s` });
        const time_diff = (Number(p_time) - guess_time).toFixed(2)
        abs_diff = Math.abs(Number(time_diff))
        if(abs_diff <= 0.1) {
          text_third.setProperty(prop.MORE, { h: px(42), color: 0x00ffff });
        } else if(abs_diff <= 0.5) {
          text_third.setProperty(prop.MORE, { h: px(42), color: 0x00ff00 });
        } else {
          text_third.setProperty(prop.MORE, { h: px(42), color: 0xff0000 });
        }
        if(Number(time_diff > 0)) {
          text_third.setProperty(prop.MORE, { text: `+${time_diff}s` });
        } else {
          text_third.setProperty(prop.MORE, { text: `${time_diff}s` });
        }
        text_forth.setProperty(prop.MORE, { y: TEXT_THIRD_STYLE.y + px(42) + px(5), text: getText("newgameHint")});
        vibrator.setMode(VIBRATOR_SCENE_SHORT_STRONG)
        vibrator.start();
      }
    } else if (key === KEY_HOME && keyEvent === KEY_EVENT_RELEASE) {
      console.log("Key Event Release!"); 
      if (stopwatch_starts){
        stopwatch_starts = false;
      } else {
        back();
      }
    }
    return true
  },
})

Page({
  build() {
    logger.debug('page build invoked')
    const viewContainer = createWidget(widget.VIEW_CONTAINER, {
      ...VIEW_CONTAINER_STYLE
    })
    text_title = viewContainer.createWidget(widget.TEXT, {
      ...TEXT_TITLE_STYLE,
    });
    text_main = viewContainer.createWidget(widget.TEXT, {
      ...TEXT_MAIN_STYLE,
    });
    text_third = viewContainer.createWidget(widget.TEXT, {
      ...TEXT_THIRD_STYLE,
    });
    text_forth = viewContainer.createWidget(widget.TEXT, {
      ...TEXT_FORTH_STYLE,
    });
    spacer = viewContainer.createWidget(widget.TEXT, {
      ...SPACER_STYLE
    })
  const { diffcult } = params;

  // 1. 統一初始化變數 (單位統一為 ms)
  switch (diffcult) {
    case 1:
      countdown_t = 3000;
      guess_time = Math.floor(Math.random() * 10) + 1;
      break;
    case 2:
      countdown_t = (Math.floor(Math.random() * 5) + 1) * 1000;
      guess_time = Math.floor(Math.random() * 21) + 10;
      break;
    default: // 難度 3 或其他
      countdown_t = Math.floor(Math.random() * 4001) + 1000;
      do {
        guess_time = Number(((Math.floor(Math.random() * 201) + 100) / 10).toFixed(1));
      } while (guess_time % 1 === 0); // 確保是小數
      break;
  }
  // 2. 共通 UI 更新
  text_title.setProperty(prop.MORE, { text: getText("gameTitle") });
  text_main.setProperty(prop.MORE, { text: `${guess_time}s` });

  // 3. 處理倒數顯示邏輯
  if (diffcult === 1) {
    const seconds = countdown_t / 1000;
    // 設置初始顯示
    text_third.setProperty(prop.MORE, { 
      text: `${getText("countdownBefore")}${seconds}s${getText("countdownAfter")}!` 
    });

    // 建立每一秒的計時器
    for (let i = seconds; i >= 1; i--) {
      const delay = (seconds - i) * 1000;
      setTimeout(() => {
        text_third.setProperty(prop.MORE, {
          text: `${getText("countdownBefore")}${i}s${getText("countdownAfter")}!`
        });
        vibrator.setMode(VIBRATOR_SCENE_SHORT_MIDDLE);
        vibrator.start();
      }, delay);
    }
  } else {
    // 難度 2 與 3 隱藏倒數
    text_third.setProperty(prop.MORE, { text: getText("countdownHide") });
    if (diffcult === 2) {
      const seconds = countdown_t / 1000;
    for (let i = seconds; i >= 1; i--) {
      const delay = (seconds - i) * 1000;
      setTimeout(() => {
        vibrator.setMode(VIBRATOR_SCENE_SHORT_MIDDLE);
        vibrator.start();
      }, delay);
      }
    }
  }
  // 4. 遊戲正式開始的定時任務
  setTimeout(() => {
    text_third.setProperty(prop.MORE, { text: getText("stopgameHint") });
    start_ts = Date.now();
    stopwatch_starts = true;
    console.log(start_ts);
    
    vibrator.setMode(VIBRATOR_SCENE_SHORT_STRONG);
    vibrator.start();
  }, countdown_t);
  },
  onInit(p) {
    logger.debug("page onInit invoked");
    params = JSON.parse(p)
  },

  onDestroy() {
    logger.debug("page onDestroy invoked");
  },
});
