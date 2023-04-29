import React from "react";
import { FooterContainerStyled, FooterDivisorStyled, FooterSectionFinalStyled, FooterTitleStyled } from "./FooterStyles";
import logo from "../../../assets/images/logo/logo.png";
import { GrMail } from "react-icons/gr";
import { RiWhatsappFill } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../redux/user/UserActions.js";

export const Footer = () => {
	const { isOpenLoginMenuSessionUser } = useSelector((state) => state.user);
	const { recipeSection } = useSelector((state) => state.recipes);
	const dispatch = useDispatch();

	return (
		<>
			<FooterContainerStyled>
				<FooterTitleStyled>
					<NavLink
						to={"/"}
						onClick={() => {
							isOpenLoginMenuSessionUser && dispatch(userActions.openLoginMenuSessionUser());
							recipeSection == "Home" && window.scrollTo(0, 0);
						}}
					>
						<img src={logo} alt="Logo" title="Inicio" />
					</NavLink>
					<p>Las mejores recetas</p>
				</FooterTitleStyled>

				<FooterDivisorStyled />

				<FooterSectionFinalStyled>
					<p>Copyright © 2022 - Creado por Facundo Melgar - Todos los derechos reservados</p>
					<div>
						<Link to={"mailto:facundo.melgarr@gmail.com"} title="Email" target="_blank">
							<GrMail className="email-contact" />
						</Link>
						<Link to={"https://www.linkedin.com/in/facu-melgar/"} title="LinkedIn" target="_blank">
							<FaLinkedin className="linkedin-contact" />
						</Link>
						<Link to={"https://api.whatsapp.com/send?phone=5493456543830"} title="WhatsApp" target="_blank">
							<RiWhatsappFill className="whatsapp-contact" />
						</Link>
					</div>
				</FooterSectionFinalStyled>
			</FooterContainerStyled>
		</>
	);
};
