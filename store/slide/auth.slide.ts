import { IAuthSlide, IInfoAccount, IUSer } from "@/model/auth.model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IAuthSlide = {
  auth: false,
  user: null,
  infoAccout: null,
  favorite: 0,
};

export const authSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setAuth: (state: IAuthSlide, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
    },
    setUser: (state: IAuthSlide, acction: PayloadAction<IUSer | null>) => {
      state.user = acction.payload;
    },
    setInfo: (state: IAuthSlide, action: PayloadAction<IInfoAccount>) => {
      state.infoAccout = action.payload;
    },
    setFavorite: (state: IAuthSlide, action: PayloadAction<number>) => {
      state.favorite = action.payload;
    },
    setCheckChangeUser: (state: IAuthSlide, action: PayloadAction<number>) => {
      state.checkChangeUser = action.payload;
    },
    setChangeFavorite: (state: IAuthSlide, action: PayloadAction<number>) => {
      state.changeFavorite = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, setUser, setInfo, setFavorite, setCheckChangeUser, setChangeFavorite } =
  authSlice.actions;

export default authSlice.reducer;
