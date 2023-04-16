import utils from "./Utils.js";
export default class Modal {
	constructor(options) {
		let defaults = {
			element: null,
			effect: "zoom",
			state: "closed",
			size: "medium",
			content: null,
			footer: null,
			header: null,
			title: null,
		};
		this.options = Object.assign(defaults, options);
		if (this.options.element == null) {
			this.options.element = document.createElement("div");
			this.options.element.setAttribute("id", "modal");
			this.options.element.classList.add("modal");
			this.options.element.innerHTML = `
              <div class="container-modal">
                  <div class="header">
                      <button class="close">&times;</button> 
                  </div>
                  <div class="content"></div>
                  <div class="footer">
                      <button class="close">Close</button>
                  </div>
              </div>                        
          `;
			document.body.appendChild(this.options.element);
		}
		this.options.element.querySelector(".container-modal").classList.remove("zoom", "slide");
		this.options.element.querySelector(".container-modal").classList.add(this.options.effect);
		if (this.options.header != null) {
			this.header = this.options.header;
		}
		if (this.options.content != null) {
			this.content = this.options.content;
		}
		if (this.options.footer != null) {
			this.footer = this.options.footer;
		}
		if (this.options.title != null) {
			this.title = this.options.title;
		}
		this.size = this.options.size;
		this._eventHandlers();
	}

	open() {
		this.options.state = "open";
		this.options.element.style.display = "flex";
		this.options.element.getBoundingClientRect();
		this.options.element.classList.add("open");
		if (this.options.onOpen) {
			this.options.onOpen(this);
		}
	}

	close() {
		this.options.state = "closed";
		this.options.element.classList.remove("open");
		this.options.element.style.display = "none";
		if (this.options.onClose) {
			this.options.onClose(this);
		}
	}

	get state() {
		return this.options.state;
	}

	get effect() {
		return this.options.effect;
	}

	set effect(value) {
		this.options.effect = value;
		this.options.element.querySelector(".container-modal").classList.remove("zoom", "slide");
		this.options.element.querySelector(".container-modal").classList.add(value);
	}

	get size() {
		return this.options.size;
	}

	set size(value) {
		this.options.size = value;
		this.options.element.classList.remove("small", "large", "medium", "full");
		this.options.element.classList.add(value);
	}

	get content() {
		return this.options.element.querySelector(".content").innerHTML;
	}

	get contentElement() {
		return this.options.element.querySelector(".content");
	}

	set content(value) {
		if (!value) {
			this.options.element.querySelector(".content").remove();
		} else {
			if (!this.options.element.querySelector(".content")) {
				this.options.element.querySelector(".container-modal").insertAdjacentHTML("afterbegin", `<div class="content"></div>`);
			}
			this.options.element.querySelector(".content").innerHTML = value;
		}
	}

	get header() {
		return this.options.element.querySelector(".heading").innerHTML;
	}

	get headerElement() {
		return this.options.element.querySelector(".header");
	}

	set header(value) {
		if (!value) {
			this.options.element.querySelector(".header").remove();
		} else {
			if (!this.options.element.querySelector(".header")) {
				this.options.element.querySelector(".container-modal").insertAdjacentHTML("afterbegin", `<div class="header"></div>`);
			}
			this.options.element.querySelector(".header").innerHTML = value;
		}
	}

	get title() {
		return this.options.element.querySelector(".header .title") ? this.options.element.querySelector(".header .title").innerHTML : null;
	}

	set title(value) {
		if (!this.options.element.querySelector(".header .title")) {
			this.options.element.querySelector(".header").insertAdjacentHTML("afterbegin", `<h1 class="title"></h1>`);
		}
		this.options.element.querySelector(".header .title").innerHTML = value;
	}

	get footer() {
		return this.options.element.querySelector(".footer").innerHTML;
	}

	get footerElement() {
		return this.options.element.querySelector(".footer");
	}

	get containerElement() {
		return this.options.element.querySelector(".container-modal");
	}

	set footer(value) {
		if (!value) {
			this.options.element.querySelector(".footer").remove();
		} else {
			if (!this.options.element.querySelector(".footer")) {
				this.options.element.querySelector(".container-modal").insertAdjacentHTML("beforeend", `<div class="footer"></div>`);
			}
			this.options.element.querySelector(".footer").innerHTML = value;
		}
	}

	_eventHandlers() {
		this.options.element.querySelectorAll(".close").forEach((element) => {
			element.onclick = (event) => {
				event.preventDefault();
				this.close();
			};
		});
	}

	static initElements() {
		document.querySelectorAll("[data-modal]").forEach((element) => {
			element.addEventListener("click", (event) => {
				event.preventDefault();
				let modalElement = document.querySelector(element.dataset.modal);
				let modal = new Modal({ element: modalElement });
				for (let data in modalElement.dataset) {
					if (modal[data]) {
						modal[data] = modalElement.dataset[data];
					}
				}
				modal.open();
			});
		});
	}

