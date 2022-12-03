import React, { useRef, useState } from 'react';
import { FormContainerStyled, MainContainerStyled } from '../../styles/MainStyles';
import { Form } from '../form/Form';

export const MainPokeAPI = () => {
  const [pokemon, setPokemon] = useState(null);

	const handleAddPokemon = (newPokemon) => {
		setPokemon(newPokemon);
	};

	const refInputPokemon = useRef(null);

	const handleFocusInputTask = () => {
		refInputPokemon.current.focus();
	};

	return (
		<>
			<MainContainerStyled>
				<FormContainerStyled>
					<Form handleAddPokemon={handleAddPokemon} pokemon={pokemon} refInputPokemon={refInputPokemon} />
					{/* <TaskList list={list} setList={setList} handleFocusInputTask={handleFocusInputTask} /> */}
				</FormContainerStyled>
			</MainContainerStyled>
		</>
	);
}
