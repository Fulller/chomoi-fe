import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
    name: "common",
    initialState: {
        totalCartItem: 0,
        totalOrder: 0,
    },
    reducers: {
        increaseTotalItem: (state) => {
          state.totalCartItem++;
          console.log(state.totalCartItem);
        },
        descreaseTotalItem: (state) => {
          state.totalCartItem--;
          console.log(state.totalCartItem);
        },
        ZeroTotalItem: (state) => {
          state.totalCartItem=0;
          console.log(state.totalCartItem);
        },
        setTotalCartItem: (state, { payload }) => {
          state.totalCartItem = payload;
        },
        setTotalOrder: (state, { payload }) => {
            state.totalOrder = payload;
        }
    }
})

export default commonSlice;