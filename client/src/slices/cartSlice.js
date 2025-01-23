import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getToken} from '../utils/tokenFunction';
import {axiosInstance} from '../utils/axios';

const initialState = {
  cartLoading: false,
  postCartLoading: false,
  cartItems: [],
};


export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (_, {rejectWithValue}) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.get(`/cart/get`, {
        params: {token},
      });
      return response.data;
    } catch (err) {
      const error = err.response?.data ||
        err.response || {message: 'Something went wrong'};
      return rejectWithValue(error);
    }
  },
);



export const addCartItem = createAsyncThunk(
  'cart/postCartItem',
  async (cartItemId, {rejectWithValue}) => {
    console.log('addCartItem', cartItemId);

    try {
      const token = await getToken();
      const response = await axiosInstance.post(`/cart/add`, cartItemId, {
        params: {token},
      });
      return response.data;
    } catch (err) {
      const error = err.response?.data ||
        err.response || {message: 'Something went wrong'};
      return rejectWithValue(error);
    }
  },
);



export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCart: (state, action) => {
      state.cartItems = action.payload.cartItems;
    },
  },
  extraReducers: builder => {
    builder

      .addCase(getCartItems.pending, state => {
        state.cartLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.cartItems = action.payload.cart;
        console.log(action.payload);
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.cartLoading = false;
        console.log(action.payload);
      })

      .addCase(addCartItem.pending, state => {
        state.postCartLoading = true;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.postCartLoading = false;
        state.cartItems = [...state.cartItems, action.payload.cart];
        console.log(action.payload);
        console.log(state.cartItems);
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.postCartLoading = false;
        console.log(action.payload);
      });
  },
});

export const {updateCart} = cartSlice.actions;
export const cartStates = state => state.cartReducer;
export default cartSlice.reducer;
