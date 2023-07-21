import { Alert } from "@mui/material";
import styled from "styled-components";

interface AlertStyledProps {
	severity: string;
}

export const AlertStyled = styled(Alert)<AlertStyledProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: 400px;
	min-width: 200px;
	background-color: ${(props) =>
		props.severity == "success"
			? "var(--green-light)"
			: props.severity == "warning"
			? "var(--yellow-light)"
			: props.severity == "error"
			? "var(--red-light)"
			: "var(--blue-light)"} !important;
	color: ${(props) =>
		props.severity == "success"
			? "var(--green-dark)"
			: props.severity == "warning"
			? "var(--yellow-dark)"
			: props.severity == "error"
			? "var(--red-dark)"
			: "var(--blue-dark)"} !important;
	margin: 0 1rem;

	svg {
		color: ${(props) =>
			props.severity == "success"
				? "var(--green-dark)"
				: props.severity == "warning"
				? "var(--yellow-dark)"
				: props.severity == "error"
				? "var(--red-dark)"
				: "var(--blue-dark)"} !important;
	}
`;
