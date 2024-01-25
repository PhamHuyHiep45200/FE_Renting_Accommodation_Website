import { IAuthSlide, IUSer } from '@/model/auth.model'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: IAuthSlide = {
    auth: false,
    user: null
}

export const authSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setAuth: (state: IAuthSlide, action: PayloadAction<boolean>) => {
        state.auth = action.payload
    },
    setUser: (state: IAuthSlide, acction: PayloadAction<IUSer>) => {
        state.user = acction.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAuth, setUser } = authSlice.actions

export default authSlice.reducer;