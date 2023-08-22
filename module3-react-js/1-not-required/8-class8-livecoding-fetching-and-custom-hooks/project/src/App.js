import { ThemeProvider } from "styled-components";
import { light } from "./components/styles/Themes";
import { useEffect, useState } from "react";
import { GlobalStyles } from "./global-styles/GlobalStyles";
import { Main } from "./components/comp/main/Main";

function App() {
	// Theme state
	const [selectedTheme, setSelectedTheme] = useState(light);

	// Function to handle user theme selection on click and save it to local storage
	const handleThemeChange = (theme) => {
		setSelectedTheme(theme);
		localStorage.setItem("current-theme", JSON.stringify(theme));
	};

	// React hook to get the theme selected by the user that is saved in local storage
	useEffect(() => {
		const currentTheme = JSON.parse(localStorage.getItem("current-theme"));
		if (currentTheme) {
			setSelectedTheme(currentTheme);
		}
	}, []);

	return (
		<>
			<ThemeProvider theme={selectedTheme}>
				<GlobalStyles />
				<Main selectedTheme={selectedTheme} handleThemeChange={handleThemeChange} />
			</ThemeProvider>
		</>
	);
}

export default App;
