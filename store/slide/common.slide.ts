import { ICommon } from '@/model/common.model'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: ICommon = {
    loading: false,
    popupChat: false,
    message: ''
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    startLoading: (state: ICommon) => {
      state.loading = true
    },
    stopLoading: (state: ICommon) => {
      state.loading = false
    },
    openChat: (state: ICommon) => {
      state.popupChat = true
    },
    closeChat: (state: ICommon) => {
      state.popupChat = false
    },
    setMessage: (state: ICommon, action: PayloadAction<string>) => {
      state.message = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { startLoading, stopLoading, openChat, closeChat, setMessage } = commonSlice.actions

export default commonSlice.reducer;