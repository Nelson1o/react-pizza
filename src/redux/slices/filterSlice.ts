import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum SortPropertyEnum {
	RATING_DESC = "rating",
	RATING_ASC = "-rating",
	TITLE_DESC = "title",
	TITLE_ASC = "-title",
	PRICE_DESC = "price",
	PRICE_ASC = "-price",
}

export type SortType = {
	name: string;
	sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
	searchValue: string;
	categoryId: number;
	sort: SortType;
	currentPage: number;
}

const initialState: FilterSliceState = {
	searchValue: "",
	categoryId: 0,
	sort: {
		name: "популярности",
		sortProperty: SortPropertyEnum.RATING_DESC,
	},
	currentPage: 1,
};

const filterSlice = createSlice({
	name: "filter",
	initialState: initialState,
	reducers: {
		setCategoryId: (state, action: PayloadAction<number>) => {
			state.categoryId = action.payload;
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		},
		setSort: (state, action: PayloadAction<SortType>) => {
			state.sort = action.payload;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setFilters: (state, action: PayloadAction<FilterSliceState>) => {
			if (Object.keys(action.payload).length) {
				state.categoryId = Number(action.payload.categoryId);
				state.currentPage = Number(action.payload.currentPage);
				state.sort = action.payload.sort;
			} else {
				state.categoryId = 0;
				state.currentPage = 1;
				state.sort = {
					name: "популярности",
					sortProperty: SortPropertyEnum.RATING_DESC,
				};
				state.searchValue = "";
			}
		},
	},
});

export const selectFilter = (state: RootState) => {
	return state.filter;
};

export const selectSort = (state: RootState) => {
	return state.filter.sort;
};

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
	filterSlice.actions;
export default filterSlice.reducer;
