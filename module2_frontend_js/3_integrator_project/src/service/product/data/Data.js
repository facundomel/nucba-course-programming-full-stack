import Product from "../../../model/Product.js";

export default new (class Data {
	getData() {
		return [
			// Consolas
			new Product(
				1,
				"PlayStation 3",
				"Sony PlayStation 3 Slim 120GB Standard color charcoal black",
				"59.584,00",
				"./assets/products/consoles/play-station-3.png",
				"consoles",
				true,
				"65.755,00"
			),

			new Product(
				2,
				"Xbox Series S",
				"Microsoft Xbox Series S 512GB Standard color blanco",
				"129.999,00",
				"./assets/products/consoles/xbox-series-s.png",
				"consoles",
				true,
				"139.999,00"
			),

			new Product(
				3,
				"Nintendo Wii",
				"Nintendo Wii 512MB Standard color blanco",
				"30.087,00",
				"./assets/products/consoles/nintendo-wii.png",
				"consoles",
				false
			),

			new Product(
				4,
				"PlayStation 4",
				"Sony PlayStation 4 500GB Standard color negro azabache",
				"135.000,00",
				"./assets/products/consoles/play-station-4.png",
				"consoles",
				false
			),

			// Notebooks
			new Product(
				5,
				"Notebook Asus ZenBook 14 UM425QA",
				'Notebook Asus ZenBook 14 UM425QA pine gray 14", AMD Ryzen 5 4500U 8GB de RAM 512GB SSD, AMD Radeon RX Vega 6 (Ryzen 4000/5000) 1920x1080px Windows 11 Home',
				"269.999,00",
				"./assets/products/notebooks/asus-zenbook.png",
				"notebooks",
				false
			),

			new Product(
				6,
				"Notebook Dell Inspiron 3515",
				'Notebook Dell Inspiron 3515 plateada 15.5", AMD Ryzen 5 3450U 8GB de RAM 256GB SSD, AMD Radeon RX Vega 8 (Ryzen 2000/3000) 1366x768px Windows 11 Home',
				"144.399,00",
				"./assets/products/notebooks/dell-inspiron.png",
				"notebooks",
				true,
				"159.999,00"
			),

			new Product(
				7,
				"Notebook Lenovo IdeaPad 14IIL05 platinum gray",
				'Notebook Lenovo IdeaPad 14IIL05 platinum gray 14", Intel Core i5 1035G1 8GB de RAM 512GB SSD, Intel UHD Graphics G1 1920x1080px Windows 10 Home',
				"185.147,00",
				"./assets/products/notebooks/lenovo-ideapad.png",
				"notebooks",
				false
			),

			// Celulares
			new Product(
				8,
				"Moto G22",
				"Moto G22 128 GB iceberg blue 4 GB RAM",
				"51.999,00",
				"./assets/products/cellphones/moto-g22.png",
				"cellphones",
				false
			),

			new Product(
				9,
				"Samsung Galaxy A03",
				"Samsung Galaxy A03 128 GB negro 4 GB RAM",
				"49.999,00",
				"./assets/products/cellphones/samsung-galaxy-a03.png",
				"cellphones",
				false
			),

			new Product(
				10,
				"Xiaomi Redmi Note 11",
				"Xiaomi Redmi Note 11 (Snapdragon) Dual SIM 128 GB gris grafito 4 GB RAM",
				"79.999,00",
				"./assets/products/cellphones/xiaomi-redmi-note-11.png",
				"cellphones",
				false
			),

			new Product(
				11,
				"Apple iPhone 11",
				"Apple iPhone 11 (128 GB) - Negro",
				"231.084,00",
				"./assets/products/cellphones/iphone-11.png",
				"cellphones",
				false
			),

			// Smart watch
			new Product(
				14,
				"Smartwatch Noga NG-SW05",
				'Smartwatch Noga NG-SW05 1.3" caja de metal plateada, malla negra de tpu',
				"10.250,00",
				"./assets/products/smart_watch/noga_ng_sw05.png",
				"smart-watch",
				true,
				"11.780,00"
			),

			new Product(
				15,
				"Xiaomi Redmi Watch 2 Lite",
				'Xiaomi Redmi Watch 2 Lite 1.55" caja black, malla black de tpu',
				"17.799,00",
				"./assets/products/smart_watch/xiaomi_redmi_watch_2_lite.png",
				"smart-watch",
				false,
			),

			new Product(
				16,
				"Samsung Galaxy Watch4",
				'Samsung Galaxy Watch4 (Bluetooth) 1.4" caja 44mm de aluminio black, malla black de fluoroelastómero SM-R870',
				"55.990,00",
				"./assets/products/smart_watch/samsung_galaxy_watch4.png",
				"smart-watch",
				false
			),
		];
	}
})();
