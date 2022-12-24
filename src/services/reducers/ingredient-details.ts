import { createSlice } from "@reduxjs/toolkit"
import { TIngredient } from "../../utils/types"

type TIinitialState = {
  ingredientDetails: TIngredient | {}
}

const ingredientDetailsSlice = createSlice({
  name: 'ingredient-details',
  initialState: {
    ingredientDetails: {}
  } as TIinitialState,
  reducers: {
    setIngredientDetails(state, action) {
      state.ingredientDetails = action.payload
    },
    deleteIngredientDetails(state) {
      state.ingredientDetails = {}
    }
  }
})

export const ingredientDetailsReducer = ingredientDetailsSlice.reducer;
export const {
  setIngredientDetails,
  deleteIngredientDetails
} = ingredientDetailsSlice.actions;

export const state = ingredientDetailsSlice.getInitialState()
