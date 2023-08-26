INSERT INTO user_roles ("role")
VALUES ('admin');

SELECT *
FROM users_roles ur;

SELECT *
FROM users u;

SELECT *
FROM users u;

INSERT INTO users (first_name, last_name, email,)
VALUES ('test', 'test', 'test');

DELETE FROM recipes
WHERE id > 0;

UPDATE users
SET role_id = 2
WHERE id = 6;

SELECT *
FROM recipes_categories rc;

INSERT INTO recipes_category (category, title, url_image)
VALUES ('test', 'test', 'test');

DELETE FROM recipes_categories
WHERE id = 3;

SELECT *
FROM recipes r;

SELECT *
FROM recipes_favorites rf TRUNCATE TABLE recipes_favorites TRUNCATE TABLE recipes;

DELETE FROM recipes;

DELETE FROM recipes_favorites;

SELECT *
FROM users_roles ur;

SELECT *
FROM recipes_categories rc;

INSERT INTO users_roles (role)
VALUES ('user');

INSERT INTO users_roles (role)
VALUES ('admin');

INSERT INTO recipes_categories (category, title, url_image, user_id)
VALUES ('pasta', 'Pasta', 'Sin URL', 3);

INSERT INTO recipes_categories (category, title, url_image, user_id)
VALUES ('meat', 'Carne', 'Sin URL', 3);

TRUNCATE TABLE users;

TRUNCATE TABLE recipes_favorites;

TRUNCATE TABLE recipes;

TRUNCATE TABLE recipes_categories;

INSERT INTO public.recipes (
		title,
		description,
		url_image,
		ingredients,
		instructions,
		created_date,
		updated_date,
		deleted_date,
		user_id,
		category_id
	)
VALUES(
		'test',
		'test',
		'test',
		'test',
		'test',
		'2023-07-23 18:05:42.000',
		'2023-07-23 18:05:42.000',
		NULL,
		1,
		4
	);

INSERT INTO public.recipes (
		title,
		description,
		url_image,
		ingredients,
		instructions,
		created_date,
		updated_date,
		deleted_date,
		user_id,
		category_id
	)
VALUES(
		'Pollo asado al horno con papas y cebolla',
		'No tiene descripcion',
		'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.paulinacocina.net%2Fwp-content%2Fuploads%2F2021%2F11%2Fpollo-asado.jpg&tbnid=lPmgTDtsQnNMqM&vet=12ahUKEwiA_5TU2KeAAxVTBNQKHbksDa8QMygAegUIARCQAg..i&imgrefurl=https%3A%2F%2Fwww.paulinacocina.net%2Fpollo-asado%2F24967&docid=g61ZUVlBb67tEM&w=1000&h=667&q=pollo%20asado&ved=2ahUKEwiA_5TU2KeAAxVTBNQKHbksDa8QMygAegUIARCQAg',
		'"1 pollo entero o 4 muslos completos.",
					"4 papas medianas.",
					"4 cebollas medianas.",
					"Aceite de oliva.",
					"Sal y pimienta.",
					"Tomillo seco.",',
		'"Comenzamos pelando las papas. Una vez peladas las cortamos en rodajas finas, de no más de 1 centímetro de grosor. Después las ponemos como base en una bandeja para horno. Pelamos también las cebollas y las cortamos en tiras finas. La ponemos sobre las papas y salpimentamos todo.",
					"A continuación ponemos los muslos encima de las papas y la cebolla. Le añadimos a todo un vaso de agua y un chorrete de aceite de oliva. Así quedará mas jugoso mientras se hornea. Nos aseguramos que en el fondo de la fuente haya siempre humedad. Así la guarnición no se va a quemar. Salpimentamos y añadimos un buen pellizco de tomillo seco a cada muslo.",
					"Metemos el pollo al horno a 220º C si utilizas muslos. Dejamos hornear unos 30 minutos, hasta que se dore bien. Si utilizas un pollo entero, horneamos a 190º C.",
					"Cuando esté bien dorado sacamos la bandeja del horno, le damos la vuelta a las piezas. Así, se cocinará el otro lado.",
					"Inmediatamente volvemos a meter la bandeja dentro del horno. Finalmente dejamos cocinar aproximadamente el mismo tiempo, hasta que todo quede bien cocinado.",',
		'2023-07-24 12:48:47.000',
		'2023-07-24 12:48:47.000',
		NULL,
		1,
		2
	);

INSERT INTO public.recipes (
		title,
		description,
		url_image,
		ingredients,
		instructions,
		created_date,
		updated_date,
		deleted_date,
		user_id,
		category_id
	)
VALUES(
		'Test3',
		'1. Descripcion de test',
		'Test3',
		'1. Test3',
		'1. Test3',
		'2023-07-24 14:57:12.000',
		'2023-07-24 14:57:12.000',
		NULL,
		1,
		2
	);

