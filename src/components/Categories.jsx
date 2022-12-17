import React from "react";

const Categories = ({ value, onChangeCategory }) => {
	// const [activeIndex, setActiveIndex] = React.useState(0);

	const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

	return (
		<div className="categories">
			<ul>
				{categories.map((categoryName, index) => (
					<li
						className={value === index ? "active" : ""}
						onClick={() => onChangeCategory(index)}
						key={index}
					>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
