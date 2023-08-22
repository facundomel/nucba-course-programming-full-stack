import inquirer from "inquirer";

export default class ExpensePromptUtils {
	static #newExpensePrompt = [
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

	static #confirmationExpensePrompt = [
		{
			type: "input",
			name: "confirmation",
			message: "Confirmación:",
		},
	];

	static #descriptionExpensePrompt = [
		{
			type: "input",
			name: "description",
			message: "Descripción del gasto a eliminar:",
		},
	];

	static getNewExpensePrompt = async () => {
		return await inquirer.prompt(this.#newExpensePrompt);
	};

	static getConfirmationExpensePrompt = async () => {
		return await inquirer.prompt(this.#confirmationExpensePrompt);
	};

	static deleteExpensePrompt = async () => {
		return await inquirer.prompt(this.#descriptionExpensePrompt);
	};
}
