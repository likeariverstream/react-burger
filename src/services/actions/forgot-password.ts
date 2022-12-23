import { baseUrl } from "../../utils/constants";
import { request } from '../../utils/utils';
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPasswordSuccessThunk = createAsyncThunk(
  'password/recover', async (_, { rejectWithValue }) => {
    const url = `${baseUrl}/password-reset`;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: ''
      })
    }
    try {
      const response = await request(url, options)
      return response.success
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

