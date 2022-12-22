import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [pizza, setPizza] = useState();

	useEffect(() => {
		const fetchPizza = async () => {
			try {
				const res = await axios.get(
					`https://63999fad29930e2bb3d96b3f.mockapi.io/items/${id}`
				);
				setPizza(res.data);
			} catch (error) {
				alert("Ошибка");
				console.log(error);
				navigate("/");
			}
		};

		fetchPizza();
	}, []);

	if (!pizza) {
		return "Loading...";
	}

	return (
		<div className="container">
			<img src={pizza.imageUrl} alt="Pizza img" />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price} p</h4>
		</div>
	);
};

export default FullPizza;
