import reqResService from "./service/ReqResServ.js";

const listUsers = document.getElementById("list-users");

async function getAllUsers() {
	try {
		const users = await reqResService.getAllUsers();
		renderUsers(users);
	} catch (error) {
		console.log(error);
	}
}

function renderUsers(users) {
	if (users != null) {
		listUsers.classList.remove("list-users-none");
		listUsers.classList.add("list-users");

		listUsers.innerHTML = `<h1>Lista de usuarios:</h1> 
		${users.map((user) => {
			return `<p>ID: ${user.id} - First name: ${user.first_name} - Last name: ${user.last_name} - Email: ${user.email}</p>`;
		}).join("")}
		`;
	}
}

function init() {
	getAllUsers();
}

init();
