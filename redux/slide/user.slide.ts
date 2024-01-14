import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  value: number
}

const initialState: UserState = {
  value: 1,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state: UserState) => {
      state.value += 1
    },
    decrement: (state: UserState) => {
      state.value -= 1
    },
    incrementByAmount: (state: UserState, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = userSlice.actions

export default userSlice.reducer