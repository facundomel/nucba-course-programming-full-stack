import styled from "styled-components";

export const CartitemStyled = styled.div`
	height: 80px;
	background-color: #3a3a3a;
	margin-top: 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 15px;

	img {
		height: 65px;
		border-radius: 5px;
	}
`;

export const DataContainerStyled = styled.div`
	display: flex;
	justify-content: space-between;
	width: 1000px;
	height: 100%;
	padding: 15px 0;
`;

export const DataContainerLeftStyled = styled.div`
	padding-left: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	p {
		font-weight: bold;
		font-size: 13px;
	}

	div {
		display: flex;
		gap: 5px;
	}

	div button {
		border: none;
		cursor: pointer;
		font-size: 12px;
		padding: 3px 5px;
		border-radius: 5px;
		font-weight: bold;
		color: #222222;
	}
`;

export const DataContainerRightStyled = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-end;

	div {
		background-color: #fb3939;
		width: 20px;
		height: 20px;
		border-radius: 999px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-weight: bold;
	}

	p {
		font-weight: bold;
	}
`;
