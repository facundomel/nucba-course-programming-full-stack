import styled from "styled-components";

export const ButtonStyled = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${(props) => (props.disabled ? "#383838" : "linear-gradient(98.81deg, #4e8bb8 -0.82%, #bbf0ff 101.53%)")};
	outline: none;
	border: 0px solid;
	padding: 15px 40px;
	border-radius: 8px;
	color: ${(props) => (props.disabled ? "#777777" : "rgb(0, 0, 0)")};
	font-weight: 600;
	font-size: 13px;
	font-weight: 700;
	width: ${(props) => props.width};
	text-transform: uppercase;
	cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
