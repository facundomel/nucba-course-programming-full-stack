import { useEffect, useRef } from "react";
import { ModalBody, ModalBodyAndClose, ModalClose, ModalContainer } from "./ModalStyles";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ isOpen, onClose, children, heightBodyModal, widthBodyModal, pxMediaQuery, componentModal }) => {
	const modalBodyRef = useRef();

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
			modalBodyRef.current?.scrollTo(0, 0);
			document.addEventListener("keyup", closeModalWithKeyScape);
		} else {
			document.body.style.overflow = "";
		}
	}, [isOpen]);

	const closeModalWithKeyScape = (e) => {
		if (e.keyCode === 27) {
			onClose();
			document.removeEventListener("keyup", closeModalWithKeyScape);
		}
	};

	return (
		<ModalContainer isOpen={isOpen} onClick={onClose}>
			<ModalBodyAndClose heightBodyModal={heightBodyModal} widthBodyModal={widthBodyModal} pxMediaQuery={pxMediaQuery}>
				<ModalClose onClick={onClose} componentModal={componentModal}>
					<AiOutlineClose />
				</ModalClose>
				<ModalBody ref={modalBodyRef} componentModal={componentModal}>
					{children}
				</ModalBody>
			</ModalBodyAndClose>
		</ModalContainer>
	);
};

export default Modal;
