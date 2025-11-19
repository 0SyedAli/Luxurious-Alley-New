// features/products/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

export const fetchProductsBySalon = createAsyncThunk(
    "products/fetchBySalon",
    async (salonId, { rejectWithValue }) => {
        try {
            if (!salonId) throw new Error("Authentication required");
            const response = await api.get(`/getAllProductsBySalonId?salonId=${salonId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch products");
        }
    }
);

// Add delete product async thunk
export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (productId, { rejectWithValue }) => {
        try {
            const response = await api.post(`/deleteProduct`, {
                id: productId
            });
            return response.data; // API response
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete product");
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState: {
        data: [],
        status: "idle",
        error: null,
        deleteStatus: "idle",
    },
    reducers: {
        clearDeleteStatus: (state) => {
            state.deleteStatus = "idle";
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch products cases
            .addCase(fetchProductsBySalon.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchProductsBySalon.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload || [];
            })
            .addCase(fetchProductsBySalon.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Delete product cases - FIXED: use _id instead of id
            .addCase(deleteProduct.pending, (state) => {
                state.deleteStatus = "loading";
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.deleteStatus = "succeeded";
                // FIX: Use _id to match your MongoDB data structure
                state.data = state.data.filter(product => product._id !== action.meta.arg);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.deleteStatus = "failed";
                state.error = action.payload;
            });
    },
});

export const { clearDeleteStatus } = productsSlice.actions;
export default productsSlice.reducer;