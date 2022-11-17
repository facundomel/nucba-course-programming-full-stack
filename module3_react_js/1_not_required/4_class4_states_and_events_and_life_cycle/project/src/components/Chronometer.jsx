import React, { useEffect, useState } from "react";
import { ContainerChronometerStyled } from "./ChronometerStyles";

export const Chronometer = () => {
	const [counter, setCounter] = useState(0);

	const handlerCounter = () => {
		setCounter(counter + 1);
	};

	useEffect(() => {
		const interval = setInterval(handlerCounter, 1000);

		return () => clearInterval(interval);
	}, [counter]);

	return (
		<>
			<ContainerChronometerStyled>{counter}</ContainerChronometerStyled>
		</>
	);
};
