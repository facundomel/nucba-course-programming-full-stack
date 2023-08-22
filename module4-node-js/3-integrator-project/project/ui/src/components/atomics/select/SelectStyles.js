import styled from "styled-components";

export const SelectContainerStyled = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const SelectStyled = styled.select`
	padding: 1rem ${(props) => (props.paddingRight ? props.paddingRight : "2rem")} 1rem 2rem;
	color: white;
	background-color: var(--gray-bg);
	border-radius: 15px;
	border: ${({ isError }) => (isError ? "1px solid var(--red)" : "none")};
	outline: none;
	caret-color: white;
	font-size: 14px;

	::placeholder {
		opacity: 40%;
	}

	-webkit-text-fill-color: white;

	:-webkit-autofill,
	:-webkit-autofill:hover,
	:-webkit-autofill:focus {
		-webkit-box-shadow: 0 0 0px 1000px var(--gray-bg) inset;
	}
`;

export const SelectOptionStyled = styled.option`
	padding: 1rem ${(props) => (props.paddingRight ? props.paddingRight : "2rem")} 1rem 2rem;
	color: white;
	background-color: var(--gray-bg);
	border-radius: 15px;
	border: ${({ isError }) => (isError ? "1px solid var(--red)" : "none")};
	outline: none;
	caret-color: white;
	font-size: 14px;

	::placeholder {
		opacity: 40%;
	}

	-webkit-text-fill-color: white;

	:-webkit-autofill,
	:-webkit-autofill:hover,
	:-webkit-autofill:focus {
		-webkit-box-shadow: 0 0 0px 1000px var(--gray-bg) inset;
	}
`;

export const customStyles = {
	control: (provided, state) => ({
		...provided,
		padding: "0.4rem 0.5rem 0.4rem 1.5rem",
		color: "var(--gray)",
		backgroundColor: "var(--gray-bg)",
		borderRadius: "15px",
		outline: "none",
		fontSize: "15px",
		cursor: "pointer",
		textAlign: "left",
		border: state.selectProps.isError ? "1px solid var(--red)" : "none",
		boxShadow: state.isFocused ? "0 0 3px var(--blue)" : "none",
	}),

	option: (provided) => ({
		...provided,
		color: "var(--black)",
		padding: 10,
		cursor: "pointer",
	}),

	singleValue: (provided, state) => ({
		...provided,
		color: "var(--white)",
	}),
};
