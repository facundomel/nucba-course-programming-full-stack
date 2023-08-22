import styled from "styled-components";
import { RecipePageSection } from "../../model/enum/PageSection";

export const MainContainerStyled = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100vh;
	margin-top: 80px;
	background-color: ${(props) =>
		props.pageSection === RecipePageSection.RecipeAll
			? "var(--bg-recipe-all)"
			: props.pageSection === RecipePageSection.RecipeFavorite
			? "var(--bg-recipe-favorite)"
			: "var(--bg-body)"};
`;
