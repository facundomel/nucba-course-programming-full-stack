import styled from "styled-components";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GoBook } from "react-icons/go";

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
