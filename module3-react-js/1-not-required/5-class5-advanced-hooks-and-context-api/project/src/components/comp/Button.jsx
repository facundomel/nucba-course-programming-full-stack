import { ButtonStyled } from "../styles/MenuStyles";

export const Button = ({ open, setOpen }) => {
	return (
		<>
			<ButtonStyled open={open} onClick={() => setOpen(!open)}>
				<div />
				<div />
				<div />
			</ButtonStyled>
		</>
	);
};
