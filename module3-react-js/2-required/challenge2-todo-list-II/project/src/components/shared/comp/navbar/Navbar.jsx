import React, { useContext } from "react";
import { PokeAPIContext } from "../../../../contexts/PokeAPIContext";
import { TodoListContext } from "../../../../contexts/TodoListContext";
import {
	ContainerLink,
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
	const { list } = useContext(TodoListContext);
	const { pokemon } = useContext(PokeAPIContext);

	return (
		<>
			<NavbarContainer extendNavbar={extendNavbar}>
				<NavbarInnerContainer>
					<LeftContainer>
						<NavbarLinkContainer extendNavbar={extendNavbar}>
							<ContainerLink backgroundColor="#191919">
								<NavbarLink to="/" className={(state) => (state.isActive ? "active" : "inactive")}>
									Inicio
								</NavbarLink>
							</ContainerLink>
							<ContainerLink backgroundColor={list.length > 0 ? "brown" : "#191919"}>
								<NavbarLink to="/todo-list" className={(state) => (state.isActive ? "active" : "inactive")}>
									Todo List
								</NavbarLink>
							</ContainerLink>
							<ContainerLink backgroundColor={pokemon ? "brown" : "#191919"}>
								<NavbarLink to="/poke-api" className={(state) => (state.isActive ? "active" : "inactive")}>
									Poke API
								</NavbarLink>
							</ContainerLink>
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
						<ContainerLink backgroundColor="#191919">
							<NavbarLinkExtended
								to="/"
								onClick={() => setExtendNavbar(false)}
								className={(state) => (state.isActive ? "active" : "inactive")}
							>
								Inicio
							</NavbarLinkExtended>
						</ContainerLink>
						<ContainerLink backgroundColor={list.length > 0 ? "brown" : "#191919"}>
							<NavbarLinkExtended
								to="/todo-list"
								onClick={() => setExtendNavbar(false)}
								className={(state) => (state.isActive ? "active" : "inactive")}
							>
								Todo List
							</NavbarLinkExtended>
						</ContainerLink>
						<ContainerLink backgroundColor={pokemon ? "brown" : "#191919"}>
							<NavbarLinkExtended
								to="/poke-api"
								onClick={() => setExtendNavbar(false)}
								className={(state) => (state.isActive ? "active" : "inactive")}
							>
								Poke API
							</NavbarLinkExtended>
						</ContainerLink>
					</NavbarExtendedContainer>
				)}
			</NavbarContainer>
		</>
	);
};
