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
			this.enableScroll();
		};
		modal.open();
	}

	static alert(value, success) {
		let modal = new Modal({ content: `<p style="color: black">${value}</p>`, header: "", footer: '<button class="success">Aceptar</button>' });
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
				<form>
					<img src="./assets/logo/logo.png" alt="Logo" title="Inicio" />
					<div class="form-group">
						<label for="input-username">Username</label>
						<input type="text" class="form-control" id="input-username" placeholder="Username">
					</div>
					<div class="form-group">
						<label for="input-password">Password</label>
						<input type="password" class="form-control" id="input-password" placeholder="Password">
					</div>
					<p>Si no tiene cuenta registrese haciendo click <a class="register-user">aquí</a></p>
				</form>
			`,
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
			this.enableScroll();
		};
		modal.containerElement.querySelector(".register-user").onclick = (event) => {
			event.preventDefault();
			if (registerUser) registerUser();
			modal.close();
			this.enableScroll();
		};
		modal.open();
	}

	static registerUser(success, cancel) {
		let modal = new Modal({
			content: `
				<form>
					<img src="./assets/logo/logo.png" alt="Logo" title="Inicio" />
          <div class="form-group">
            <label for="inputName">Nombre</label>
            <input type="text" class="form-control" id="inputName" placeholder="Nombre" required autofocus>
          </div>
          <div class="form-group">
            <label for="inputLastName">Apellido</label>
            <input type="text" class="form-control" id="inputLastName" placeholder="Apellido" required>
          </div>
          <div class="form-group">
            <label for="inputPhone">Teléfono</label>
            <input type="number" class="form-control" id="inputPhone" placeholder="Teléfono" required autofocus>
            <p class="message-phone">Debe contener solo números</p>
          </div>
          <div class="form-group">
            <label for="inputEmail">Email</label>
            <input type="email" class="form-control" id="inputEmail" placeholder="Email" required autofocus>
          </div>
          <div class="form-group">
            <label for="inputPassword">Password</label>
            <input type="password" class="form-control" id="inputPassword" placeholder="Password" required>
          </div>
        </form>
			`,
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
			this.enableScroll();
		};
		modal.open();
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

	static enableScroll() {
		const body = document.querySelector("body");
		body.classList.remove("disable-scroll");
	}
}
