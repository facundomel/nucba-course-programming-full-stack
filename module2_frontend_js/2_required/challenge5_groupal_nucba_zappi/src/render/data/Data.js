import Product from "../../model/Product.js";

export default new (class Data {
	getData() {
		return [
			new Product(1, "La Charly Garcia", "¡BASTA!", 350, "./assets/img/pizza/lacharlygarcia.png", "Pizza", true, false, 1),
			new Product(2, "La Hasbulla", "En honor al 1", 350, "./assets/img/pizza/lahasbulla.png", "Pizza", true, true, 1),
			new Product(3, "La Maradona", "¡Eterna!", 350, "./assets/img/pizza/lamaradona.png", "Pizza", false, false, 1),
			new Product(4, "La Mr. Pit", "Solo para expertos", 350, "./assets/img/pizza/lamrpit.png", "Pizza", false, false, 1),
			new Product(5, "Leo Messi", "¡De pié señores!", 350, "./assets/img/pizza/leomessi.png", "Pizza", false, false, 1),
			new Product(6, "Nick Gi", "La que desaparece", 350, "./assets/img/pizza/nickgi.png", "Pizza", false, false, 1),
			new Product(7, "Picantovich", "Pica 2 veces", 350, "./assets/img/pizza/picantovich.png", "Pizza", false, false, 1),
			new Product(8, "¡Q' Jamone!", "c/jamón crudo", 350, "./assets/img/pizza/qjamone.png", "Pizza", false, false, 1),

			new Product(9, "Clásica", "Para conservadores", 350, "./assets/img/hamburguesa/hclasica.jpg", "Hamburguesa", false, false, 1),
			new Product(10, "Monstruosa", "No le tengas miedo", 350, "./assets/img/hamburguesa/hmonstruosa.jpg", "Hamburguesa", true, true, 1),
			new Product(11, "Vegeta", "Voy a hacerte pedazos", 350, "./assets/img/hamburguesa/hveggie.jpg", "Hamburguesa", true, false, 1),

			new Product(12, "Cheddar y Panceta", "Experiencia única", 350, "./assets/img/papasFritas/cheddarpanceta.jpg", "Papas fritas", true, false, 1),
			new Product(13, "Clásicas", "Cortita y al pié", 350, "./assets/img/papasFritas/clasicas.jpg", "Papas fritas", false, false, 1),
			new Product(14, "Provensal", "¿Viniste sólo no?", 350, "./assets/img/papasFritas/provensal.jpg", "Papas fritas", true, false, 1),

			new Product(15, "Carnitas", "Mooooo", 350, "./assets/img/wrap/wcarnitas.jpg", "Wrap", true, true, 1),
			new Product(16, "Pollito", "Pio pio", 350, "./assets/img/wrap/wpollito.jpg", "Wrap", true, false, 1),
			new Product(17, "veggie", "sonido vegetal", 350, "./assets/img/wrap/wveggie.jpg", "Wrap", false, false, 1),

		];
	}
});

