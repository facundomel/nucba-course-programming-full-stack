import styled from "styled-components";
import { motion } from "framer-motion";

export const CategoriesContainer = styled.div`
	display: grid;
	place-items: center;
	justify-content: center;
	grid-template-columns: repeat(auto-fit, 150px);
	width: 100%;
	height: 100%;
	flex-wrap: wrap;
	gap: 30px;
	margin-bottom: 40px;
`;

export const CardCategory = styled(motion.div)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	width: 150px;
	padding: 2rem 0.5rem;
	background-color: ${({ selected }) => (selected ? "var(--orange-bg)" : "var(--gray-bg)")};
	border-radius: 15px;
	cursor: pointer;

	h2 {
		font-size: 1rem;
		color: var(--white);
	}

	:first-child {
		img {
			padding-top: 7px;
			padding-bottom: 7px;
		}
	}
`;

export const BorderDecoration = styled.div`
	height: 5px;
	width: 30%;
	background: var(--btn-gradient);
	border-radius: 15px;
`;
