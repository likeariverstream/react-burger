export const GET_CONSTRUCTOR_ITEM = 'GET_CONSTRUCTOR_ITEM';
export const DELETE_CONSTRUCTOR_ITEM = 'DELETE_CONSTRUCTOR_ITEM';
export const GET_BUN_ITEM = 'GET_BUN_ITEM';
export const CLEAR_CONSTRUCTOR_LIST = 'CLEAR_CONSTRUCTOR_LIST';
export const MOVE_CONSTRUCTOR_ITEM = 'CONSTRUCTOR_ITEM';

export const getConstructorItem = (element) => ({
  type: GET_CONSTRUCTOR_ITEM,
  element
});

export const deleteConstructorItem = (element) => ({
  type: DELETE_CONSTRUCTOR_ITEM,
  element
});

export const getBunItem = (element) => ({
  type: GET_BUN_ITEM,
  element
});

export const clearConstructorList = () => ({
  type: CLEAR_CONSTRUCTOR_LIST
});

export const moveConstructorItem = (dragIndex, hoverIndex) => ({
  type: MOVE_CONSTRUCTOR_ITEM,
  dragIndex,
  hoverIndex
});