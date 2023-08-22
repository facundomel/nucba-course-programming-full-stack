import inquirer from "inquirer";

export const getNewExpensePrompt = async () => {
	return await inquirer.prompt(newExpensePrompt);
};

export const getConfirmationExpensePrompt = async () => {
	return await inquirer.prompt(confirmationExpensePrompt);
};

export const deleteExpensePrompt = async () => {
	return await inquirer.prompt(descriptionExpensePrompt);
};

const newExpensePrompt = [
	{
		type: "input",
		name: "description",
		message: "Descripción:",
	},
	{
		type: "number",
		name: "amount",
		message: "Monto gastado:",
		default: 0,
	},
];

const confirmationExpensePrompt = [
	{
		type: "input",
		name: "confirmation",
		message: "Confirmación:",
	},
];

const descriptionExpensePrompt = [
	{
		type: "input",
		name: "description",
		message: "Descripción del gasto a eliminar:",
	},
];
