import styled from "styled-components";

export const CardContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
  margin: 0 auto;
  padding: 30px 25px;
  padding-bottom: 15px;
  border-radius: 50px;
  background: #B6D2FF;
  box-shadow: 10px 10px 25px rgba(174, 174, 192, 0.4);

  & span {
    font-size: 1.8rem;
    font-weight: bold;
  }
`;

export const CardTextContentContainerStyled = styled.div`
  text-align: center;

  & h2 {
    margin: 0;
    font-weight: 700;
    font-size: 35px;
    line-height: 36px;
  }

  & h3 {
    margin: 0;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    margin-top: 3px;
  }
`;

export const CardStatusContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const CardTypeContainerStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & p {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #686868;
  }
`;
