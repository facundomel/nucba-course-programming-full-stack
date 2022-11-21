import React from "react";
import { Card } from "../card/Card";
import { FooterStyled } from "../../styles/FooterStyles";
import { HeaderStyled } from "../../styles/HeaderStyles";
import { ThemeButtonStyled, ThemeContainerStyled } from "../../styles/ThemeSwitching";
import { light, dark, blue, green, brown, pink } from "../../styles/Themes";
import { MainStyled } from "./MainStyles";

export const Main = (props) => {
	return (
		<>
			<MainStyled>
				<HeaderStyled>Game of Thrones Quotes</HeaderStyled>

				<ThemeContainerStyled>
					<span>Themes: </span>
					<ThemeButtonStyled
						className={`light ${props.selectedTheme === light ? "active" : ""}`}
						onClick={() => props.handleThemeChange(light)}
					></ThemeButtonStyled>
					<ThemeButtonStyled
						className={`dark ${props.selectedTheme === dark ? "active" : ""}`}
						onClick={() => props.handleThemeChange(dark)}
					></ThemeButtonStyled>
					<ThemeButtonStyled
						className={`blue ${props.selectedTheme === blue ? "active" : ""}`}
						onClick={() => props.handleThemeChange(blue)}
					></ThemeButtonStyled>
					<ThemeButtonStyled
						className={`green ${props.selectedTheme === green ? "active" : ""}`}
						onClick={() => props.handleThemeChange(green)}
					></ThemeButtonStyled>
					<ThemeButtonStyled
						className={`brown ${props.selectedTheme === brown ? "active" : ""}`}
						onClick={() => props.handleThemeChange(brown)}
					></ThemeButtonStyled>
					<ThemeButtonStyled
						className={`pink ${props.selectedTheme === pink ? "active" : ""}`}
						onClick={() => props.handleThemeChange(pink)}
					></ThemeButtonStyled>
				</ThemeContainerStyled>

				<Card />

				<FooterStyled>
					<p>
						Made with love by <a href="http://bio.link/timonwa">Timonwa</a>
					</p>
				</FooterStyled>
			</MainStyled>
		</>
	);
};
