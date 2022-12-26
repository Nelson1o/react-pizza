import { RootState } from "./../store";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type PizzaItem = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
	rating: number;
};

export enum Status {
	LOADING = "loading",
	SUCCESS = "success",
	ERROR = "error",
}

interface PizzaSliceState {
	items: PizzaItem[];
	status: Status;
}

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
};

export type FetchPizzasArgs = {
	category: string;
	sortBy: string;
	order: string;
	search: string;
	currentPage: string;
};

export const fetchPizzas = createAsyncThunk(
	"pizza/fetchPizzasStatus",
	async (params: FetchPizzasArgs) => {
		const { category, sortBy, order, search, currentPage } = params;
		const res = await axios.get<PizzaItem[]>(
			`https://63999fad29930e2bb3d96b3f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		);
		return res.data as PizzaItem[];
	}
);

const pizzaSlice = createSlice({
	name: "pizza",
	initialState: initialState,
	reducers: {
		setItems: (state, action: PayloadAction<PizzaItem[]>) => {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state, action) => {
			state.status = Status.LOADING;
			state.items = [];
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchPizzas.rejected, (state, action) => {
			state.status = Status.ERROR;
			state.items = [];
		});
	},
});

export const selectPizzaData = (state: RootState) => {
	return state.pizza;
};

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
