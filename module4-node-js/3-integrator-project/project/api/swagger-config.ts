import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
	swaggerDefinition: {
		openapi: "3.1.0",
		info: {
			title: 'Documentation of the API "The Best Recipes" ',
			version: "1.0.0",
			// description: 'Documentation for the API the-best-recipes',
		},
		components: {
			// Agrega esta sección para definir el esquema de seguridad
			securitySchemes: {
				Authorization: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
		security: [{ Authorization: [] }], // Aplica la seguridad globalmente
	},
	apis: ["./src/router/*.ts"],
};

const swaggerSpecs = swaggerJsdoc(options);
export default swaggerSpecs;
