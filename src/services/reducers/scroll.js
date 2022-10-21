import { SCROLL_TO_ITEM, SELECT_TAB_ITEM } from '../actions/scroll';


const scrollState = {
  currentTab: '',

}

export const scrollReducer = (state = scrollState, action) => {
  switch (action.type) {
    case SCROLL_TO_ITEM: {
      return {

      }
    }
    case SELECT_TAB_ITEM: {
      return {
        currentTab: action.currentTab
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}