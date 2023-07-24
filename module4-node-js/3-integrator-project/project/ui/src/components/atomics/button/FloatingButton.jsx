import { Box, Fab } from "@mui/material";
import { FloatinButtonStyled } from "./FloatingButtonStyles";
import AddIcon from "@mui/icons-material/Add";

const FloatingButton = ({ onClick }) => {
	return (
		<>
			<Box sx={{ "& > :not(style)": { m: 1 } }}>
				<FloatinButtonStyled color="primary" aria-label="add" onClick={onClick}>
					<AddIcon />
				</FloatinButtonStyled>
			</Box>
		</>
	);
};

export default FloatingButton;
