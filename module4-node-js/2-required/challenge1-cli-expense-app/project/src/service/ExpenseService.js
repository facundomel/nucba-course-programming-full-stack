import ExpensePromptUtils from "../utils/ExpensePromptUtils.js";
import FilesUtils from "../utils/FilesUtils.js";

export default class ExpenseService {
	static #FILE_PATH = "./src/data/expenses.json";

	static getAllExpenses = async () => {
		try {
			const expenses = await FilesUtils.readFile("./src/data/expenses.json");
			if (expenses.length == 0) {
				console.log("No existen gastos");
			} else {
				console.log("Gastos: ");
				console.log(expenses);

				let totalExpense = 0;
				expenses.forEach((expense) => {
					totalExpense += expense.amount;
				});

				console.log(`Gasto total: ${totalExpense}`);
			}
		} catch (error) {
			console.log("Error: " + error);
		}
	};

	static createNewExpense = async () => {
		console.log("Nuevo gasto:");
		let newExpense = await ExpensePromptUtils.getNewExpensePrompt();

		while (newExpense.description == "" || newExpense.amount == 0) {
			console.log("Ambos campos son requeridos. Vuelva a ingresarlos:");
			newExpense = await ExpensePromptUtils.getNewExpensePrompt();
		}

		const currentExpenses = await FilesUtils.readFile(this.#FILE_PATH);

		console.log("¿Desea confirmar el nuevo gasto? si/s - no/n");
		let response = await ExpensePromptUtils.getConfirmationExpensePrompt();
		let confirmationExpense = response.confirmation.toLowerCase();

		while (confirmationExpense != "si" && confirmationExpense != "s" && confirmationExpense != "no" && confirmationExpense != "n") {
			console.log("Respuesta incorrecta. Debe seleccionar si/s o no/n");
			response = await ExpensePromptUtils.getConfirmationExpensePrompt();
			confirmationExpense = response.confirmation.toLowerCase();
		}

		if (confirmationExpense == "si" || confirmationExpense == "s") {
			let existExpense = false;
			currentExpenses.forEach((expense) => {
				if (expense.description == newExpense.description) {
					existExpense = true;
					return;
				}
			});

			if (existExpense) {
				existExpense = true;
				console.log("El gasto ya existe. ¿Desea sumarlo al agregado anteriormente? si/s - no/n");
				response = await ExpensePromptUtils.getConfirmationExpensePrompt();
				confirmationExpense = response.confirmation.toLowerCase();

				while (confirmationExpense != "si" && confirmationExpense != "s" && confirmationExpense != "no" && confirmationExpense != "n") {
					console.log("Respuesta incorrecta. Debe seleccionar si/s o no/n");
					response = await ExpensePromptUtils.getConfirmationExpensePrompt();
					confirmationExpense = response.confirmation.toLowerCase();
				}

				if (confirmationExpense == "si" || confirmationExpense == "s") {
					const indexExpense = currentExpenses.findIndex((expense) => expense.description == newExpense.description);
					currentExpenses[indexExpense] = {
						description: currentExpenses[indexExpense].description,
						amount: currentExpenses[indexExpense].amount + newExpense.amount,
					};

					await FilesUtils.writeFile(this.#FILE_PATH, currentExpenses);
					console.log("Gasto almacenado correctamente");
				} else {
					console.log("Almacenamiento de gasto cancelado");
				}
			} else {
				currentExpenses.push(newExpense);
				await FilesUtils.writeFile(this.#FILE_PATH, currentExpenses);
				console.log("Gasto almacenado correctamente");
			}
		} else {
			console.log("Almacenamiento de gasto cancelado");
		}
	};

	static deleteExpenseByDescription = async () => {
		console.log("Eliminación de gasto:");

		const currentExpenses = await FilesUtils.readFile(this.#FILE_PATH);

		if (currentExpenses.length == 0) {
			console.log("No existen gastos");
			return;
		}

		const descriptionExpenseToDelete = await ExpensePromptUtils.deleteExpensePrompt();

		let existExpense = false;
		currentExpenses.forEach((expense) => {
			if (expense.description == descriptionExpenseToDelete.description) {
				existExpense = true;
				return;
			}
		});

		if (!existExpense) {
			console.log("No existe gasto con esa descripción");
			return;
		}

		console.log("¿Desea confirmar la eliminación del gasto? si/s - no/n");
		let response = await ExpensePromptUtils.getConfirmationExpensePrompt();
		let confirmationExpense = response.confirmation.toLowerCase();

		while (confirmationExpense != "si" && confirmationExpense != "s" && confirmationExpense != "no" && confirmationExpense != "n") {
			console.log("Respuesta incorrecta. Debe seleccionar si/s o no/n");
			response = await ExpensePromptUtils.getConfirmationExpensePrompt();
			confirmationExpense = response.confirmation.toLowerCase();
		}

		if (confirmationExpense == "si" || confirmationExpense == "s") {
			const expensesFilteres = currentExpenses.filter((expense) => expense.description != descriptionExpenseToDelete.description);
			await FilesUtils.writeFile(this.#FILE_PATH, expensesFilteres);
			console.log("Gasto eliminado correctamente");
		} else {
			console.log("Eliminación de gasto cancelado");
		}
	};
}
