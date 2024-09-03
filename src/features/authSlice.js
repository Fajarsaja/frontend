import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const LoginUser = createAsyncThunk("user/loginUser", async (user, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:5000/login', {
            email: user.email,
            password: user.password
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg || 'Something went wrong';
            return thunkAPI.rejectWithValue(alert(message));
        } else {
            return thunkAPI.rejectWithValue('Network error');
        }
    }
});

export const getMe = createAsyncThunk("user/getMe", async (user, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:5000/me')
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg || 'Something went wrong';
            return thunkAPI.rejectWithValue(alert(message));
        } else {
            return thunkAPI.rejectWithValue('Network error');
        }
    }
});

export const logOut= createAsyncThunk("user/logOut", async (user, thunkAPI) => {
        await axios.delete('http://localhost:5000/logout')
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(LoginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(LoginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;  
                state.message = action.payload;
            });
            // get user login
        builder
            .addCase(getMe.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true; 
                state.message = action.payload;
            });
    }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;
