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
							<NavbarLink to="/poke-api"> Poke API </NavbarLink>
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
						<NavbarLinkExtended to="/poke-api" onClick={() => setExtendNavbar(false)}>
							Poke API
						</NavbarLinkExtended>
					</NavbarExtendedContainer>
				)}
			</NavbarContainer>
		</>
	);
};
