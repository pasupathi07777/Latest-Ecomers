import { configureStore } from '@reduxjs/toolkit'
import  loginSlice  from '../slices/loginSlice'
import  signupSlice  from '../slices/signupSlice'
import  otpSlice  from '../slices/otpSlice'
import  productSlice  from '../slices/productsSlice'

 



export const store = configureStore({
  reducer: {
    loginReducer: loginSlice,
    signupReducer: signupSlice,
    otpReducer: otpSlice,
    productReducer:productSlice


  },
});