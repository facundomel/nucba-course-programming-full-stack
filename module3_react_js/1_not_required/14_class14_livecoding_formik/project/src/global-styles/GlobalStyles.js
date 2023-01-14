import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
      --white: #ffffff;
      --background: #191919;
      --primary: #4F46E5;
      --error: #B91C1C;
      --gray: #6B7280
  }

  body {
    margin: 0;
    padding: 0;
    background: var(--background);
    color: var(--white);
    font-family: 'Montserrat', sans-serif; 
    overflow-x: hidden;
  }
`;
export default GlobalStyles;
