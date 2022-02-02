import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from '../../enums';
import { Container } from '../global';
import { Logo } from '../images';

export const Nav = styled.nav`
  align-items: center;
  background: ${Colors.primary};
  display: flex;
  font-size: 1.2rem;
  height: 80px;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 999;
`;

export const NavBarContainer = styled(Container)`
  display: flex;
  height: 80px;
  justify-content: space-between;
  ${Container}
`;

export const NavLogo = styled(Link)`
  align-items: center;
  color: ${Colors.white};
  cursor: pointer;
  display: flex;
  font-size: 2rem;
  justify-self: flex-start;
  text-decoration: none;
`;

export const NavIcon = styled(Logo)`
  margin-right: 0.5rem;
`;
export const BrandName = styled.div`
  padding-left: 15px;
`;
export const MobileIcon = styled.div`
  display: none;
  color: ${Colors.white};
  @media screen and (max-width: 960px) {
    cursor: pointer;
    display: block;
    font-size: 1.8rem;
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(-100%, 60%);
  }
`;

interface NavMenuProps {
  onclick(): void;
  click: boolean;
}

export const NavMenu = styled.ul<NavMenuProps>`
  align-items: center;
  display: flex;
  list-style: none;
  text-align: center;
  @media screen and (max-width: 960px) {
    background: ${Colors.primary};
    display: flex;
    flex-direction: column;
    height: 90vh;
    left: ${({ click }) => (click ? 0 : '-100%')};
    opacity: 1;
    position: absolute;
    top: 80px;
    transition: all 0.5s ease;
    width: 100%;
  }
`;

export const NavItem = styled.li`
  border-bottom: 2px solid transparent;
  height: 80px;
  &:hover {
    border-bottom: 2px solid ${Colors.white};
  }
  @media screen and (max-width: 960px) {
    width: 100%;
    &:hover {
      border: none;
    }
  }
`;
export const NavLink = styled(Link)`
  align-items: center;
  color: ${Colors.white};
  display: flex;
  height: 100%;
  padding: 0.5rem 1rem;
  text-decoration: none;
  @media screen and (max-width: 960px) {
    display: block;
    text-align: center;
    width: auto;
    padding: 2rem;
    &:hover {
      color: ${Colors.black};
      transition: all 0.3s ease;
    }
  }
`;

export const NavItemBtn = styled.li`
  @media screen and (max-width: 960px) {
    width: 100%;
    justify-content: center;
    height: 120px;
    display: flex;
    align-items: center;
  }
`;
export const NavBtnLink = styled(Link)`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  outline: none;
  padding: 8px 16px;
  text-decoration: none;
  width: 100%;
`;
