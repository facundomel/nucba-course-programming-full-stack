import styled from "styled-components";
import { Link } from "react-router-dom";

export const UserContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	text-align: center;
	gap: 20px;
	width: 80%;
`;

export const UserForm = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 2rem;
	gap: 20px;
	width: 300px;

	@media (max-width: 400px) {
		width: 80%;
		min-width: 200px;
	}
`;

export const UserLink = styled(Link)`
	text-decoration: none;
	font-style: italic;

	small {
		margin: 0;
		color: var(--orange2);

		:hover {
			text-decoration: underline;
			transition: all 0.25s ease-out;
		}
	}
`;

export const ErrorContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: ${(props) => (props.isGap ? "10px" : "none")};
`;

export const ErrorMessage = styled.small`
	color: var(--red);
	text-align: ${(props) => props.textAlign};
	margin-left: 10px;
	font-style: italic;
`;

export const InformationPasswordForgotPasswordContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 10px;
	font-style: italic;
`;

export const PasswordForgotPasswordContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	font-style: italic;
	width: 100%;

	p {
		padding: 0;
		margin: 0;
		font-weight: bold;
	}

	input {
		width: 100%;
		background: transparent;
		border: none;
		margin-left: 10px;
		color: var(--white);
		border-bottom: 1px var(--white) solid;
	}
`;

export const InputPasswordAndIconShowAndHideContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	position: relative;
	width: 100%;
`;

export const IconShowAndHidePasswordContainer = styled.button`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	top: 1rem;
	position: ${(props) => (props.position === "absolute" ? "absolute" : "")};
	right: 0.8rem;
	font-size: 1.3rem;
	color: var(--white);
	cursor: ${(props) => (props.valuePassword ? "pointer" : "not-allowed")};
	background-color: transparent;
	border: none;
	padding: 0;
	opacity: ${(props) => (!props.valuePassword ? "40%" : "")};
`;
