import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ButtonStyled = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  outline: none;
  border: none;
  border-radius: 10px;
  background: var(--gradient);
  color: white;
  text-transform: uppercase;
  font-weight: 400;
  cursor: pointer;
  width: ${(props) => props.width};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
