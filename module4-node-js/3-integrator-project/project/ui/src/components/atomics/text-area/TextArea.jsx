import React from "react";
import { ErrorContainer, ErrorMessage } from "../../pages/user/UserStyles";
import { TextAreaContainerStyled, TextAreaStyled } from "./TextAreaStyles";

// const TextArea = ({ isFieldDescription, valueInputs, setValueInputs, textAreaRef, name, type, placeholder, error, paddingRight, rows }) => {
// 	const [counter, setCounter] = useState(1);
// 	const [textareaValue, setTextareaValue] = useState("");
// 	const [isFocused, setIsFocused] = useState(false);

// 	const handleFocus = () => {
// 		setIsFocused(true);
// 		if (!isFieldDescription && counter === 1 && textareaValue.trim() === "") {
// 			setTextareaValue(`${counter}. `);
// 			setCounter(counter + 1);
// 		}
// 	};

// 	const handleBlur = () => {
// 		setIsFocused(false);
// 		if (!isFieldDescription && textareaValue.trim() === `${counter - 1}.`) {
// 			setTextareaValue("");
// 			setCounter(1);
// 		}
// 		if (!isFieldDescription && textareaValue.trim() === "") {
// 			setTextareaValue(placeholder);
// 		}
// 	};

// 	const handleKeyDown = (event) => {
// 		if (event.key === "Backspace" && textareaValue.endsWith("1. ")) {
// 			event.preventDefault();
// 		} else if (event.key === "Enter") {
// 			event.preventDefault();
// 			setTextareaValue(textareaValue + `\n${counter}. `);
// 			setCounter(counter + 1);
// 		}
// 	};

// 	const handleChange = (event) => {
// 		const value = event.target.value;
// 		const target = event.target;
// 		const name = target.name;

// 		setValueInputs({ ...valueInputs, [name]: value });
// 		setTextareaValue(value);

// 		if (!isFieldDescription && value === `${counter}. `) {
// 			setCounter(counter + 1);
// 		}
// 	};

// 	return (
// 		<ErrorContainer>
// 			<TextAreaContainerStyled>
// 				<TextAreaStyled
// 					ref={textAreaRef}
// 					type={type}
// 					// placeholder={placeholder}
// 					name={name}
// 					paddingRight={paddingRight}
// 					// onChange={(e) => handleOnChange(e)}
// 					isError={error && true}
// 					rows={rows}
// 					value={textareaValue}
// 					onChange={handleChange}
// 					onKeyDown={handleKeyDown}
// 					onFocus={handleFocus}
// 					onBlur={handleBlur}
// 					placeholder={placeholder}
// 				/>
// 			</TextAreaContainerStyled>
// 			{error && <ErrorMessage textAlign="left">{error.message}</ErrorMessage>}
// 		</ErrorContainer>
// 	);
// };

// export default TextArea;


const TextArea = ({ textAreaRef, name, type, placeholder, handleOnChange, error, paddingRight, rows }) => {
	return (
		<ErrorContainer>
			<TextAreaContainerStyled>
				<TextAreaStyled
					ref={textAreaRef}
					type={type}
					placeholder={placeholder}
					name={name}
					paddingRight={paddingRight}
					onChange={(e) => handleOnChange(e)}
					isError={error && true}
					rows={rows}
				/>
			</TextAreaContainerStyled>
			{error && <ErrorMessage textAlign="left">{error.message}</ErrorMessage>}
		</ErrorContainer>
	);
};

export default TextArea;
