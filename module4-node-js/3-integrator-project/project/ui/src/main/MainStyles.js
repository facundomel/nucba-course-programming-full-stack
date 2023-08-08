import styled from "styled-components";

export const MainContainerStyled = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100vh;
	margin-top: 80px;
	background-color: ${(props) =>
		props.userSection === "RecipeAll"
			? "var(--bg-recipe-all)"
			: props.userSection === "RecipeFavorite"
			? "var(--bg-recipe-favorite)"
			: "var(--black-light)"};
`;
