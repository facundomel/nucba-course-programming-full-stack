import styled from "styled-components";

export const SpinnerCustomContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: ${(props) => (props.gap ? props.gap : "20px")};
	height: ${(props) => (props.height ? props.height : "200px")};

	& svg {
		color: ${(props) => (props.color ? props.color : "var(--orange3)")};
	}
`;
