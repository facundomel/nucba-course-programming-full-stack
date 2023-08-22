import styled from 'styled-components';

export const ButtonSubmitStyled = styled.button`
  background: var(--primary);
  padding: 0.8rem 1rem;
  outline: none;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  width: 100%;

  &:hover {
    background: #2f298f;
    transition: all 0.3s ease-in-out;
  }
`;
