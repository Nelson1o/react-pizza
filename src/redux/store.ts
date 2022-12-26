import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import cartSlice from "./slices/cartSlice";
import filterReducer from "./slices/filterSlice";
import pizzaSlice from "./slices/pizzaSlice";

export const store = configureStore({
	reducer: {
		filter: filterReducer,
		cart: cartSlice,
		pizza: pizzaSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
