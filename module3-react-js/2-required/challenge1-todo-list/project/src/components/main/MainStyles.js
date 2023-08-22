import styled from "styled-components";

export const MainContainerStyled = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 500px;
	gap: 1.5rem;
	margin: 100px 0;

	@media (max-width: 600px) {
		width: 80vw;
		min-width: 250px;
	}
`;
