import {GET_CONSTRUCTOR_ITEMS} from '../actions/constructor';

const constructorState = {
  constructorList: []
}

export const constructorReducer = (state = constructorState, action) => {
  switch (action.type) {
    case GET_CONSTRUCTOR_ITEMS: {
      return {
        ...state,
        constructorList: [...state.constructorList, action.element]
      }
    }
    default: {
      return state
    }
  }
}