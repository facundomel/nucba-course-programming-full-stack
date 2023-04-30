import React, { useEffect } from "react";
import {
	LeftContainer,
	LoginMenuSessionUser,
	LoginMenuSessionUserContainer,
	NavbarContainer,
	NavbarExtendedContainer,
	NavbarInnerContainer,
	NavbarLinkContainer,
	NavbarLinkExtended,
	NavbarLinkLogo,
	NavbarLinkRight,
	OpenLinksButton,
	RightContainer,
} from "./NavbarStyles";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { ImBook, ImExit } from "react-icons/im";
import logo from "../../../assets/images/logo/logo.png";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../redux/user/UserActions.js";
import { useLocation, useNavigate } from "react-router-dom";

export const Navbar = ({ extendNavbar, setExtendNavbar }) => {
	const { currentUser, isOpenLoginMenuSessionUser } = useSelector((state) => state.user);
	const { recipesAll, recipeSection } = useSelector((state) => state.recipes);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const handlerUserCloseSession = () => {
		dispatch(userActions.removeCurrentUser());
		isOpenLoginMenuSessionUser && dispatch(userActions.openLoginMenuSessionUser());
		navigate("/");
	};

	return (
		<>
			<NavbarContainer extendNavbar={extendNavbar}>
				<NavbarInnerContainer>
					<LeftContainer>
						<NavbarLinkContainer extendNavbar={extendNavbar}>
							<NavbarLinkLogo
								to={"/"}
								onClick={() => {
									isOpenLoginMenuSessionUser && dispatch(userActions.openLoginMenuSessionUser());
									recipeSection == "Home" && window.scrollTo(0, 0);
								}}
							>
								<img src={logo} alt="Logo" className="logo" />
							</NavbarLinkLogo>
							<OpenLinksButton
								onClick={() => {
									setExtendNavbar((curr) => !curr);
									isOpenLoginMenuSessionUser && dispatch(userActions.openLoginMenuSessionUser());
								}}
								extendNavbar={extendNavbar}
							>
								{extendNavbar ? <>&#10005;</> : <> &#8801;</>}
							</OpenLinksButton>
						</NavbarLinkContainer>
					</LeftContainer>

					<RightContainer>
						<NavbarLinkContainer extendNavbar={extendNavbar}>
							<NavbarLinkRight
								to={"/"}
								hidden={true}
								className={({ isActive }) => (isActive ? "active" : "")}
								onClick={() => isOpenLoginMenuSessionUser && dispatch(userActions.openLoginMenuSessionUser())}
							>
								<FaHome />
							</NavbarLinkRight>
							{currentUser && (
								<NavbarLinkRight
									to={"/mis-recetas"}
									hidden={true}
									onClick={() => isOpenLoginMenuSessionUser && dispatch(userActions.openLoginMenuSessionUser())}
								>
									<ImBook />
								</NavbarLinkRight>
							)}
							{!currentUser ? (
								location.pathname == "/login" || location.pathname == "/recuperar-password" ? (
									<NavbarLinkRight>
										<FaUserAlt />
									</NavbarLinkRight>
								) : (
									<NavbarLinkRight to={"/registro"} onClick={() => extendNavbar && setExtendNavbar((curr) => !curr)}>
										<FaUserAlt />
									</NavbarLinkRight>
								)
							) : (
								<>
									<LoginMenuSessionUserContainer
										onClick={() => {
											dispatch(userActions.openLoginMenuSessionUser());
											extendNavbar && setExtendNavbar((curr) => !curr);
										}}
									>
										<FaUserAlt>{isOpenLoginMenuSessionUser ? <>&#10005;</> : <> &#8801;</>}</FaUserAlt>
									</LoginMenuSessionUserContainer>
									<LoginMenuSessionUser isOpenLoginMenuSessionUser={isOpenLoginMenuSessionUser} onClick={() => handlerUserCloseSession()}>
										<span>Cerrar Sesión</span>
										<ImExit />
									</LoginMenuSessionUser>
								</>
							)}
						</NavbarLinkContainer>
					</RightContainer>
				</NavbarInnerContainer>

				{extendNavbar && (
					<NavbarExtendedContainer>
						<NavbarLinkExtended to="/" onClick={() => setExtendNavbar(false)}>
							<p>Inicio</p>
						</NavbarLinkExtended>
						{currentUser && (
							<NavbarLinkExtended to={"/mis-recetas"} onClick={() => setExtendNavbar(false)}>
								<p>Mis recetas</p>
							</NavbarLinkExtended>
						)}
					</NavbarExtendedContainer>
				)}
			</NavbarContainer>
		</>
	);
};
