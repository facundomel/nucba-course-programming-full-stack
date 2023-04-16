import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavbarContainer = styled.nav`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: ${(props) => (props.extendNavbar ? "100vh" : "80px")};
	background-color: black;
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

export const LoginMenuSessionUserContainer = styled(NavLink)`
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

export const LoginMenuSessionUser = styled.nav`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	position: absolute;
	top: 80px;
	right: 0;
	padding: 40px;
	font-size: 20px;
	font-weight: bold;
	border: 2px solid var(--black);
	background: var(--black);
	color: var(--white);
	z-index: 2;
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
	transform: ${(props) => (!props.isOpenLoginMenuSessionUser ? "translate(200%)" : "translate(0%)")};
	transition: ${(props) =>
		!props.isOpenLoginMenuSessionUser ? "all 0.3s cubic-bezier(0.92, 0.01, 0.35, 0.99)" : "all 0.3s cubic-bezier(0.92, 0.01, 0.35, 0.99)"};
	overflow: auto;
	cursor: pointer;

	svg {
		font-size: 30px;
	}

	:hover {
		color: black;
		background-color: white;
	}
`;