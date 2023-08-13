import styled from "styled-components";

export const FooterContainerStyled = styled.footer`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	background-color: black;
	color: var(--white);
	width: 100%;
	bottom: 0;
	height: 250px;
	flex-wrap: wrap;
	font-style: italic;
	text-align: center;
	margin-top: 6%;

	svg {
		font-size: 32px;
	}

	.email-contact:hover {
		color: var(--red-light);
	}

	.linkedin-contact:hover {
		color: var(--blue-light);
	}

	.whatsapp-contact:hover {
		color: var(--green-light);
	}
`;

export const FooterTitleStyled = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 70px;
	margin: 0 2% 0 2%;

	img {
		width: 50px;
	}

	img:hover {
		border-radius: 100px;
		background-color: var(--white);
	}

	p {
		font-size: 2em;
		margin: 0;
		padding: 1.5% 2%;
	}
`;

export const FooterDivisorStyled = styled.span`
	margin: 2%;
	border: 1px solid var(--gray);
`;

export const FooterSectionFinalStyled = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	margin: 0;
	padding: 10px 80px;

	p {
		margin: 0;
	}

	div {
		display: flex;
		justify-content: space-between;
		width: 20%;
	}

	div a {
		height: 32px;
		color: var(--white);
	}

	@media (max-width: 900px) {
		justify-content: center;

		p {
			margin: 0;
			padding-bottom: 10px;
		}

		div {
			width: 40%;
		}
	}

	@media (max-width: 600px) {
		padding-right: 65px;
		padding-left: 65px;

		div {
			width: 60%;
		}
	}

	@media (max-width: 400px) {
		div {
			width: 100%;
		}
	}
`;
