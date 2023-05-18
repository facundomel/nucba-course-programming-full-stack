import styled from "styled-components";
import { Form } from "formik";

export const FormStyled = styled(Form)`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	column-gap: 30px;
	row-gap: 25px;
	color: white;

	@media (max-width: 700px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

export const FormBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	max-width: 580px;
	border-left: 1px solid var(--white);
	border-right: 1px solid var(--white);
	padding: 0 20px;
	margin: 0 auto;
`;

export const FormTitle = styled.h2`
	align-self: center;
	text-align: center;
	font-size: 2rem;
	margin: 0;
	color: white;
`;

export const FormSubtitle = styled.p`
	align-self: center;
	text-align: center;
	font-size: 1.2rem;
	max-width: 100%;
	color: white;
`;

export const CheckboxMotorcycleExperienceStyled = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
`;
