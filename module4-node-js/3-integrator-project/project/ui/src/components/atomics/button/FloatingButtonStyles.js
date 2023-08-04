import { motion } from "framer-motion";
import { styled } from "@mui/system";
import { Fab } from "@mui/material";

export const FloatinButtonStyled = styled(motion(Fab))`
	position: fixed;
	bottom: 20px;
	right: 20px;
	width: 60px;
	height: 60px;
	border-radius: 50%;
	background-color: var(--blue-light);
	color: var(--blue-dark);
	font-size: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	cursor: pointer;
	padding: 0;
	margin: 0;
`;
