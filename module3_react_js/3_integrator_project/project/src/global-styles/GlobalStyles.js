import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
      --white: white;
      --black: black;
      --gray: gray;
      --blue-light: #005EBE;
      --green-light: #3CC24C;
      --red-light: #E73A2A;
      --orange-bg: #2f2618;
      --orange: #ff9d01;
      --magenta: #FF005C;
      --gray-bg: #2b2b2c;
      --btn-gradient: linear-gradient(83deg, #ffa100, #fb103d);
      --btn-gradient-secondary: linear-gradient(140deg, #3B3022, #3B2329);
    }

    html {
      margin: 0;
      padding: 0;
      background-color: var(--white);
    }

    /* Scrollbar */
    ::-webkit-scrollbar {
      display: none;
    }

    *::-webkit-scrollbar-thumb {
      background-color: var(--black);
      border-radius: 20px;
    }
`;
export default GlobalStyles;