INSERT INTO public.recipes (
		title,
		description,
		url_image,
		ingredients,
		instructions,
		created_date,
		updated_date,
		deleted_date,
		user_id,
		category_id
	)
VALUES(
		'Tet4',
		'Descripcion de Test4',
		'Test4',
		'Ingrediente 1
Ingrediente 2',
		'Instruccion 1
Instruccion 2
Instruccion 3',
		'2023-07-24 15:28:33.000',
		'2023-07-24 15:28:33.000',
		NULL,
		1,
		1
	);

INSERT INTO public.recipes (
		title,
		description,
		url_image,
		ingredients,
		instructions,
		created_date,
		updated_date,
		deleted_date,
		user_id,
		category_id
	)
VALUES(
		'Pollo de test',
		'Prueba',
		'https://www.paulinacocina.net/wp-content/uploads/2021/11/pollo-asado.jpg',
		'Ingrediente 1
Ingrediente 2',
		'Paso 1
Paso 2',
		'2023-07-24 15:43:41.000',
		'2023-07-24 15:43:41.000',
		NULL,
		1,
		2
	);

INSERT INTO public.recipes (
		title,
		description,
		url_image,
		ingredients,
		instructions,
		created_date,
		updated_date,
		deleted_date,
		user_id,
		category_id
	)
VALUES(
		'sadsa',
		'asf',
		'asf',
		'asaf',
		'asf',
		'2023-07-30 00:57:30.000',
		'2023-07-30 00:57:30.000',
		NULL,
		1,
		1
	);

INSERT INTO public.recipes (
		title,
		description,
		url_image,
		ingredients,
		instructions,
		created_date,
		updated_date,
		deleted_date,
		user_id,
		category_id
	)
VALUES(
		'asfasgasggd',
		'asgasga',
		'asgasg',
		'agasgsaa',
		'asgasgasg',
		'2023-07-30 01:00:17.000',
		'2023-07-30 01:00:17.000',
		NULL,
		1,
		1
	);

INSERT INTO public.recipes (
		title,
		description,
		url_image,
		ingredients,
		instructions,
		created_date,
		updated_date,
		deleted_date,
		user_id,
		category_id
	)
VALUES(
		'Test5',
		'123asasf',
		'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.paulinacocina.net%2Fwp-content%2Fuploads%2F2021%2F11%2Fpollo-asado.jpg&tbnid=lPmgTDtsQnNMqM&vet=12ahUKEwiA_5TU2KeAAxVTBNQKHbksDa8QMygAegUIARCQAg..i&imgrefurl=https%3A%2F%2Fwww.paulinacocina.net%2Fpollo-asado%2F24967&docid=g61ZUVlBb67tEM&w=1000&h=667&q=pollo%20asado&ved=2ahUKEwiA_5TU2KeAAxVTBNQKHbksDa8QMygAegUIARCQAg',
		'asfasf',
		'asfasf',
		'2023-07-30 01:00:57.000',
		'2023-07-30 01:00:57.000',
		NULL,
		1,
		1
	);

INSERT INTO public.recipes (
		title,
		description,
		url_image,
		ingredients,
		instructions,
		created_date,
		updated_date,
		deleted_date,
		user_id,
		category_id
	)
VALUES(
		'aaaaa',
		'a',
		'a',
		'a',
		'a',
		'2023-07-30 01:01:21.000',
		'2023-07-30 01:01:21.000',
		NULL,
		1,
		1
	);

INSERT INTO public.recipes (
		title,
		description,
		url_image,
		ingredients,
		instructions,
		created_date,
		updated_date,
		deleted_date,
		user_id,
		category_id
	)
VALUES(
		'b',
		'b',
		'b',
		'b',
		'b',
		'2023-07-30 01:09:37.000',
		'2023-07-30 01:09:37.000',
		NULL,
		1,
		1
	);

INSERT INTO public.recipes (
		title,
		description,
		url_image,
		ingredients,
		instructions,
		created_date,
		updated_date,
		deleted_date,
		user_id,
		category_id
	)
VALUES(
		'c',
		'c',
		'c',
		'c',
		'c',
		'2023-07-30 01:11:14.000',
		'2023-07-30 01:11:14.000',
		NULL,
		1,
		1
	);

INSERT INTO public.recipes (
		title,
		description,
		url_image,
		ingredients,
		instructions,
		created_date,
		updated_date,
		deleted_date,
		user_id,
		category_id
	)
VALUES(
		'test',
		'test',
		'test',
		'test',
		'test',
		'2023-07-23 18:05:42.000',
		'2023-07-23 18:05:42.000',
		NULL,
		2,
		1
	);