import styled from "styled-components";

export const InputContainerStyled = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const InputStyled = styled.input`
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
