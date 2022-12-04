import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
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

	//assigning location variable
	const location = useLocation();
	//destructuring pathname from location
	const { pathname } = location;
	//Javascript split method to get the name of the path in array
	const splitLocation = pathname.split("/");

	console.log(splitLocation);

	return (
		<>
			<NavbarContainer extendNavbar={extendNavbar}>
				<NavbarInnerContainer>
					<LeftContainer>
						<NavbarLinkContainer>
							<ContainerLink backgroundColor={list.length > 0 ? "brown" : "#191919"}>
								<NavbarLink to="/todo-list" className={splitLocation[1] == "todo-list" ? "active" : ""}>
									Todo List
								</NavbarLink>
							</ContainerLink>
							<ContainerLink backgroundColor={pokemon ? "brown" : "#191919"}>
								<NavbarLink to="/poke-api" className={splitLocation[1] == "poke-api" ? "active" : ""}>
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
						{list.length}
						<NavbarLinkExtended to="/" onClick={() => setExtendNavbar(false)} className={splitLocation[1] == "todo-list" ? "active" : ""}>
							Todo List
						</NavbarLinkExtended>
						<NavbarLinkExtended
							to="/poke-api"
							onClick={() => setExtendNavbar(false)}
							className={splitLocation[1] == "poke-api" ? "active" : ""}
						>
							Poke API
						</NavbarLinkExtended>
					</NavbarExtendedContainer>
				)}
			</NavbarContainer>
		</>
	);
};
