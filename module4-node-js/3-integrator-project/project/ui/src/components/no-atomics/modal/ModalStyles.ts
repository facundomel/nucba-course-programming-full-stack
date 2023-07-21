import styled from "styled-components";

interface ModalContainerProps {
	isOpen: boolean;
}

interface ModalBodyAndCloseProps {
	widthBodyModal: string;
	heightBodyModal: string;
	pxMediaQuery: string;
}

export const ModalContainer = styled.div<ModalContainerProps>`
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

export const ModalBodyAndClose = styled.div<ModalBodyAndCloseProps>`
	margin-top: -80px;
	background-color: var(--gray-bg);
	width: ${(props) => props.widthBodyModal};
	height: ${(props) => props.heightBodyModal};
	min-height: 200px;
	border-radius: 1rem;
	position: relative;

	@media (max-width: ${(props: ModalBodyAndCloseProps) => props.pxMediaQuery}) {
		width: 90%;
		min-width: 200px;
	}
`;

export const ModalBody = styled.div`
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	border-radius: 1rem;
`;

export const ModalClose = styled.button`
	position: absolute;
	top: 0;
	right: 0;
	margin: 0;
	font-size: 1.5rem;
	background-color: transparent;
	border: none;
	cursor: pointer;
	padding: 0.5rem;
	color: var(--white);
	background-color: var(--black);
	border-bottom-left-radius: 0.5rem;
	border-top-right-radius: 0.5rem;
`;
