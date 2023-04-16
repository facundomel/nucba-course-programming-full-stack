import styled from "styled-components";
import { Form as FormikForm } from "formik";
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

export const ShowPassword = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 10px;
	font-style: italic;

	p {
		padding: 0;
		margin: 0;
		font-weight: bold;
	}
`;
