import styled from "styled-components";

export const FormStyled = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-width: 250px;
	gap: 20px;
`;

export const InputContainerStyled = styled.div`
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
