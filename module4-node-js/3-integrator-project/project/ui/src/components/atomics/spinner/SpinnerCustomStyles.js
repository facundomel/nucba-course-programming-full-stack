import styled from "styled-components";

export const SpinnerCustomContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 20px;
	height: 300px;

	& svg {
		color: var(--orange3);
	}
`;
