import styled from "styled-components";

export const FormContainerStyled = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 500px;
	gap: 1.5rem;

	@media (max-width: 600px) {
		width: 80vw;
	}
`;

export const FormStyled = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	gap: 20px;
`;

export const InputAndErrorMessageContainerStyled = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	& small {
		color: red;
		width: 100%;
	}
`;

export const InputAndIconContainerStyled = styled.div`
	display: flex;
	width: 100%;

	& input {
		display: flex;
		background-color: #3b3b3b;
		outline: none;
		border: none;
		border-radius: 0px 8px 8px 0px;
		width: 100%;
		color: white;
		padding-left: 5px;
		font-size: 18px;
	}

	& ::placeholder {
		color: #808080;
	}

	& .icon-search {
		width: 34px;
		background-color: #3b3b3b;
		border-radius: 8px 0px 0px 8px;
		padding: 0.8rem;
		border: none;
	}
`;
