import { ICommon } from '@/model/common.model'
import { createSlice } from '@reduxjs/toolkit'

const initialState: ICommon = {
    loading: false,
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
    }
  },
})

// Action creators are generated for each case reducer function
export const { startLoading, stopLoading } = commonSlice.actions

export default commonSlice.reducer;