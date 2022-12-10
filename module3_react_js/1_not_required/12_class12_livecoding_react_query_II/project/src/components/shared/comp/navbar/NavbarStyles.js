import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavbarContainer = styled.nav`
	width: 100%;
	height: ${(props) => (props.extendNavbar ? "100vh" : "80px")};
	background-color: black;
	display: flex;
	flex-direction: column;

	@media (min-width: 600px) {
		height: 80px;
	}
`;

export const LeftContainer = styled.div`
	flex: 70%;
	display: flex;
	align-items: center;
	padding-left: 5%;
`;

export const RightContainer = styled.div`
	flex: 30%;
	display: flex;
	justify-content: flex-end;
	padding-right: 50px;
`;

export const NavbarInnerContainer = styled.div`
	width: 100%;
	height: 80px;
	display: flex;
`;

export const NavbarLinkContainer = styled.div`
	display: flex;
	gap: 40px;

	@media (max-width: 600px) {
		gap: 0px;
	}
`;

export const NavbarLink = styled(NavLink)`
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font-size: larger;
	font-family: Arial, Helvetica, sans-serif;
	text-decoration: none;
	font-weight: bold;
	height: 70px;
	width: 100px;

	&.active {
		border: 2px white solid;
	}

	@media (max-width: 600px) {
		display: none;
	}
`;

export const ContainerLink = styled.div`
	background-color: ${(props) => props.backgroundColor};
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

	&.active {
		border: 2px white solid;
	}
`;

export const OpenLinksButton = styled.button`
	height: 50px;
	background: none;
	border: none;
	color: white;
	font-size: 45px;
	cursor: pointer;

	@media (min-width: 600px) {
		display: none;
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
