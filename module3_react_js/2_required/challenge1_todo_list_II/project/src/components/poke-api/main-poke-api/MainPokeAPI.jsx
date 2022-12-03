import React from 'react';
import { FormContainerStyled, MainContainerStyled } from '../../styles/MainStyles';
import { Form } from '../form/Form';

export const MainPokeAPI = () => {
	return (
		<>
			<MainContainerStyled>
				<FormContainerStyled>
					<Form />
					{/* <TaskList list={list} setList={setList} handleFocusInputTask={handleFocusInputTask} /> */}
				</FormContainerStyled>
			</MainContainerStyled>
		</>
	);
}
