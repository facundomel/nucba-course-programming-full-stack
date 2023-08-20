import React from "react";
import { ErrorContainer, ErrorMessage } from "../../pages/user/UserStyles";
import { SelectContainerStyled, customStyles } from "./SelectStyles";
import Select from "react-select";

const SelectCustom = ({ name, placeholder, selectRef, options, handleOnChange, error }) => {
	return (
		<ErrorContainer>
			<SelectContainerStyled>
				<Select
					name={name}
					placeholder={placeholder}
					ref={selectRef}
					options={options}
					noOptionsMessage={() => "No hay opciones"}
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
