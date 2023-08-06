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
      --orange2: #ffc575;
      --orange3: #ffa100;
      --orange4: #ffd2a0;
      --magenta: #FF005C;
      --gray-bg: #2b2b2c;
      --green-light: rgb(113, 255, 113);
      --red-light: rgb(255, 113, 113);
      --yellow-light: rgb(255, 255, 113);
      --blue-light: rgb(112, 147, 255);
      --green-dark: #017200;
      --yellow-dark: #707000;
      --blue-dark: #001c8c;
      --red-dark: #8c0000;
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
    html{
      scroll-behavior: smooth;
    }
    
    ::-webkit-scrollbar {
      display: none;
    }

    *::-webkit-scrollbar-thumb {
      background-color: var(--black);
      border-radius: 20px;
    }
`;
export default GlobalStyles;
