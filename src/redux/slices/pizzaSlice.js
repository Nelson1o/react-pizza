import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk("pizza/fetchPizzasStatus", async (params, thunkAPI) => {
	const { category, sortBy, order, search, currentPage } = params;
	const res = await axios.get(
		`https://63999fad29930e2bb3d96b3f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
	);
	// console.log(thunkAPI);
	return res.data;
});

const initialState = {
	items: [],
	status: "loading", // loading, success, error
};

const pizzaSlice = createSlice({
	name: "pizza",
	initialState: initialState,
	reducers: {
		setItems: (state, action) => {
			// state.items = action.payload;
		},
	},
	extraReducers: {
		[fetchPizzas.pending]: (state) => {
			state.status = "loading";
			state.items = [];
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.items = action.payload;
			state.status = "success";
		},
		[fetchPizzas.rejected]: (state) => {
			state.status = "error";
			state.items = [];
		},
	},
});

export const selectPizzaData = (state) => {
	return state.pizza;
};

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
