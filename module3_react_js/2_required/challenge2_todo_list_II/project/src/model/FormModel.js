export default class FormModel {
	constructor(inputValue, placeHolder, refInput, handlerOnChangeInput, handlerClickButton, handlerDisableButton, handlerMessageError, valueButton, handlerMessagePokemonID) {
		this.inputValue = inputValue;
		this.placeHolder = placeHolder;
		this.refInput = refInput;
		this.handlerOnChangeInput = handlerOnChangeInput;
		this.handlerClickButton = handlerClickButton;
		this.handlerDisableButton = handlerDisableButton;
		this.handlerMessageError = handlerMessageError;
		this.valueButton = valueButton;
		this.handlerMessagePokemonID = handlerMessagePokemonID;
	}
}
