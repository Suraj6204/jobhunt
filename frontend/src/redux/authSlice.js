import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null,
        tempEmail: null,
    },
    reducers:{
        // actions
        setLoading:(state, action) => {
            state.loading = action.payload;
        },
        setUser:(state, action) => {
            state.user = action.payload;
        },
        setTempEmail:(state, action) => {
            state.tempEmail = action.payload;
        }
    }
});
export const {setLoading, setUser , setTempEmail} = authSlice.actions;
export default authSlice.reducer;