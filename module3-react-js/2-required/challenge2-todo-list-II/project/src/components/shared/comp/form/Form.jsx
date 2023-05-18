import React from "react";
import { FcSearch } from "react-icons/fc";
import { FormStyled, InputAndErrorMessageContainerStyled, InputAndIconContainerStyled } from "./FormStyles";
import { Button } from "../button/Button";

export const Form = (props) => {
	const {
		inputValue,
		placeHolder,
		handlerOnChangeInput,
		refInput,
		handlerClickButton,
		handlerDisableButton,
		handlerMessageError,
		valueButton,
		handlerMessagePokemonID,
	} = props.data;

	return (
		<>
			<InputAndErrorMessageContainerStyled>
				<FormStyled>
					<InputAndIconContainerStyled>
						<FcSearch className="icon-search" />
						<input
							type="text"
							className="input-text"
							value={inputValue}
							onChange={(e) => handlerOnChangeInput(e)}
							placeholder={placeHolder}
							ref={refInput}
							autoFocus
						/>
					</InputAndIconContainerStyled>
					<Button value={valueButton} clickHandler={handlerClickButton} isDisabled={handlerDisableButton()} width="20%" />
				</FormStyled>
				{handlerMessageError()}
				{handlerMessagePokemonID && handlerMessagePokemonID()}
			</InputAndErrorMessageContainerStyled>
		</>
	);
};
