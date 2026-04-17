import { VIEW_CONTAINER_STYLE, TEXT_TITLE_STYLE, RECT_LINE_STYLE, TEXT_LINE_STYLE, SPACER_STYLE } from './index.style'
import { createWidget, widget } from '@zos/ui'
import { log as Logger } from '@zos/utils'
import { px } from '@zos/utils'

const logger = Logger.getLogger("zepp-1a2b-history");

let history_arr = [];

Page({
  build() {
    logger.debug('page build invoked');
    const viewContainer = createWidget(widget.VIEW_CONTAINER, {
        ...VIEW_CONTAINER_STYLE
    })
    text_title = viewContainer.createWidget(widget.TEXT, {
        ...TEXT_TITLE_STYLE,
    });
    // 使用迴圈產生歷史條目
    history_arr.forEach((item, index) => {
      viewContainer.createWidget(widget.FILL_RECT, {
        y: ( TEXT_TITLE_STYLE.y + TEXT_TITLE_STYLE.h + px(10) ) + (index * px(82)),
        ...RECT_LINE_STYLE,
      });
      viewContainer.createWidget(widget.TEXT, {
        y: ( TEXT_TITLE_STYLE.y + TEXT_TITLE_STYLE.h + px(10) ) + (index * px(82)),
        text: item,
        ...TEXT_LINE_STYLE,
      });
    })
    viewContainer.createWidget(widget.TEXT, {
      y: TEXT_TITLE_STYLE.y + TEXT_TITLE_STYLE.h + (history_arr.length * px(82)),
      ...SPACER_STYLE,
    });
  },
  onInit(p) {
    params = JSON.parse(p);
    logger.debug("page onInit invoked");
    history_arr = params.history;
    logger.debug(`History load = ${history_arr}`);
  },

  onDestroy() {
    logger.debug("page onDestroy invoked");
  },
});
