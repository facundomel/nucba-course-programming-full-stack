import reqResService from "./service/ReqResService.js";

function getAllUsers() {
	reqResService.getAllUsers()
		.then((data) => {
			if (data.length > 0) {
				console.log("Lista de usuarios: ");
				console.log(data);
			} else {
				console.log("No hay usuarios para mostrar");
			}
		})
		.catch((error) => {
			console.log(`Error: ${error}`);
		});
}

function init() {
	getAllUsers();
}

init();
