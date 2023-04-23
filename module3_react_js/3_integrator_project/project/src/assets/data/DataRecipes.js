import Recipe from "../../model/Recipe";

export default new (class DataRecipes {
	getData() {
		return [
			new Recipe(
				1,
				"Pollo asado al horno con papas y cebolla",
				"Esta elaboración es muy fácil de hacer y no requiere de mucho esfuerzo. ¡No te la podés perder!",
				require("../images/recipes/meat/chiken1.png"),
				"Facundo Melgar",
				false,
				"meat"
			),
			new Recipe(
				2,
				"Espaguetis a la carbonara",
				"Los espaguetis a la carbonara es probablemente la forma más internacional de preparar esta pasta.",
				require("../images/recipes/pasta/spaghetti.png"),
				"Juan Pérez",
				false,
				"pasta"
			),
			new Recipe(
				3,
				"Salmón a la plancha",
				"El salmon a la plancha es una manera muy fácil y sabrosa de preparar este delicioso pescado.",
				require("../images/recipes/meat/salmon.png"),
				"Gabriel Peralta",
				false,
				"meat"
			),
			new Recipe(
				4,
				"Pechuga de pollo de jamón y queso",
				"Las pechugas de pollo rellenas de jamon y queso, también conocidas como cordon bleu o San Jacobos, son algo más que las típicas pechugas rebozadas.",
				require("../images/recipes/meat/chiken2.png"),
				"Facundo Melgar",
				false,
				"meat"
			),
			new Recipe(
				5,
				"Hamburguesa casera",
				"La hamburguesa casera es probablemente la receta más popular del mundo.",
				require("../images/recipes/sandwich/hamburguer.png"),
				"Laura Méndez",
				false,
				"sandwich"
			),
			new Recipe(
				6,
				"Papas fritas crujientes a la francesa",
				"Una receta de origen francés y aparentemente sencilla, pero en realidad no es tan así.",
				require("../images/recipes/garnish/french-fries.png"),
				"Gabriela Torres",
				false,
				"garnish"
			),
			new Recipe(
				7,
				"Trufas de chocolate",
				"¿Quién se puede resistir a unas buenas trufas de chocolate?",
				require("../images/recipes/dessert/truffles.png"),
				"Juan Pérez",
				false,
				"dessert"
			),
			new Recipe(
				8,
				"Vasitos de cheesecake",
				"Muchas ocasiones, sin hacer planes, nos vemos en la situación de tener que improvisar una comida para nuestros amigos o nuestra familia. Esa es la indicada.",
				require("../images/recipes/dessert/cheesecake1.png"),
				"Rosario Quintana",
				false,
				"dessert"
			),
			new Recipe(
				9,
				"Tarta de queso sin horno fría",
				"La tarta de queso sin horno, es un clásico entre los clásicos.",
				require("../images/recipes/dessert/cheesecake2.png"),
				"Laura Méndez",
				false,
				"dessert"
			),
			new Recipe(
				10,
				"Sandwich de queso fundido doble",
				"Este sándwich de queso fundido es realmente fácil de hacer.",
				require("../images/recipes/sandwich/cheese-toasting.png"),
				"Gabriela Torres",
				false,
				"sandwich"
			),
			new Recipe(
				11,
				"Sorrentino con salsa rosa",
				"¡No te podés perder estos magníficos sorrentinos para mantenerte calentito!",
				require("../images/recipes/pasta/sorrentino.png"),
				"Facundo Melgar",
				false,
				"pasta"
			),
		];
	}
})();
