import Product from "../../../model/Product.js"

export default new (class Data {
	getData() {
		return [
			// Consolas
			new Product(1, "PlayStation 3", "Sony PlayStation 3 Slim 120GB Standard color charcoal black", "59.584", "./assets/products/play-station-3.png", "console", true, "65.755"),
			new Product(2, "Xbox Series S", "Microsoft Xbox Series S 512GB Standard color blanco", "129.999", "./assets/products/xbox-series-s.png", "console", true, "139.999"),
			new Product(3, "Nintendo Wii", "Nintendo Wii 512MB Standard color blanco", "30.087", "./assets/products/nintendo-wii.png", "console", false),
			new Product(4, "PlayStation 4", "Sony PlayStation 4 500GB Standard color negro azabache", "135.000", "./assets/products/play-station-4.png", "console", false),

			// new Product(5, "Leo Messi", "¡De pié señores!", 350, "./assets/img/pizza/leomessi.png", "Pizza", false, false, 1),
			// new Product(6, "Nick Gi", "La que desaparece", 350, "./assets/img/pizza/nickgi.png", "Pizza", false, false, 1),
			// new Product(7, "Picantovich", "Pica 2 veces", 350, "./assets/img/pizza/picantovich.png", "Pizza", false, false, 1),
			// new Product(8, "¡Q' Jamone!", "c/jamón crudo", 350, "./assets/img/pizza/qjamone.png", "Pizza", false, false, 1),

			// new Product(9, "Clásica", "Para conservadores", 350, "./assets/img/hamburguesa/hclasica.jpg", "Hamburguesa", false, false, 1),
			// new Product(10, "Monstruosa", "No le tengas miedo", 350, "./assets/img/hamburguesa/hmonstruosa.jpg", "Hamburguesa", true, true, 1),
			// new Product(11, "Vegeta", "Voy a hacerte pedazos", 350, "./assets/img/hamburguesa/hveggie.jpg", "Hamburguesa", true, false, 1),

			// new Product(12, "Cheddar y Panceta", "Experiencia única", 350, "./assets/img/papasFritas/cheddarpanceta.jpg", "Papas fritas", true, false, 1),
			// new Product(13, "Clásicas", "Cortita y al pié", 350, "./assets/img/papasFritas/clasicas.jpg", "Papas fritas", false, false, 1),
			// new Product(14, "Provensal", "¿Viniste sólo no?", 350, "./assets/img/papasFritas/provensal.jpg", "Papas fritas", true, false, 1),

			// new Product(15, "Carnitas", "Mooooo", 350, "./assets/img/wrap/wcarnitas.jpg", "Wrap", true, true, 1),
			// new Product(16, "Pollito", "Pio pio", 350, "./assets/img/wrap/wpollito.jpg", "Wrap", true, false, 1),
			// new Product(17, "veggie", "sonido vegetal", 350, "./assets/img/wrap/wveggie.jpg", "Wrap", false, false, 1),

		];
	}
});