	static confirm(value, success, cancel) {
		let modal = new Modal({
			content: `<p style="color: black">${value}</p>`,
			header: "",
			footer: '<button class="cancel">Cancelar</button> <button class="success">Aceptar</button>',
		});
		modal.footerElement.querySelector(".success").onclick = (event) => {
			event.preventDefault();
			if (success) success();
			modal.close();
			this.enableScroll();
		};
		modal.footerElement.querySelector(".cancel").onclick = (event) => {
			event.preventDefault();
			if (cancel) cancel();
			modal.close();
		};
		modal.open();
	}

	static alert(value, success) {
		let modal = new Modal({
			content: `<p style="color: black">${value}</p>`,
			header: "",
			footer: '<button class="success">Aceptar</button>',
		});
		modal.footerElement.querySelector(".success").onclick = (event) => {
			event.preventDefault();
			if (success) success();
			modal.close();
			this.enableScroll();
		};
		modal.open();
	}

	static alertButtonRight(value, success) {
		let modal = new Modal({
			content: `<p style="color: black">${value}</p>`,
			header: "",
			footer: '<button class="success">Aceptar</button>',
		});
		modal.footerElement.classList.add("footer-button-right");
		modal.footerElement.querySelector(".success").onclick = (event) => {
			event.preventDefault();
			if (success) success();
			modal.close();
			this.enableScroll();
		};
		modal.open();
	}

	static loginUser(success, cancel, registerUser) {
		let modal = new Modal({
			content: `
				<form id="form-login">
					<img src="./assets/logo/logo.png" alt="Logo" title="Inicio" />
					<div class="form-group">
						<label for="input-username-login">Username</label>
						<input type="text" class="form-control" id="input-username-login" placeholder="Username" data-name="username">
						<small class="message-error"></small>
					</div>
					<div class="form-group div-group-password-login-and-register">
						<label for="input-password-login">Password</label>
						<input type="password" class="form-control" id="input-password-login" name="password" placeholder="Password" data-name="password">
						<i id="btn-show-password" class="fa-solid fa-eye btn-show-password"></i>
						<i id="btn-hide-password" class="fa-solid fa-eye-slash hide btn-hide-password"></i>
						<small class="message-error"></small>
					</div>
					<p>Si no tiene cuenta registrese haciendo click <a class="register-user">aquí</a></p>
				</form>
			`,
			header: "",
			footer: '<button class="success">Aceptar</button>',
		});

		const inputPasswordLogin = document.getElementById("input-password-login");
		const btnShowPassword = document.getElementById("btn-show-password");
		const btnHidePassword = document.getElementById("btn-hide-password");
		const form = document.getElementById("form-login");
		this.#eventsPasswordLoginAndRegister(inputPasswordLogin, btnShowPassword, btnHidePassword);
		this.#eventInputChange(form);
		this.#eventInputChangeOnlyPassword(form, btnShowPassword);

		modal.footerElement.classList.add("footer-button-right");

		modal.footerElement.querySelector(".success").onclick = (event) => {
			event.preventDefault();

			var isSuccess = false;

			if (success) isSuccess = success();

			if (isSuccess) modal.close();

			this.enableScroll();
		};

		// modal.footerElement.querySelector(".cancel").onclick = (event) => {
		// 	event.preventDefault();
		// 	if (cancel) cancel();
		// 	modal.close();
		// 	this.enableScroll();
		// };

		modal.containerElement.querySelector(".register-user").onclick = (event) => {
			event.preventDefault();
			if (registerUser) registerUser();
			modal.close();
		};

		modal.open();

		const inputUserName = document.getElementById("input-username-login");
		inputUserName.focus();
	}

