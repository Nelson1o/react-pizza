import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TCartItem = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	type: string;
	size: number;
	count: number;
};

interface CartSliceState {
	totalPrice: number;
	items: TCartItem[];
}

const initialState: CartSliceState = {
	totalPrice: 0,
	items: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		addItem: (state, action: PayloadAction<TCartItem>) => {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);

			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({ ...action.payload, count: 1 });
			}

			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price * obj.count + sum;
			}, 0);
		},
		minusItem: (state, action: PayloadAction<string>) => {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			if (findItem) {
				findItem.count--;
			}
		},
		removeItem: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((obj) => obj.id !== action.payload);
		},
		clearItems: (state) => {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const getCartSelector = (state: RootState) => {
	return state.cart;
};

export const selectCartItemById = (id: string) => {
	return (state: RootState) => {
		return state.cart.items.find((obj) => obj.id === id);
	};
};

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
