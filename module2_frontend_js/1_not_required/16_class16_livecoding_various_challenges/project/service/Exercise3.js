import Util from "../util/Util.js";

const divTasks = document.getElementById("tasks");
const formExercise3 = document.getElementById("formExercise3");
const inputTask = document.getElementById("inputTask");
const buttonClearLocalStorage = document.getElementById("buttonClearLocalStorage");

let executeDebounce = true;
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

export default new (class Exercise2 {
	saveTaskLocalStorage() {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}

	validTask() {
		const taskValue = inputTask.value;
		if (taskValue == "") {
			Util.showError(inputTask, "La tarea es obligatoria");
		} else {
			Util.showSuccess(inputTask);
			return true;
		}
		return false;
	}

	renderTask(task) {
		return `<div>
		<p>${task}</p>
	</div>`;
	}

	renderAllTasks() {
		divTasks.innerHTML = tasks.map((task) => this.renderTask(task)).join("");
	}

	eventClickSubmit() {
		formExercise3.addEventListener("submit", (e) => {
			e.preventDefault();
			if (this.validTask()) {
				executeDebounce = false;
				tasks = [...tasks, inputTask.value];
				this.saveTaskLocalStorage();
				this.renderAllTasks();
				Util.formReset(formExercise3, inputTask);
			}
		});
	}

	debounce(callback, timeout=1) {
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				if (executeDebounce) {
					callback.apply(this, args);
				}
			}, timeout);
		};
	}

	eventInputChanged() {
		formExercise3.addEventListener(
			"input",
			this.debounce((e) => {
				switch (e.target.id) {
					case "inputTask":
						this.validTask();
						break;
				}
			})
		);
	}

	eventClickClearLocalStorage() {
		buttonClearLocalStorage.addEventListener("click", (e) => {
			e.preventDefault();
			if (localStorage.getItem("tasks") != null) {
				localStorage.removeItem("tasks");
				divTasks.innerHTML = "";
				tasks = [];
				Util.formReset(formExercise3, inputTask);
			} else {
				Util.showError(inputTask, "No hay datos para limpiar");
			}
		});
	}
})();
