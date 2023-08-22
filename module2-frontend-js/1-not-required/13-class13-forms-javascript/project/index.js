const form = document.getElementById("form");
const email = document.getElementById("inputEmail");
const password = document.getElementById("inputPassword");

function showError(input, message) {
	const parentInput = input.parentElement;
	const messageError = parentInput.querySelector("small");
	parentInput.classList.add("error");
	parentInput.classList.remove("success");
	messageError.textContent = message;
	input.focus();
}

function showSuccess(input) {
	const parentInput = input.parentElement;
	const messageError = parentInput.querySelector("small");
	parentInput.classList.remove("error");
	parentInput.classList.add("success");
	messageError.textContent = null;
}

function validEmail() {
	const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
	const emailValue = email.value;
	if (emailValue == "") {
		showError(email, "El email es obligatorio");
	} else if (!regex.test(emailValue)) {
		showError(email, "El email es inválido");
	} else {
		showSuccess(email);
		return true;
	}
	return false;
}

function validPassword() {
	const passwordValue = password.value;
	if (passwordValue == "") {
		showError(password, "El password es obligatorio");
	} else if (passwordValue.length < 5 || passwordValue.length > 12) {
		showError(password, "El password debe tener como mínimo 5 caracteres y como máximo 12");
	} else {
		showSuccess(password);
		return true;
	}
	return false;
}

function eventClickCancel() {
	document.getElementsByName("buttonCancel").forEach((elem) => {
		elem.addEventListener("click", (e) => {
			e.preventDefault();
			alert("¡Vuelva pronto!");
			window.location.reload();
		});
	});
}

function eventClickSubmit() {
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		if (validEmail() && validPassword()) {
			form.submit();
		}
	});
}

function eventKeypressEnter() {
	for (let i = 0; i < form.elements.length; i++) {
		if (form.elements[i].localName == "input") {
			form.elements[i].addEventListener("keypress", (e) => {
				if (e.key == "Enter") {
					e.preventDefault();
					if (validEmail() && validPassword()) {
						form.submit();
					}
				}
			});
		}
	}
}

function debounce(callback, timeout = 1000) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			callback.apply(this, args);
		}, timeout);
	}
}

function eventInputChange() {
	form.addEventListener("input", debounce((e) => {
		switch (e.target.id) {
			case "inputEmail":
				validEmail();
				break;
			case "inputPassword":
				validPassword();
				break;
		}
	}))
}

function init() {
	eventClickCancel();
	eventClickSubmit();
  eventKeypressEnter();
	eventInputChange();
}

init();
