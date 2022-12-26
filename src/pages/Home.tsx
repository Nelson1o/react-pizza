import React from "react";
import qs from "qs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import { list } from "../components/Sort";
import {
	selectFilter,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";

const Home: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
	const { items, status } = useSelector(selectPizzaData);

	const onChangeCategory = (id: number) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = (number: number) => {
		dispatch(setCurrentPage(number));
	};

	const getPizzas = async () => {
		const category = categoryId > 0 ? `category=${categoryId}` : "";
		const sortBy = sort.sortProperty.replace("-", "");
		const order = sort.sortProperty.includes("-") ? "asc" : "desc";
		const search = searchValue ? `&search=${searchValue}` : "";

		dispatch(
			// @ts-ignore
			fetchPizzas({
				category,
				sortBy,
				order,
				search,
				currentPage,
			})
		);

		window.scrollTo(0, 0);
	};

	// Если изменили параметры и был первый рендер
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});

			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sort.sortProperty, currentPage]);

	// Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
			dispatch(
				setFilters({
					...params,
					sort,
				})
			);
			isSearch.current = true;
		}
	}, []);

	// Если был первый рендер, то запрашиваем делаем запрос на сервер
	React.useEffect(() => {
		getPizzas();
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	/* const pizzas = items
		.filter((obj) => {
			if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
				return true;
			}
			return false;
		})
		.map((item) => <PizzaBlock key={item.id} {...item} />); */

	const pizzas = items.map((item: any) => (
		<Link to={`/pizza/${item.id}`} key={item.id}>
			<PizzaBlock {...item} />
		</Link>
	));
	const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{status === "error" ? (
				<div className="content__error-info">
					<h2>Произошла ошибка 😕</h2>
					<p>К сожалению, не удалось получить пиццы :(</p>
				</div>
			) : (
				<div className="content__items">{status === "loading" ? skeletons : pizzas}</div>
			)}
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
};

export default Home;
