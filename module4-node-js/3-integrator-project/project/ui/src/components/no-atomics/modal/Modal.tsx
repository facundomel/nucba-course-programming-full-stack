import { useEffect, useRef } from "react";
import { ModalBody, ModalBodyAndClose, ModalClose, ModalContainer } from "./ModalStyles";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	heightBodyModal: string;
	widthBodyModal: string;
	pxMediaQuery: string;
}

const Modal = ({ isOpen, onClose, children, heightBodyModal, widthBodyModal, pxMediaQuery }: ModalProps) => {
	const modalBodyRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
			modalBodyRef.current?.scrollTo(0, 0);
			const close = (e: any) => {
				if (e.keyCode === 27) {
					onClose();
					document.removeEventListener("keyup", close);
				}
			};
			document.addEventListener("keyup", close);
		} else {
			document.body.style.overflow = "";
		}
	}, [isOpen]);

	return (
		<ModalContainer isOpen={isOpen}>
			<ModalBodyAndClose heightBodyModal={heightBodyModal} widthBodyModal={widthBodyModal} pxMediaQuery={pxMediaQuery}>
				<ModalClose onClick={onClose}>
					<AiOutlineClose />
				</ModalClose>
				<ModalBody ref={modalBodyRef}>{children}</ModalBody>
			</ModalBodyAndClose>
		</ModalContainer>
	);
};

export default Modal;
