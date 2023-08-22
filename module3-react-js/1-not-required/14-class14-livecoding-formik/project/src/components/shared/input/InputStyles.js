import styled from "styled-components";

export const InputBoxStyled = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

export const InputCheckboxStyled = styled.div`
	display: flex;
	justify-content: space-between;
	width: 275px;

	@media (max-width: 400px) {
		width: 225px;
	}
`;

export const InputLabelStyled = styled.label`
	font-size: 1rem;
	display: flex;
`;

export const InputStyled = styled.input`
	border: 1px solid;
	border-color: ${({ error }) => (error ? "var(--error)" : "var(--white)")};
	border-radius: 5px;
	padding: 10px;
	width: 250px;
	background: transparent;
	color: var(--white);
	outline: none;

	@media (max-width: 400px) {
		width: 200px;
	}
`;

export const ErrorStyled = styled.span`
	font-size: small;
	color: var(--error);
`;

export const ContainerFieldAndErrorMessage = styled.div`
	display: flex;
	flex-direction: column;
	height: 50px;
`;
