import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

export const NavbarContainer = styled.nav`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: ${(props) => (props.extendNavbar ? "100vh" : "80px")};
	background-color: var(--black);
	position: fixed;
	top: 0;
	z-index: 1;
`;

export const NavbarInnerContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 95%;
	height: 80px;
`;

export const LeftContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	@media (max-width: 400px) {
		.logo {
			display: none;
		}
	}
`;

export const NavbarLinkLogo = styled(NavLink)`
	& img:hover {
		border-radius: 100px;
		background-color: white;
	}
`;

export const RightContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;

	@media (max-width: 400px) {
		.link-home {
			display: none;
		}

		.link-book {
			display: none;
		}
	}
`;

export const NavbarLinkContainer = styled.div`
	display: flex;
	gap: 40px;

	@media (max-width: 400px) {
		gap: 0;
	}
`;

export const NavbarLinkLeft = styled(NavLink)`
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	background-color: black;
	font-size: larger;
	font-family: Arial, Helvetica, sans-serif;
	text-decoration: none;
	font-weight: bold;
	height: 70px;
	width: 100px;

	&:hover {
		background-color: white;
		color: black;
	}

	@media (max-width: 400px) {
		display: none;
	}
`;

export const NavbarLinkRight = styled(NavLink)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 24px;
	color: white;
	width: 40px;
	height: 40px;
	border-radius: 100px;

	&.active {
		color: black;
		background-color: white;
	}

	&:hover {
		color: black;
		background-color: white;
	}

	@media (max-width: 400px) {
		display: ${(props) => props.hidden && "none"};
	}
`;

export const NavbarLinkExtended = styled(NavLink)`
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font-size: larger;
	font-family: Arial, Helvetica, sans-serif;
	text-decoration: none;
	font-weight: bold;
	height: 70px;
	width: 90vw;

	&:hover {
		background-color: white;
		color: black;
	}
`;

export const OpenLinksButton = styled.button`
	display: none;
	justify-content: center;
	align-items: center;
	background: none;
	border: none;
	color: white;
	font-size: ${(props) => (props.extendNavbar ? "30px" : "45px")};
	cursor: pointer;

	@media (max-width: 400px) {
		display: flex;
	}
`;

export const NavbarExtendedContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;
	gap: 10px;

	@media (min-width: 600px) {
		display: none;
	}
`;

export const IconUserContainer = styled(NavLink)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 24px;
	color: white;
	width: 40px;
	height: 40px;
	border-radius: 100px;

	:hover {
		color: black;
		background-color: white;
	}
`;

export const LoginMenuCloseSessionUserOverlay = styled.div`
	background-color: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 80px;
	left: 0;
	width: 100%;
	height: 100vh;
`;

export const MenuSessionUserContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 250px;
	gap: 10px;
	position: absolute;
	top: 80px;
	right: 0;
	padding: 30px 40px;
	font-size: 20px;
	font-weight: bold;
	border: 2px solid var(--black);
	background-color: var(--gray-bg);
	color: var(--white);
	z-index: 2;
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
	transform: ${(props) => (!props.isOpenMenuSessionUser ? "translate(200%)" : "translate(0%)")};
	transition: ${(props) =>
		!props.isOpenMenuSessionUser ? "all 0.3s cubic-bezier(0.92, 0.01, 0.35, 0.99)" : "all 0.3s cubic-bezier(0.92, 0.01, 0.35, 0.99)"};
	overflow: auto;

	@media (max-width: 400px) {
		width: 100%;
		border: none;
		padding: 50px 0;
		border-radius: 0;
	}
`;

export const MenuSessionUserName = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
`;

export const MenuSessionUserDivisor = styled.span`
	width: 100%;
	margin: 2%;
	border: 1px solid var(--gray);
`;

export const MenuSessionUserCloseSession = styled.div`
	/* display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 250px;
	gap: 10px;
	position: absolute;
	top: 80px;
	right: 0;
	padding: 40px;
	font-size: 20px;
	font-weight: bold;
	border: 2px solid var(--black);
	background-color: var(--gray-bg);
	color: var(--white);
	z-index: 2;
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
	transform: ${(props) => (!props.isOpenMenuSessionUser ? "translate(200%)" : "translate(0%)")};
	transition: ${(props) =>
		!props.isOpenMenuSessionUser ? "all 0.3s cubic-bezier(0.92, 0.01, 0.35, 0.99)" : "all 0.3s cubic-bezier(0.92, 0.01, 0.35, 0.99)"};
	overflow: auto;
	cursor: pointer; */

	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 300px;
	height: 70px;
	cursor: pointer;

	svg {
		font-size: 30px;
	}

	:hover {
		color: black;
		background-color: white;
	}
`;

export const ModalBodyCloseSessionContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	height: 100%;
	padding: 0 3rem;

	h3 {
		text-align: center;
	}
`;

export const ModalBodyCloseSessionButtons = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding-bottom: 1rem;
	gap: 10px;

	button {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	button:nth-child(3) {
		display: none;
	}

	button:nth-child(4) {
		display: none;
	}

	@media (max-width: 400px) {
		button {
			font-size: 26px;
			padding: 10px;
		}

		button:nth-child(1) {
			display: none;
		}

		button:nth-child(2) {
			display: none;
		}

		button:nth-child(3) {
			display: flex;
		}

		button:nth-child(4) {
			display: flex;
		}
	}
`;
