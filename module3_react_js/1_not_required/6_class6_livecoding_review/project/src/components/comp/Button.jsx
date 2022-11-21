import { TYPES } from "../reducer/ActionTypes";
import { ButtonStyled } from "../styles/MenuStyles";

export const Button = ({ open, dispatch }) => {
	return (
		<>
			<ButtonStyled open={open} onClick={() => dispatch({ type: TYPES.CLICK_BUTTON_MENU })}>
				<div />
				<div />
				<div />
			</ButtonStyled>
		</>
	);
};
