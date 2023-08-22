import styled from "styled-components";

export const FooterStyled = styled.footer`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.footer};
	color: ${({ theme }) => theme.colors.background};
	padding: 40px 20px;
	text-align: center;
	width: 100%;

	a {
		color: ${({ theme }) => theme.colors.background};
	}
`;
