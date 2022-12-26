import React from "react";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";

import { setSearchValue } from "../../redux/slices/filterSlice";
import styles from "./Search.module.scss";

const Search: React.FC = () => {
	const dispatch = useDispatch();

	const [value, setValue] = React.useState("");
	const inputRef = React.useRef<HTMLInputElement | null>(null);

	const updateSearchValue = React.useCallback(
		debounce((str: string) => {
			dispatch(setSearchValue(str));
		}, 500),
		[]
	);

	const onClickClear = () => {
		dispatch(setSearchValue(""));
		setValue("");
		inputRef.current?.focus();
	};

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		updateSearchValue(e.target.value);
	};

	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				fill="none"
				height="24"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				viewBox="0 0 24 24"
				width="24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="11" cy="11" r="8" />
				<line x1="21" x2="16.65" y1="21" y2="16.65" />
			</svg>
			<input
				type="text"
				className={styles.input}
				placeholder="Поиск пиццы..."
				value={value}
				onChange={onChangeInput}
				ref={inputRef}
			/>
			{value && (
				<svg
					className={styles.clearIcon}
					onClick={onClickClear}
					height="48"
					viewBox="0 0 48 48"
					width="48"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
					<path d="M0 0h48v48h-48z" fill="none" />
				</svg>
			)}
		</div>
	);
};

export default Search;
