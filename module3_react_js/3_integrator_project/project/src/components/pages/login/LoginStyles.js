import styled from "styled-components";
import { Form as FormikForm } from "formik";
import { Link } from "react-router-dom";

export const LoginContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	text-align: center;
	gap: 20px;
	width: 80%;
`;

export const Form = styled(FormikForm)`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 2rem;
	gap: 20px;
  
  @media (max-width: 400px) {
    width: 80%;
    min-width: 200px;
  }
`;

export const LoginEmailAndPasswordStyled = styled(Link)`
	text-decoration: none;

	p {
		margin: 0;
		color: var(--orange);

		:hover {
			text-decoration: underline;
			transition: all 0.25s ease-out;
		}
	}
`;
