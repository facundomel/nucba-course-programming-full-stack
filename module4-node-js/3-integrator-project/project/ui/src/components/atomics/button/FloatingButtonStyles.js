import { motion } from "framer-motion";
import { styled } from "@mui/system";
import { Fab } from "@mui/material";

export const FloatinButtonStyled = styled(motion(Fab))`
	position: fixed;
	bottom: 20px;
	right: 10px;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: var(--white);
	color: var(--black);
	font-size: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	cursor: pointer;
	padding: 0;
	margin: 0;

	@media (max-width: 600px) {
		width: 40px;
		height: 40px;
	}
`;
