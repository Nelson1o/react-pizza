import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
import { setCategoryId } from "../redux/slices/filterSlice";

const Home = () => {
	const dispatch = useDispatch();
	const { categoryId, sort } = useSelector((state) => state.filter);
	const { searchValue } = React.useContext(SearchContext);

	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [currentPage, setCurrentPage] = React.useState(1);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	React.useEffect(() => {
		setIsLoading(true);

		const category = categoryId > 0 ? `category=${categoryId}` : "";
		const sortBy = sort.sortProperty.replace("-", "");
		const order = sort.sortProperty.includes("-") ? "asc" : "desc";
		const search = searchValue ? `&search=${searchValue}` : "";

		fetch(
			`https://63999fad29930e2bb3d96b3f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		)
			.then((res) => res.json())
			.then((res) => {
				setItems(res);
				setIsLoading(false);
			});
		// скролл экрана вверх
		window.scrollTo(0, 0);
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	/* const pizzas = items
		.filter((obj) => {
			if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
				return true;
			}
			return false;
		})
		.map((item) => <PizzaBlock key={item.id} {...item} />); */

	const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: /* items.map((item) => <PizzaBlock key={item.id} {...item} />) */ pizzas}
			</div>
			<Pagination onChangePage={(number) => setCurrentPage(number)} />
		</div>
	);
};

export default Home;
