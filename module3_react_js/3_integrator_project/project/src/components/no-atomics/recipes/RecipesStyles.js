import styled from "styled-components";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export const RecipesContainer = styled.div`
	display: grid;
	place-items: center;
	justify-content: center;
	grid-template-columns: repeat(auto-fit, 300px);
	width: 100%;
	height: 100%;
	flex-wrap: wrap;
	gap: 50px;
`;

export const MessageNotExistRecipes = styled.h2`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-style: italic;
	color: var(--gray);
	width: 100%;
`;

export const CardRecipeContainer = styled.div`
	display: ${(props) => (props.hiddenCard ? "none" : "")};
	background: var(--gray-bg);
	width: 300px;
	border-radius: 15px;
	border: 1px solid var(--black);

	img {
		width: 100%;
		height: 180px;
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
	}

	@media (max-width: 400px) {
		width: 250px;
	}
`;

export const CardInformation = styled.div`
	padding: 0 1rem;
	color: var(--brown);

	h2 {
		margin: 0;
		height: 50px;
		font-weight: normal;
		padding-bottom: 5px;
		color: var(--white);
	}

	p {
		font-size: 1.2rem;
		height: 100px;
		overflow: auto;
	}

	p::-webkit-scrollbar {
		width: 4px;
		display: flex;
	}

	.item-description::-webkit-scrollbar {
		width: 4px;
		display: flex;
	}

	@media (max-width: 400px) {
		h2 {
			height: auto;
		}
	}
`;

export const CardUserAndFavorite = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 1rem;
	font-style: italic;
	background: var(--gradient);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;

	svg {
		font-size: 32px;
	}
`;

export const AiOutlineStarCustom = styled(AiOutlineStar)`
	cursor: pointer;
	color: var(--white);
`;

export const AiFillStarCustom = styled(AiFillStar)`
	cursor: pointer;
	color: #f7c103;
`;

export const ButtonFavorite = styled.button`
	margin: 0;
	padding: 0;
	width: 32px;
	height: 32px;
	border: none;
	background-color: transparent;
`;
