import styled from "styled-components";
import { motion } from "framer-motion";

export const CategoriesGridContainer = styled.div`
	display: grid;
	place-items: center;
	justify-content: center;
	grid-template-columns: repeat(auto-fit, 150px);
	width: 100%;
	height: 100%;
	flex-wrap: wrap;
	gap: 50px;
	margin-bottom: 40px;

	@media (max-width: 400px) {
		display: none;
	}
`;

export const CardCategory = styled(motion.div)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 150px;
	padding: 1rem 0;
	background-color: ${({ selected }) => (selected ? "var(--orange-bg)" : "var(--gray-bg)")};
	border-radius: 15px;
	cursor: pointer;

	h2 {
		font-size: 1rem;
		font-weight: normal;
	}

	img {
		width: 100px;
		height: 70px;
		border-radius: 15px;
	}
`;

export const BorderDecoration = styled.div`
	height: 5px;
	width: 30%;
	background: var(--gradient);
	border-radius: 15px;
`;
