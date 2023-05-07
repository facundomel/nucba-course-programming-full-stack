import inquirer from "inquirer";
import ExpenseService from "./service/ExpenseService.js";

class Main {
	static init = async () => {
		let run = true;
		while (run) {
			const action = await inquirer.prompt([
				{
					type: "list",
					name: "chosen",
					message: "Actions:",
					choices: [
						{ value: 1, name: "Mostrar gastos" },
						{ value: 2, name: "Crear gasto" },
						{ value: 3, name: "Eliminar gasto" },
						{ value: 99, name: "SALIR" },
					],
				},
			]);

			switch (action.chosen) {
				case 1:
					await ExpenseService.getAllExpenses();
					break;
				case 2:
					await ExpenseService.createNewExpense();
					break;
				case 3:
					await ExpenseService.deleteExpenseByDescription();
					break;
				case 99:
					run = false;
					break;
				default:
					run = false;
					break;
			}
		}

		console.log("¡Hasta luego, vuelva pronto!");
	};
}

Main.init();
