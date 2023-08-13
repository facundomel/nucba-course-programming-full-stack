import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: 'Documentation of the API "The Best Recipes" ',
			version: "1.0.0",
			// description: 'Documentation for the API the-best-recipes',
		},
	},
	apis: ["./src/router/*.ts"],
};

const swaggerSpecs = swaggerJsdoc(options);
export default swaggerSpecs;
