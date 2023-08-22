import React, { useContext } from "react";
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
						<NavbarLinkContainer extendNavbar={extendNavbar}>
							<NavbarLink to="/" className={(state) => (state.isActive ? "active" : "inactive")}>
								Inicio
							</NavbarLink>
							<NavbarLink to="/registro" className={(state) => (state.isActive ? "active" : "inactive")}>
								Registro
							</NavbarLink>
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
						<NavbarLinkExtended
							to="/"
							onClick={() => setExtendNavbar(false)}
							className={(state) => (state.isActive ? "active" : "inactive")}
						>
							Inicio
						</NavbarLinkExtended>
						<NavbarLinkExtended
							to="/registro"
							onClick={() => setExtendNavbar(false)}
							className={(state) => (state.isActive ? "active" : "inactive")}
						>
							Registro
						</NavbarLinkExtended>
					</NavbarExtendedContainer>
				)}
			</NavbarContainer>
		</>
	);
};
