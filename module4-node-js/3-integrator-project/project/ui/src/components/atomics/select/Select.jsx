import React from "react";
import { ErrorContainer, ErrorMessage } from "../../pages/user/UserStyles";
import { SelectContainerStyled, SelectStyled, customStyles } from "./SelectStyles";
import Select from "react-select";

const SelectCustom = ({ name, placeholder, selectRef, options, handleOnChange, error, children, defaultValue, paddingRight }) => {
	return (
		<ErrorContainer>
			<SelectContainerStyled>
				{/* <SelectStyled
					defaultValue={defaultValue}
					ref={selectRef}
					name={name}
					paddingRight={paddingRight}
					onChange={(e) => handleOnChange(e)}
					isError={error && true}
				>
					{children}
				</SelectStyled> */}
				<Select
					// defaultValue={{ value: -1, label: "- Seleccioná una opción -", isPlaceholder: true }}
					name={name}
					placeholder={placeholder}
					ref={selectRef}
					options={options}
					onChange={handleOnChange}
					styles={customStyles}
					isSearchable={false}
					isError={error && true}
				/>
			</SelectContainerStyled>
			{error && <ErrorMessage textAlign="left">{error.message}</ErrorMessage>}
		</ErrorContainer>
	);
};

export default SelectCustom;
