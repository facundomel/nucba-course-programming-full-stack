CREATE TABLE recipes (
	id serial4 NOT NULL,
	title varchar(100) NOT NULL,
	description varchar NULL,
	url_image varchar NOT NULL,
	ingredients varchar NOT NULL,
	instructions varchar NOT NULL,
	created_date timestamp(0) NOT NULL DEFAULT NOW(),
	updated_date timestamp(0) NOT NULL DEFAULT NOW(),
	deleted_date timestamp(0) NULL,
	user_id int4 NOT NULL,
	category_id int4 NOT NULL,
	CONSTRAINT "PK_8f09680a51bf3669c1598a21682" PRIMARY KEY (id),
	CONSTRAINT "FK_recipes_recipes_categories_id" FOREIGN KEY (category_id) REFERENCES public.recipes_categories(id),
	CONSTRAINT "FK_recipes_user_id" FOREIGN KEY (user_id) REFERENCES public.users(id)
);

CREATE TABLE recipes_categories (
	id serial4 NOT NULL,
	category varchar(50) NOT NULL,
	title varchar(50) NOT NULL,
	url_image varchar NOT NULL,
	created_date timestamp(0) NOT NULL DEFAULT NOW(),
	updated_date timestamp(0) NOT NULL DEFAULT NOW(),
	deleted_date timestamp(0) NULL,
	user_id int4 NOT NULL,
	CONSTRAINT "PK_42be0e5a73d0ba203c681af6791" PRIMARY KEY (id),
	CONSTRAINT "UQ_recipes_categories_name" UNIQUE (category),
	CONSTRAINT "UQ_recipes_title" UNIQUE (title),
	CONSTRAINT "FK_recipes_categories_user_id" FOREIGN KEY (user_id) REFERENCES public.users(id)
);

CREATE TABLE recipes_favorites (
	id serial4 NOT NULL,
	user_id int4 NOT NULL,
	recipe_id int4 NOT NULL,
	created_date timestamp(0) NOT NULL DEFAULT NOW(),
	updated_date timestamp(0) NOT NULL DEFAULT NOW(),
	deleted_date timestamp(0) NULL,
	CONSTRAINT "PK_518e3e0d785e11b6bcb943886fe" PRIMARY KEY (id, user_id, recipe_id),
	CONSTRAINT "FK_recipes_favorites_recipe_id" FOREIGN KEY (recipe_id) REFERENCES public.recipes(id),
	CONSTRAINT "FK_recipes_favorites_user_id" FOREIGN KEY (user_id) REFERENCES public.users(id)
);

CREATE TABLE users (
	id serial4 NOT NULL,
	first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	email varchar(50) NOT NULL,
	"password" varchar(100) NOT NULL,
	created_date timestamp(0) NOT NULL DEFAULT NOW(),
	updated_date timestamp(0) NOT NULL DEFAULT NOW(),
	deleted_date timestamp(0) NULL,
	role_id int4 NOT NULL DEFAULT 1,
	CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id),
	CONSTRAINT "UQ_users_email" UNIQUE (email),
	CONSTRAINT "FK_users_users_roles_id" FOREIGN KEY (role_id) REFERENCES public.users_roles(id)
);

CREATE TABLE users_roles (
	id serial4 NOT NULL,
	"role" varchar(50) NOT NULL DEFAULT 'user'::character varying,
	description varchar(50) NULL,
	created_date timestamp(0) NOT NULL DEFAULT NOW(),
	updated_date timestamp(0) NOT NULL DEFAULT NOW(),
	deleted_date timestamp(0) NULL,
	CONSTRAINT "PK_1d8dd7ffa37c3ab0c4eefb0b221" PRIMARY KEY (id),
	CONSTRAINT "UQ_users_roles" UNIQUE (role)
);