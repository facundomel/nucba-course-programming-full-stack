import React, { useContext } from "react";
import { PokeAPIContext } from "../../../contexts/PokeAPIContext";
import { FormContainerStyled, MainContainerStyled } from "../../shared/styles/MainStyles";
import { CardPokemon } from "../card/CardPokemon";
import { Form } from "../form/Form";

export const MainPokeAPI = () => {
	const { pokemon } = useContext(PokeAPIContext);

	return (
		<>
			<MainContainerStyled>
				<FormContainerStyled>
					<Form />
					{pokemon && <CardPokemon pokemon={pokemon} />}
				</FormContainerStyled>
			</MainContainerStyled>
		</>
	);
};
