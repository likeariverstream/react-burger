import { constructorReducer as reducer } from './constructor'
import {
  GET_CONSTRUCTOR_ITEM,
  DELETE_CONSTRUCTOR_ITEM,
  GET_BUN_ITEM,
  CLEAR_CONSTRUCTOR_LIST,
  MOVE_CONSTRUCTOR_ITEM
} from '../actions/constructor';

const initialState = {
  constructorList: []
}

const element = {
  "_id": "60d3b41abdacab0026a733cd",
  "name": "Соус фирменный Space Sauce",
  "type": "sauce",
  "proteins": 50,
  "fat": 22,
  "carbohydrates": 11,
  "calories": 14,
  "price": 80,
  "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
  "__v": 0,
  "id": "nBqri7WF7nNN28RQry5fC"
}

const anotherElement = {
  "_id": "60d3b41abdacab0026a733cc",
  "name": "Соус Spicy-X",
  "type": "sauce",
  "proteins": 30,
  "fat": 20,
  "carbohydrates": 40,
  "calories": 30,
  "price": 90,
  "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
  "__v": 0,
  "id": "oTDx7WEykfIsfTU-ieMH0"
}

const bun = {
  "_id": "60d3b41abdacab0026a733c7",
  "name": "Флюоресцентная булка R2-D3",
  "type": "bun",
  "proteins": 44,
  "fat": 26,
  "carbohydrates": 85,
  "calories": 643,
  "price": 988,
  "image": "https://code.s3.yandex.net/react/code/bun-01.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
  "__v": 0,
  "id": "DIdhEjVnleEa4X9M2Prz4"
}

const anotherBun = {
  "_id": "60d3b41abdacab0026a733c6",
  "name": "Краторная булка N-200i",
  "type": "bun",
  "proteins": 80,
  "fat": 24,
  "carbohydrates": 53,
  "calories": 420,
  "price": 1255,
  "image": "https://code.s3.yandex.net/react/code/bun-02.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
  "__v": 0,
  "id": "YS1UuhYSdeJtYDrFptt2j"
}

const dragIndex = 1;
const hoverIndex  = 3;

describe('constructor reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: CLEAR_CONSTRUCTOR_LIST })).toEqual(initialState)
  })
  it('should handle CLEAR_CONSTRUCTOR_LIST', () => {
    expect(reducer(initialState, { type: CLEAR_CONSTRUCTOR_LIST })).toEqual({
      constructorList: []
    })
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
