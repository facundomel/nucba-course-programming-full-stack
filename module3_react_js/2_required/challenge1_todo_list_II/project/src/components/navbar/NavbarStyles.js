import styled from "styled-components";
import { Link } from "react-router-dom";

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
	gap: 20px;
`;

export const NavbarLink = styled(Link)`
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

	@media (max-width: 600px) {
		display: none;
	}
`;

export const ContainerLinkTodoList = styled.div`
	background-color: ${(props) => (props.quantityElementsList > 0 ? "brown" : "#191919")};
`;

export const NavbarLinkExtended = styled(Link)`
	color: white;
	font-size: x-large;
	font-family: Arial, Helvetica, sans-serif;
	text-decoration: none;
	margin: 10px;
`;

export const OpenLinksButton = styled.button`
	width: 70px;
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

	@media (min-width: 600px) {
		display: none;
	}
`;
