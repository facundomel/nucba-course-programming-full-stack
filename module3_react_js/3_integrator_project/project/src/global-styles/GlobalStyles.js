import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
      --white: white;
      --brown: #c4ad85;
      --black: black;
      --black-light: #131415;
      --gray: gray;
      --blue-light: #005EBE;
      --green-light: #3CC24C;
      --red: #E73A2A;
      --red-light: #cd3c30;
      --orange-bg: #2f2618;
      --orange: #ff9d01;
      --orange-light: #bfbfbf;
      --orange2: #ffc575;
      --magenta: #FF005C;
      --gray-bg: #2b2b2c;
      --gradient: linear-gradient(83deg, #ffa100, #fb103d);
      --btn-gradient-secondary: linear-gradient(140deg, #3B3022, #3B2329);
    }

    body {
      margin: 0;
      padding: 0;
      background-color: var(--black-light);
      color: var(--white);
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