	static registerUser(success, cancel) {
		let modal = new Modal({
			content: `
				<form id="form-register">
					<img src="./assets/logo/logo.png" alt="Logo" title="Inicio" />
          <div class="form-group">
            <label for="input-name">Nombre</label>
            <input type="text" class="form-control" id="input-name" placeholder="Nombre" data-name="nombre">
						<small class="message-error"></small>
          </div>
          <div class="form-group">
            <label for="input-lastname">Apellido</label>
            <input type="text" class="form-control" id="input-lastname" placeholder="Apellido" data-name="apellido">
						<small class="message-error"></small>
          </div>
          <div class="form-group">
            <label for="input-email">Email</label>
            <input type="email" class="form-control" id="input-email" placeholder="Email">
						<small class="message-error"></small>
          </div>
					<div class="form-group">
            <label for="input-username-register">Username</label>
            <input type="text" class="form-control" id="input-username-register" placeholder="Username" data-name="username">
						<small class="message-error"></small>
          </div>
          <div class="form-group div-group-password-login-and-register">
            <label for="input-password-register">Password</label>
            <input type="password" class="form-control" id="input-password-register" placeholder="Password" data-name="password">
						<i id="btn-show-password-register" class="fa-solid fa-eye btn-show-password"></i>
						<i id="btn-hide-password-register" class="fa-solid fa-eye-slash hide btn-hide-password"></i>
						<small class="message-error"></small>
          </div>
        </form>
			`,
			header: "",
			footer: '<button class="cancel">Cancelar</button> <button class="success">Aceptar</button>',
		});

		const btnShowPassword = document.getElementById("btn-show-password-register");
		const btnHidePassword = document.getElementById("btn-hide-password-register");
		const inputPasswordRegister = document.getElementById("input-password-register");
		const form = document.getElementById("form-register");
		this.#eventsPasswordLoginAndRegister(inputPasswordRegister, btnShowPassword, btnHidePassword);
		this.#eventInputChange(form);
		this.#eventInputChangeOnlyPassword(form, btnShowPassword);

		modal.footerElement.querySelector(".success").onclick = (event) => {
			event.preventDefault();

			var isSuccess = false;

			if (success) isSuccess = success();

			if (isSuccess) modal.close();

			this.enableScroll();
		};

		modal.footerElement.querySelector(".cancel").onclick = (event) => {
			event.preventDefault();
			if (cancel) cancel();
			modal.close();
		};

		modal.open();

		const inputName = document.getElementById("input-name");
		inputName.focus();
	}

	static prompt(value, def, success, cancel) {
		let modal = new Modal({ header: "", footer: '<button class="success">OK</button><button class="cancel alt">Cancel</button>' });
		modal.content = value + `<div class="prompt-input"><input type="text" value="${def}" placeholder="Enter your text..."></div>`;
		modal.footerElement.querySelector(".success").onclick = (event) => {
			event.preventDefault();
			if (success) success(modal.contentElement.querySelector(".prompt-input input").value);
			modal.close();
		};
		modal.footerElement.querySelector(".cancel").onclick = (event) => {
			event.preventDefault();
			if (cancel) cancel(modal.contentElement.querySelector(".prompt-input input").value);
			modal.close();
		};
		modal.open();
	}

	// Scroll
	static enableScroll() {
		const body = document.querySelector("body");
		body.classList.remove("disable-scroll");
	}

	static #eventsPasswordLoginAndRegister(input, btnShowPassword, btnHidePassword) {
		btnShowPassword.addEventListener("click", () => {
			if (input.value == "") return;

			input.type = "text";
			btnShowPassword.classList.add("hide");
			btnHidePassword.classList.remove("hide");
		});

		btnHidePassword.addEventListener("click", () => {
			input.type = "password";
			btnShowPassword.classList.remove("hide");
			btnHidePassword.classList.add("hide");
		});
	}

	static #debounce(callback, timeout = 200) {
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				callback.apply(this, args);
			}, timeout);
		};
	}

	static #eventInputChange(form) {
		form.addEventListener(
			"input",
			this.#debounce((e) => {
				switch (e.target.id) {
					case "input-email":
						this.#validEmail(e.target);
						break;
					case "input-password-register":
						this.#validPasswordRegister(e.target);
						break;
					default:
						this.#validInputDefault(e.target);
						break;
				}
			})
		);
	}

	static #validEmail(input) {
		const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
		const emailValue = input.value;
		if (emailValue == "") {
			utils.showMessageError(input, "El email es obligatorio");
		} else if (!regex.test(emailValue)) {
			utils.showMessageError(input, "El email es inválido");
		} else {
			utils.showMessageSuccess(input);
		}
	}

	static #validPasswordRegister(input) {
		const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
		const passwordValue = input.value;
		if (passwordValue == "") {
			utils.showMessageError(input, "El password es obligatorio");
		} else if (!regex.test(passwordValue)) {
			utils.showMessageError(input, "El password debe contener como mínimo una letra minúscula, una mayúscula y un total de 8 caracteres");
		} else {
			utils.showMessageSuccess(input);
		}
	}

	static #validInputDefault(input) {
		const inputValue = input.value;
		if (inputValue == "") {
			utils.showMessageError(input, `El ${input.dataset.name} es obligatorio`);
		} else {
			utils.showMessageSuccess(input);
		}
	}

	static #debounceOnlyPassword(callback, timeout = 0) {
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				callback.apply(this, args);
			}, timeout);
		};
	}

	static #eventInputChangeOnlyPassword(form, btnShowPassword) {
		form.addEventListener(
			"input",
			this.#debounceOnlyPassword((e) => {
				switch (e.target.id) {
					case "input-password-login":
						this.#validButtonsPassword(e.target, btnShowPassword);
						break;
					case "input-password-register":
						this.#validButtonsPassword(e.target, btnShowPassword);
						break;
				}
			})
		);
	}

	static #validButtonsPassword(input, btnShowPassword) {
		const passwordValue = input.value;
		if (passwordValue == "") {
			btnShowPassword.classList.add("btn-show-password");
		} else {
			btnShowPassword.classList.remove("btn-show-password");
		}
	}
}
