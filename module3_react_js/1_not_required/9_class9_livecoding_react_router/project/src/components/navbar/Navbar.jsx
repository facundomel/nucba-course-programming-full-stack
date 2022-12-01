import React from "react";
import {
	LeftContainer,
	NavbarContainer,
	NavbarExtendedContainer,
	NavbarInnerContainer,
	NavbarLink,
	NavbarLinkContainer,
	NavbarLinkExtended,
	OpenLinksButton,
} from "./NavbarStyles";

export const Navbar = ({ extendNavbar, setExtendNavbar }) => {
	return (
		<>
			<NavbarContainer extendNavbar={extendNavbar}>
				<NavbarInnerContainer>
					<LeftContainer>
						<NavbarLinkContainer>
							<NavbarLink to="/"> Inicio </NavbarLink>
							<NavbarLink to="/productos"> Productos </NavbarLink>
							<NavbarLink to="/contacto"> Contacto </NavbarLink>
							<NavbarLink to="/sobre-nosotros"> Sobre nosotros </NavbarLink>
							<OpenLinksButton
								onClick={() => {
									setExtendNavbar((curr) => !curr);
								}}
							>
								{extendNavbar ? <>&#10005;</> : <> &#8801;</>}
							</OpenLinksButton>
						</NavbarLinkContainer>
					</LeftContainer>
				</NavbarInnerContainer>

				{extendNavbar && (
					<NavbarExtendedContainer>
						<NavbarLinkExtended to="/" onClick={() => setExtendNavbar(false)}>
							Inicio
						</NavbarLinkExtended>
						<NavbarLinkExtended to="/productos" onClick={() => setExtendNavbar(false)}>
							Productos
						</NavbarLinkExtended>
						<NavbarLinkExtended to="/contacto" onClick={() => setExtendNavbar(false)}>
							Contacto
						</NavbarLinkExtended>
						<NavbarLinkExtended to="/sobre-nosotros" onClick={() => setExtendNavbar(false)}>
							Sobre nosotros
						</NavbarLinkExtended>
					</NavbarExtendedContainer>
				)}
			</NavbarContainer>
		</>
	);
};
