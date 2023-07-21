import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

interface StyledLinkProps {
	radius: string;
}

export const ContainerLinkStyled = styled(motion.div)``;

export const StyledLink = styled(Link)<StyledLinkProps>`
	padding: 0.8rem 1.5rem;
	outline: none;
	border: none;
	border-radius: ${({ radius }) => `${radius}px`};
	background: var(--gradient);
	text-transform: uppercase;
	font-weight: 400;
	cursor: pointer;
	z-index: 2;

	& span {
		font-weight: 700;
		font-size: 1rem;
		background: var(--gradient);
		background-clip: text;
		-webkit-background-clip: text;
		color: white;
	}
`;
