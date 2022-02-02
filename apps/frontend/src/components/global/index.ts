import styled, { createGlobalStyle } from 'styled-components';
import { Colors } from '../../enums';
export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Lato, sans-serif;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 50px;
  padding-left: 50px;
  z-index: 1;
  @media screen and (max-width: 991px) {
    padding-right: 30px;
    padding-left: 30px;
  }
`;

export interface ButtonProps {
  primary?: boolean;
  big?: boolean;
  bigFont?: boolean;
  type?: string;
}
export const DefaultButton = styled.button<ButtonProps>`
  background: ${({ primary }) => (primary ? Colors.primary : Colors.black)};
  border-radius: 4px;
  border: none;
  color: ${Colors.white};
  cursor: pointer;
  font-size: 1rem;
  outline: none;
  padding: ${({ big }) => (big ? '12px 64px' : '10px 10px')};
  white-space: nowrap;
  &:hover {
    background: ${({ primary }) => (primary ? Colors.black : Colors.primary)};
    transition: all 0.3s ease-out;
  }
  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;
