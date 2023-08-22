import styled from "styled-components";

export const ThemeContainerStyled = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.background};
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	padding: 10px;
	width: 100%;
`;

export const ThemeButtonStyled = styled.button`
	margin: 0 5px;
	padding: 10px;
	font-size: 0.5rem;
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: 5px;
	width: 20px;
	height: 20px;
	cursor: pointer;
	&:hover {
		box-shadow: 2px 2px 2px ${({ theme }) => theme.colors.border};
	}
`;
