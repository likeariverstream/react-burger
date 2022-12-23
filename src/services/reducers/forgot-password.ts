import { getPasswordSuccessThunk } from "../actions/forgot-password";
import { createSlice } from "@reduxjs/toolkit";


const recoverPasswordSlice = createSlice({
  name: 'recover-password',
  initialState: {
    success: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPasswordSuccessThunk.fulfilled, (state) => {
      state.success = true
    })
    builder.addCase(getPasswordSuccessThunk.rejected, (state) => {
      state.success = false
    })
  }
})

export const recoverPasswordReducer = recoverPasswordSlice.reducer;
export const state = recoverPasswordSlice;
