import {
  GET_CONSTRUCTOR_ITEM,
  DELETE_CONSTRUCTOR_ITEM,
  GET_BUN_ITEM, MOVE_CONSTRUCTOR_ITEM,
  CLEAR_CONSTRUCTOR_LIST,
} from '../actions/constructor';
import update from 'immutability-helper';
import { Tingredient } from '../../utils/types';

type TinitialState = {
  constructorList: Array<Tingredient>
}

type Tpayload = {
  dragIndex: number,
  hoverIndex: number
} & Tingredient

const initialState: TinitialState = {
  constructorList: []
}

export const constructorReducer = (state = initialState, action: { type: string, payload: Tpayload }): TinitialState => {
  switch (action.type) {
    case GET_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        constructorList: !state.constructorList.find(element => element.type === 'bun') || action.payload.type !== 'bun'
          ? [...state.constructorList, action.payload]
          : [...state.constructorList]
      }
    }
    case DELETE_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        constructorList: action.payload.type !== 'bun'
          ? state.constructorList.filter((element) => element.id !== action.payload.id)
          : [...state.constructorList]
      }
    }
    case GET_BUN_ITEM: {
      return {
        ...state,
        constructorList: action.payload.type === 'bun'
          ? [...state.constructorList.filter(element => element.type !== 'bun'), action.payload]
          : [...state.constructorList]
      }
    }
    case MOVE_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        constructorList: update(state.constructorList, {
          $splice: [
            [action.payload.dragIndex, 1],
            [action.payload.hoverIndex, 0, state.constructorList[action.payload.dragIndex]]
          ]
        } as {}
        )
      }
    }
    case CLEAR_CONSTRUCTOR_LIST: {
      return {
        ...state,
        constructorList: []
      }
    }
    default: {
      return state
    }
  }
}
