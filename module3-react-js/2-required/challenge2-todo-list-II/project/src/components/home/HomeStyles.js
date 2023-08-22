import styled from "styled-components";

export const HomeContainerStyled = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
`;

export const ContainerTitleAndParagraphStyled = styled.div`
	color: white;
	width: 60%;
  text-align: justify;

	& h1 {
		text-align: center;
		text-transform: uppercase;
	}

  @media (max-width:600px) {
    width: 90%;
  }
`;
