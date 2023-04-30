import { Alert } from "@mui/material";
import styled from "styled-components";

export const AlertStyled = styled(Alert)`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: 400px;
	min-width: 200px;
	background-color: ${(props) => (props.severity == "success" ? "var(--green-light)" : "var(--yellow-light)")} !important;
	color: ${(props) => (props.severity == "success" ? "var(--green-dark)" : "var(--yellow-dark)")} !important;
	margin: 0 1rem;

	svg {
		color: ${(props) => (props.severity == "success" ? "var(--green-dark)" : "var(--yellow-dark)")} !important;
	}
`;
