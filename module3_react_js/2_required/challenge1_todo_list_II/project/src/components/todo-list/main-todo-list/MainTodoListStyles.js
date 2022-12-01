import styled from "styled-components";

export const MainContainerStyled = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	margin: 100px 0;
`;

export const FormAndTaskListContainerStyled = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 40%;
	gap: 1.5rem;

	@media (max-width: 600px) {
		width: 80vw;
	}
`;
