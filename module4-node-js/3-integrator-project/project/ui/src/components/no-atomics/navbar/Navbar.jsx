import React, { useEffect, useState } from "react";
import {
	LeftContainer,
	LoginMenuCloseSessionUserOverlay,
	LoginMenuSessionUser,
	LoginMenuSessionUserContainer,
	ModalBodyCloseSessionButtons,
	ModalBodyCloseSessionContainer,
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
import * as snackbarActions from "../../../redux/snackbar/SnackbarActions.js";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../modal/Modal";
import Button from "../../atomics/button/Button";
import { AiOutlineCheck } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

const Navbar = ({ extendNavbar, setExtendNavbar }) => {
	const { currentUser, isOpenMenuSessionUser, userSection } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		const scroll = () => {
			dispatch(userActions.openOrCloseMenuSessionUser());
			window.removeEventListener("scroll", scroll);
		};
		if (isOpenMenuSessionUser) {
			window.addEventListener("scroll", scroll);
		}
		return () => {
			window.removeEventListener("scroll", scroll);
		};
	}, [isOpenMenuSessionUser]);

	const handlerUserAcceptCloseSession = () => {
		dispatch(userActions.removeCurrentUser());
		setOpenModal(false);
		navigate("/recetas/1");
		dispatch(
			snackbarActions.setOptionsSnackbar({
				open: true,
				severity: "info",
				message: `¡Vuelva pronto!`,
				autoHideDuration: 2500,
			})
		);
	};

	const handlerUserCancelCloseSession = () => {
		setOpenModal(false);
	};

	// Función para verificar si la ubicación actual coincide con "/recetas/"
	const isRecipesAllPage = () => location.pathname.startsWith("/recetas/");

	// Función para verificar si la ubicación actual coincide con "/recetas-favoritas/"
	const isRecipesFavoritePage = () => location.pathname.startsWith("/recetas-favoritas/");

	return (
		<>
			<NavbarContainer extendNavbar={extendNavbar}>
				<NavbarInnerContainer>
					<LeftContainer>
						<NavbarLinkContainer extendNavbar={extendNavbar}>
							<NavbarLinkLogo
								to={"/recetas/1"}
								onClick={() => {
									isOpenMenuSessionUser && dispatch(userActions.openOrCloseMenuSessionUser());
									userSection === "RecipeAll" && window.scrollTo(0, 0);
								}}
							>
								<img src={logo} alt="Logo" className="logo" />
							</NavbarLinkLogo>
							<OpenLinksButton
								onClick={() => {
									setExtendNavbar((curr) => !curr);
									isOpenMenuSessionUser && dispatch(userActions.openOrCloseMenuSessionUser());
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
								to={"/recetas/1"}
								hidden={true}
								className={isRecipesAllPage() ? "active" : ""}
								onClick={() => isOpenMenuSessionUser && dispatch(userActions.openOrCloseMenuSessionUser())}
							>
								<FaHome />
							</NavbarLinkRight>
							{currentUser && (
								<NavbarLinkRight
									to={"/recetas-favoritas/1"}
									hidden={true}
									className={isRecipesFavoritePage() ? "active" : ""}
									onClick={() => isOpenMenuSessionUser && dispatch(userActions.openOrCloseMenuSessionUser())}
								>
									<ImBook />
								</NavbarLinkRight>
							)}
							{!currentUser ? (
								location.pathname === "/login" || location.pathname === "/recuperar-password" ? (
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
											dispatch(userActions.openOrCloseMenuSessionUser());
											extendNavbar && setExtendNavbar((curr) => !curr);
										}}
									>
										<FaUserAlt>{isOpenMenuSessionUser ? <>&#10005;</> : <> &#8801;</>}</FaUserAlt>
									</LoginMenuSessionUserContainer>
									<LoginMenuSessionUser
										isOpenMenuSessionUser={isOpenMenuSessionUser}
										onClick={() => {
											setOpenModal(true);
											isOpenMenuSessionUser && dispatch(userActions.openOrCloseMenuSessionUser());
										}}
									>
										<span>Cerrar Sesión</span>
										<ImExit />
									</LoginMenuSessionUser>

									{isOpenMenuSessionUser && <LoginMenuCloseSessionUserOverlay />}
								</>
							)}
						</NavbarLinkContainer>
					</RightContainer>
				</NavbarInnerContainer>

				{extendNavbar && (
					<NavbarExtendedContainer>
						<NavbarLinkExtended to="/recetas/1" onClick={() => setExtendNavbar(false)}>
							<p>Inicio</p>
						</NavbarLinkExtended>
						{currentUser && (
							<NavbarLinkExtended to={"/recetas-favoritas/1"} onClick={() => setExtendNavbar(false)}>
								<p>Mis recetas</p>
							</NavbarLinkExtended>
						)}
					</NavbarExtendedContainer>
				)}
			</NavbarContainer>

			<Modal isOpen={openModal} onClose={() => setOpenModal(false)} heightBodyModal={"20%"} widthBodyModal={"500px"} pxMediaQuery={"600px"}>
				<ModalBodyCloseSessionContainer>
					<h3>¿Está seguro que desea cerrar sessión?</h3>

					<ModalBodyCloseSessionButtons>
						<Button width={"150px"} onClick={() => handlerUserCancelCloseSession()}>
							Cancelar
						</Button>
						<Button width={"150px"} onClick={() => handlerUserAcceptCloseSession()}>
							Aceptar
						</Button>
						<Button onClick={() => handlerUserCancelCloseSession()}>
							<IoMdClose />
						</Button>
						<Button onClick={() => handlerUserAcceptCloseSession()}>
							<AiOutlineCheck />
						</Button>
					</ModalBodyCloseSessionButtons>
				</ModalBodyCloseSessionContainer>
			</Modal>
		</>
	);
};

export default Navbar;
