import { createWidget, widget, prop } from '@zos/ui'
import { log as Logger } from '@zos/utils'
import { BTN_EASY_STYLE, BTN_MEDIUM_STYLE, BTN_HARD_STYLE, TEXT_EASY_STYLE, TEXT_MEDIUM_STYLE,
  TEXT_HARD_STYLE, VIEW_CONTAINER_STYLE, SPACER_STYLE,
  TEXT_LOAD_STYLE, BTN_LOAD_STYLE } from './index.style'
import { showToast } from '@zos/interaction'
import { push } from '@zos/router'
import { localStorage } from '@zos/storage'
import { getText } from '@zos/i18n'


const logger = Logger.getLogger("zepp-1a2b-home");

Page({
  build() {
    logger.debug('page build invoked')
    const viewContainer = createWidget(widget.VIEW_CONTAINER, {
      ...VIEW_CONTAINER_STYLE
    })
    btn_load = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_LOAD_STYLE,
      click_func: () => {
        current_diffcult = localStorage.getItem("gamemode")
        if (current_diffcult === undefined){
          showToast({
            content: getText("nosaveHint"),
          })
        }
        else {
          push({
            url: 'page/gts/game/index.page',
            params: {
              diffcult: 0
            }
          })
        }
      }
    });
    text_load = viewContainer.createWidget(widget.TEXT, {
      ...TEXT_LOAD_STYLE,
    });
    btn_easy = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_EASY_STYLE,
      click_func: () => {
        push({
          url: 'page/gts/game/index.page',
          params: {
            diffcult: 1
          }
        })
      }
    });
    text_easy = viewContainer.createWidget(widget.TEXT, {
      ...TEXT_EASY_STYLE,
    });
    btn_medium = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_MEDIUM_STYLE,
      click_func: () => {
        push({
          url: 'page/gts/game/index.page',
          params: {
            diffcult: 2
          }
        })
      }
    });
    text_medium = viewContainer.createWidget(widget.TEXT, {
      ...TEXT_MEDIUM_STYLE,
    });
    btn_hard = viewContainer.createWidget(widget.BUTTON, {
      ...BTN_HARD_STYLE,
      click_func: () => {
        push({
          url: 'page/gts/game/index.page',
          params: {
            diffcult: 3
          }
        })
      }
    });
    text_hard = viewContainer.createWidget(widget.TEXT, {
      ...TEXT_HARD_STYLE,
    });
    spacer = viewContainer.createWidget(widget.TEXT, {
      ...SPACER_STYLE
    });
  },
  onInit() {
    logger.debug("page onInit invoked");
  },

  onDestroy() {
    logger.debug("page onDestroy invoked");
  },
});
