import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

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

        // Simpan token di localStorage setelah login berhasil
        localStorage.setItem("accessToken", response.data.accessToken);
        
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg || 'Something went wrong';
            return thunkAPI.rejectWithValue(message);
        } else {
            return thunkAPI.rejectWithValue('Network error');
        }
    }
});

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
    try {
        // Ambil token dari localStorage atau state management jika sudah disimpan
        const token = localStorage.getItem("accessToken");

        const response = await axios.get('http://localhost:5000/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg || 'Something went wrong';
            return thunkAPI.rejectWithValue(message);
        } else {
            return thunkAPI.rejectWithValue('Network error');
        }
    }
});

export const logOut= createAsyncThunk("user/logOut", async () => {
    await axios.delete('http://localhost:5000/logout');
    // Hapus token dari localStorage saat logout
    localStorage.removeItem("accessToken");
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