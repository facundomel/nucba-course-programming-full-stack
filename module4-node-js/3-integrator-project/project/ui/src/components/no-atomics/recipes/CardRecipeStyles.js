import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GoBook } from "react-icons/go";
import styled from "styled-components";
import { RecipePageSection } from "../../../model/enum/PageSection";

export const CardRecipeContainer = styled.div`
	display: ${(props) => (props.hiddenCard ? "none" : "")};
	background: var(--gray-bg);
	width: 300px;
	border-radius: 10px;
	border: ${(props) =>
		props.pageSection === RecipePageSection.RecipeAll
			? "1px solid var(--black)"
			: props.pageSection === RecipePageSection.RecipeFavorite && "1px solid var(--yellow-light2)"};

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

	p {
		font-style: italic;
		background: var(--gradient);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	svg {
		font-size: 32px;
	}
`;

export const AiOutlineStarCustom = styled(AiOutlineStar)`
	cursor: pointer;
	color: var(--gray);

	:hover {
		color: var(--white);
	}
`;

export const AiFillStarCustom = styled(AiFillStar)`
	cursor: pointer;
	color: #f7c103;
`;

export const GoBookCustom = styled(GoBook)`
	cursor: pointer;
	color: var(--gray);

	:hover {
		color: var(--white);
	}
`;

export const ButtonIconCard = styled.button`
	margin: 0;
	padding: 0;
	width: 32px;
	height: 32px;
	border: none;
	background-color: transparent;
`;

export const IconsCardContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 10px;
`;

export const ModalBodyCardRecipeContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;

	img {
		width: 100%;
		height: 300px;
		object-fit: cover;
	}
`;

export const ModalBodyCardRecipeInformation = styled.div`
	padding: 0 3.2rem 1rem 1rem;
	font-style: italic;
	text-align: justify;
	width: 85%;

	h2 {
		display: inline-block;
		font-weight: normal;
		background: var(--gradient);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	h3 {
		margin: 0;
		font-weight: normal;
		display: inline-block;
		background: var(--gradient);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	ol {
		margin-bottom: 2rem;
	}

	@media (max-width: 400px) {
		width: 80%;
	}
`;

export const ModalBodyCardRecipePublisher = styled.small`
	display: flex;
	justify-content: flex-end;
	align-items: center;

	p {
		font-size: 14px;
		margin-top: 0;
		background: var(--gradient);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
`;

export const ImageDiv = styled.div`
	height: 180px;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}
`;
