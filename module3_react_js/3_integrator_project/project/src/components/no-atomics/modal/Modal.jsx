import { useEffect, useRef } from "react";
import { ModalBody, ModalBodyAndClose, ModalClose, ModalContainer } from "./ModalStyles";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ isOpen, onClose, children }) => {
	const modalBodyRef = useRef();

	useEffect(() => {
		if (isOpen) {
			modalBodyRef.current?.scrollTo(0, 0);
			const close = (e) => {
				if (e.keyCode === 27) {
					onClose();
					document.removeEventListener("keyup", close);
				}
			};
			document.addEventListener("keyup", close);
		}
	}, [isOpen]);

	return (
		<ModalContainer isOpen={isOpen}>
			<ModalBodyAndClose>
				<ModalClose onClick={onClose}>
					<AiOutlineClose />
				</ModalClose>
				<ModalBody ref={modalBodyRef}>{children}</ModalBody>
			</ModalBodyAndClose>
		</ModalContainer>
	);
};

export default Modal;
