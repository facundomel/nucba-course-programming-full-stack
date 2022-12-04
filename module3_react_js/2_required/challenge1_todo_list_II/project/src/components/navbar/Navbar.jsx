import React, { useContext } from "react";
import { TodoListContext } from "../../contexts/TodoListContext";
import {
	ContainerLinkTodoList,
	LeftContainer,
	NavbarContainer,
	NavbarExtendedContainer,
	NavbarInnerContainer,
	NavbarLink,
	NavbarLinkContainer,
	NavbarLinkExtended,
	OpenLinksButton,
} from "./NavbarStyles";

export const forceUpdateNavbar = () => {
	useForceUpdate();
};

export const Navbar = ({ extendNavbar, setExtendNavbar }) => {
	const { list } = useContext(TodoListContext);

	console.log(list)

	return (
		<>
			<NavbarContainer extendNavbar={extendNavbar}>
				<NavbarInnerContainer>
					<LeftContainer>
						<NavbarLinkContainer>
							<ContainerLinkTodoList quantityElementsList={list.length}>
								<NavbarLink to="/"> Inicio </NavbarLink>
							</ContainerLinkTodoList>
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
