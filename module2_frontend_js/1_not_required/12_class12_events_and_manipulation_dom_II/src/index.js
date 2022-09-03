const form = document.getElementById("form");

function createElementPagraphCompleteField(elementId) {
  let pagraphCompleteField = document.createElement("p");
  pagraphCompleteField.setAttribute("id", elementId);
  pagraphCompleteField.innerText = "Debe completar este campo";
  pagraphCompleteField.classList.add("message-validation-input");
  return pagraphCompleteField;
}

function createElementPagraphOnlyNumbersPhone() {
  let pagraphOnlyNumbers = document.createElement("p");
  pagraphOnlyNumbers.setAttribute("id", "pagraphOnlyNumbers");
  pagraphOnlyNumbers.innerText = "Debe contener solo números";
  pagraphOnlyNumbers.classList.add("message-validation-input");
  return pagraphOnlyNumbers;
}

function eventFocusInAndOutInputs(input, elementPId, formGroup) {
  let pagraphCompleteField;
  let pagraphInputPhone;

  input.addEventListener("focusin", () => {
    if (input.id == "inputPhone") {
      pagraphInputPhone = document.getElementById("pagraphOnlyNumbers");
      if (document.body.contains(pagraphInputPhone)) 
        pagraphInputPhone.remove();
      else
        formGroup.appendChild(createElementPagraphOnlyNumbersPhone());
    }
    
		if (document.body.contains(document.getElementById(elementPId))) 
			pagraphCompleteField.remove();
	});

	input.addEventListener("focusout", () => {
		if (input.value == "") {
      if (input.id == "inputPhone") {
        pagraphInputPhone = document.getElementById("pagraphOnlyNumbers");
        if (document.body.contains(pagraphInputPhone))
          pagraphInputPhone.remove();
      }
      pagraphCompleteField  = createElementPagraphCompleteField(elementPId);
			formGroup.appendChild(pagraphCompleteField);
		} else if (input.value != "" && input.id == "inputPhone") {
      document.getElementById("pagraphOnlyNumbers").remove();
    }
	});
}

function eventClickCancel() {
  document.getElementsByName("buttonCancel").forEach((elem) => {
    elem.addEventListener(("click"), (e) => {
      e.preventDefault();
      alert("¡Vuelva pronto!");
      window.location.reload();
    });
  })
}

function eventClickSubmit() {
  let allFieldsComplete = true;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    for (let i = 0; i < form.elements.length; i++) {
      if (form.elements[i].tagName == "INPUT" && form.elements[i].value == "") {
        allFieldsComplete = false;
        break;
      }
    }
    if (allFieldsComplete) {
      alert("¡Muchas gracias por registrarse!");
      window.location.reload();
    } else {
      alert("Debe completar todos los campos");
    }
  })
}

function init() {
	for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].tagName == "INPUT") {
      eventFocusInAndOutInputs(form.elements[i], form.elements[i].id.concat("Pagraph"), form.elements[i].parentElement);
    }
  }
  eventClickCancel();
  eventClickSubmit();
}

init();

