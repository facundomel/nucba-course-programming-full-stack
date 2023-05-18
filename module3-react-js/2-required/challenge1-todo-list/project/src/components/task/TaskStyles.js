import styled from "styled-components";

export const TaskContainerStyled = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background: #282828;
	color: rgb(226, 226, 226);
	border-radius: 8px;
	width: 100%;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

	& span {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		width: 100%;
		font-size: 18px;
	}

	& .btn-delete {
		margin: 10px;
		font-size: 30px;
		color: #cd3c30;
	}

	& .btn-delete:hover {
		cursor: pointer;
	}
`;
