import styled from "styled-components";

export const ModalContainer = styled.div`
	display: ${(props) => (props.isOpen ? "grid" : "none")};
	place-items: center;
	background-color: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 80px;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 999;
`;

export const ModalBodyAndClose = styled.div`
	margin-top: -80px;
	background-color: var(--gray-bg);
	width: ${(props) => props.widthBodyModal};
	height: ${(props) => props.heightBodyModal};
	min-height: 200px;
	border-radius: 0.5rem;
	position: relative;

	@media (max-width: ${(props) => props.pxMediaQuery}) {
		width: 90%;
		min-width: 200px;
	}
`;

export const ModalBody = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 0.5rem;
	overflow-x: hidden;
	overflow-y: ${(props) => props.componentModal === "Navbar" && "hidden"};
`;

export const ModalClose = styled.button`
	position: absolute;
	top: 0;
	right: ${(props) => (props.componentModal === "Navbar" ? "0" : "10px")};
	font-size: 1.4rem;
	background-color: transparent;
	border: none;
	cursor: pointer;
	padding: 0.3rem;
	color: var(--white);
	background: var(--gradient);
	border-top-right-radius: ${(props) => (props.componentModal === "Navbar" ? "0.5rem" : "0.3")};
	border-bottom-left-radius: 0.2rem;

	@media (max-width: 600px) {
		font-size: 1.2rem;
	}
`;
