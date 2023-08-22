import styled from "styled-components";

export const CardContainerStyled = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
	width: 350px;
	margin: 0 auto;
	padding: 30px 0;
	border-radius: 20px;
	background: #282828;
	color: white;

	@media (max-width: 500px) {
		width: 100%;
	}
`;

export const IDAndBtnDeleteContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: 100%;
	font-size: 1.8rem;

	& span {
		font-weight: bold;
	}

	& .btn-delete {
		color: #cd3c30;
	}

	& .btn-delete:hover {
		cursor: pointer;
	}
`;

export const IDAndBtnDelete = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 90%;
`;

export const CardTextContentContainerStyled = styled.div`
	text-align: center;

	& h2 {
		margin: 0;
		font-weight: 700;
		font-size: 35px;
		line-height: 36px;
	}

	& h3 {
		margin: 0;
		font-weight: 400;
		font-size: 18px;
		line-height: 22px;
		margin-top: 3px;
	}
`;

export const MessageNotPokemonSavedStyled = styled.span`
	text-align: center;
	color: white;
`;
