import { RefObject, ChangeEvent } from "react";
import ErrorCustom, { ERROR_EMAIL_OR_PASSWORD } from "../../../model/ErrorCustom";
import { ErrorContainer, ErrorMessage } from "../../pages/user/UserStyles";
import { InputContainerStyled, InputStyled } from "./InputStyles";

interface InputProps {
	inputRef: RefObject<HTMLInputElement>;
	name: string;
	type: string;
	placeholder: string;
	handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
	error: ErrorCustom | boolean | null;
	paddingRight?: string;
}

const Input = ({ inputRef, name, type, placeholder, handleOnChange, error, paddingRight = "0" }: InputProps) => {
	return (
		<ErrorContainer>
			<InputContainerStyled>
				<InputStyled
					ref={inputRef}
					type={type}
					placeholder={placeholder}
					name={name}
					paddingRight={paddingRight}
					onChange={(e) => handleOnChange(e)}
					isError={error ? true : false}
				/>
			</InputContainerStyled>
			{error && typeof error !== "boolean" && error.type != ERROR_EMAIL_OR_PASSWORD && (
				<ErrorMessage textAlign="left">{error.message}</ErrorMessage>
			)}
		</ErrorContainer>
	);
};

export default Input;
