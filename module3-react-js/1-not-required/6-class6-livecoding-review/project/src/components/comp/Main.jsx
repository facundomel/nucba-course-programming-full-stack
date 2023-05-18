import React, { useReducer } from "react";
import { Button } from "./Button";
import { Menu } from "./Menu";
import { reducer } from "../reducer/Reducer";

export const Main = () => {
	const [open, dispatch] = useReducer(reducer, false);

	return (
		<>
			<Button open={open} dispatch={dispatch} />
			<Menu open={open} />
		</>
	);
};
