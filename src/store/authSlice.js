import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: null,
  isArabicLanguage: false,
  cartItems: [],
  favoriteItems: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      if (
        action.payload.isAuth === null ||
        action.payload.isAuth === undefined
      ) {
        state.isAuth = null;
      } else {
        state.isAuth = action.payload.isAuth;
      }
    },
    toggleLanguage: (state) => {
      state.isArabicLanguage = !state.isArabicLanguage;
    },
    
    setIsArabicLanguage: (state, action) => {
      if (
        action.payload.isArabicLanguage === null ||
        action.payload.isArabicLanguage === undefined
      ) {
        state.isArabicLanguage = false;
      } else {
        state.isArabicLanguage = action.payload.isArabicLanguage;
      }
    },
    setFavoriteItems: (state, action) => {
      if (
        action.payload.favoriteItems === null ||
        action.payload.favoriteItems === undefined
      ) {
        state.favoriteItems = [];
      } else {
        state.favoriteItems = action.payload.favoriteItems;
      }
    },
    setCartItems: (state, action) => {
      if (
        action.payload.cartItems === null ||
        action.payload.cartItems === undefined
      ) {
        state.cartItems = [];
      } else {
        state.cartItems = action.payload.cartItems;
      }
    },
  },
});

export const { setAuth, setIsArabicLanguage,toggleLanguage, setFavoriteItems, setCartItems } =
  authSlice.actions;

export default authSlice.reducer;
