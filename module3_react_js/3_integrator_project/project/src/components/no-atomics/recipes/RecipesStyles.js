import styled from "styled-components";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export const RecipesContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	flex-wrap: wrap;
	gap: 20px;
`;

export const CardRecipeContainer = styled.div`
	background: var(--white);
	width: 300px;
	border-radius: 15px;
	border: 1px solid var(--black);

	img {
		width: 100%;
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
	}
`;

export const CardInformation = styled.div`
	padding: 0 1rem;

	h2 {
		font-weight: 600;
		margin: 0;
		color: var(--black);
		height: 50px;
	}

	p {
		color: var(--black);
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
`;

export const CardUserAndFavorite = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 1rem;

	svg {
		font-size: 32px;
	}
`;

export const AiOutlineStarCustom = styled(AiOutlineStar)`
	cursor: pointer;
`;

export const AiFillStarCustom = styled(AiFillStar)`
	cursor: pointer;
	color: #f7c103;
`;
