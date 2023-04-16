import inquirer from "inquirer";
import { createNewExpense, deleteExpenseByDescription, getAllExpenses } from "./service/expense-service.js";

const main = async () => {
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
				await getAllExpenses();
				break;
			case 2:
				await createNewExpense();
				break;
			case 3:
				await deleteExpenseByDescription();
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

main();
