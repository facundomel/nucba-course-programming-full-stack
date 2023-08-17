import { Link } from "react-router-dom";
import styled from "styled-components";

export const ErrorCustomContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100%;

	img {
		width: ${(props) => props.width};
	}

	p {
		margin: 0;
		font-style: italic;
		margin: 0 30px;
		text-align: center;
	}

	@media (max-width: 400px) {
		img {
			width: 300px;
		}

		p {
			font-size: 14px;
		}
	}
`;

export const LinkStyled = styled(Link)`
	text-decoration: none;
	color: var(--orange2);
	margin-top: 10px;
	font-style: italic;

	@media (max-width: 400px) {
		font-size: 14px;
	}
`;
