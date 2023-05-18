import styled from "styled-components";

export const HeroContainerStyled = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	margin-bottom: 40px;

	h1 {
		margin-bottom: 2rem;
		text-align: center;
		color: var(--white);
	}
`;

export const HeroFormStyled = styled.form`
	display: flex;
	gap: 20px;
	position: relative;
	align-items: center;
`;

export const HeroSearchBarStyled = styled.input`
	background-color: var(--gray-bg);
	outline: none;
	border: none;
	border-radius: 15px;
	padding: 0.5rem 2.3rem;
	color: var(--white);
`;

export const IconWrapperStyled = styled.div`
	position: absolute;
	padding: 0.4rem 0.5rem;
	font-size: 1.1rem;
	color: var(--white);
`;
