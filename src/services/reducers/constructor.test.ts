import { constructorReducer as reducer, initialState as state} from './constructor'
import {
  GET_CONSTRUCTOR_ITEM,
  DELETE_CONSTRUCTOR_ITEM,
  GET_BUN_ITEM,
  CLEAR_CONSTRUCTOR_LIST,
  MOVE_CONSTRUCTOR_ITEM
} from '../actions/constructor';
import {
  element,
  anotherElement,
  bun,
  anotherBun,
  dragIndex,
  hoverIndex
} from '../../utils/test-constants'

describe('constructor reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(state, { type: CLEAR_CONSTRUCTOR_LIST })).toEqual(state)
  })
  it('should handle CLEAR_CONSTRUCTOR_LIST', () => {
    expect(reducer(state, { type: CLEAR_CONSTRUCTOR_LIST })).toEqual(state)
  })
  it('should handle GET_CONSTRUCTOR_ITEM', () => {
    expect(reducer({ constructorList: [] }, { type: GET_CONSTRUCTOR_ITEM, payload: element })).toEqual({
      constructorList: [element]
    })
  })
  it('should handle GET_CONSTRUCTOR_ITEM and add second element', () => {
    expect(reducer({ constructorList: [element] }, { type: GET_CONSTRUCTOR_ITEM, payload: element })).toEqual({
      constructorList: [element, element]
    })
  })
  it('should handle GET_BUN_ITEM', () => {
    expect(reducer({ constructorList: [] }, { type: GET_BUN_ITEM, payload: bun })).toEqual({
      constructorList: [bun]
    })
  })
  it('should handle GET_BUN_ITEM and replace bun', () => {
    expect(reducer({ constructorList: [bun] }, { type: GET_BUN_ITEM, payload: anotherBun })).toEqual({
      constructorList: [anotherBun]
    })
  })
  it('should handle DELETE_CONSTRUCTOR_ITEM', () => {
    expect(reducer({ constructorList: [element] }, { type: DELETE_CONSTRUCTOR_ITEM, payload: element })).toEqual({
      constructorList: []
    })
  })
  it('should handle DELETE_CONSTRUCTOR_ITEM and delete bun', () => {
    expect(reducer({ constructorList: [bun] }, { type: DELETE_CONSTRUCTOR_ITEM, payload: bun })).toEqual({
      constructorList: [bun]
    })
  })
  it('should handle MOVE_CONSTRUCTOR_ITEM', () => {
    expect(reducer({ constructorList: [element, anotherElement, element] }, { type: MOVE_CONSTRUCTOR_ITEM, payload: {dragIndex, hoverIndex}})).toEqual({
      constructorList: [element, element, anotherElement]
    })
  })
  it('should handle MOVE_CONSTRUCTOR_ITEM and move bun', () => {
    expect(reducer({ constructorList: [bun, anotherElement, element] }, { type: MOVE_CONSTRUCTOR_ITEM, payload: {dragIndex, hoverIndex}})).toEqual({
      constructorList: [bun, element, anotherElement]
    })
  })
})
