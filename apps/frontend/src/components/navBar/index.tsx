import { debounce } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { BiExit } from 'react-icons/bi';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../contexts/Auth';
import { UrlPaths } from '../../enums';
import { DefaultButton } from '../global';
import {
  BrandName,
  MobileIcon,
  Nav,
  NavBarContainer,
  NavBtnLink,
  NavIcon,
  NavItem,
  NavItemBtn,
  NavLink,
  NavLogo,
  NavMenu,
} from './style';

export const NavigationBar = () => {
  const { user, Logout } = useAuth();

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    window.innerWidth <= 960 ? setButton(false) : setButton(true);
  };

  const resizeEvent = () => window.addEventListener('resize', showButton);

  const debouncedEventHandler = useMemo(() => debounce(resizeEvent, 300), [resizeEvent]);

  useEffect(() => {
    debouncedEventHandler();
  }, [resizeEvent, debouncedEventHandler]);

  return (
    <Nav>
      <NavBarContainer>
        <NavLogo to="/">
          <NavIcon />
          <BrandName>Code Network</BrandName>
        </NavLogo>
        <MobileIcon onClick={handleClick}>{click ? <FaTimes /> : <FaBars />}</MobileIcon>
        <NavMenu click={click} onclick={handleClick}>
          <NavItem>
            <NavLink to={UrlPaths.courses} onClick={closeMobileMenu}>
              Cursos
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={UrlPaths.jobs} onClick={closeMobileMenu}>
              Vagas
            </NavLink>
          </NavItem>
          {user ? (
            <>
              {user.permission === 1 && (
                <NavItemBtn>
                  <NavBtnLink to={UrlPaths.createCourse}>
                    {/* <DefaultButton onClick={() => Logout()}> Criar Curso </DefaultButton> */}
                    <DefaultButton> Criar Curso </DefaultButton>
                  </NavBtnLink>
                </NavItemBtn>
              )}
              <NavItemBtn>
                <NavBtnLink to={UrlPaths.user}>{user.name}</NavBtnLink>
              </NavItemBtn>
              <NavItemBtn>
                <NavBtnLink to={UrlPaths.home}>
                  <DefaultButton onClick={() => Logout()}>
                    {' '}
                    <BiExit />{' '}
                  </DefaultButton>
                </NavBtnLink>
              </NavItemBtn>
            </>
          ) : (
            <>
              <NavItemBtn>
                <NavBtnLink to={UrlPaths.login}>
                  {button ? (
                    <DefaultButton primary bigFont>
                      {' '}
                      LOGIN{' '}
                    </DefaultButton>
                  ) : (
                    <DefaultButton onClick={closeMobileMenu} bigFont primary>
                      {' '}
                      LOGIN{' '}
                    </DefaultButton>
                  )}
                </NavBtnLink>
              </NavItemBtn>
              <NavItemBtn>
                <NavBtnLink to={UrlPaths.register}>
                  {button ? (
                    <DefaultButton primary bigFont>
                      {' '}
                      CADASTRO{' '}
                    </DefaultButton>
                  ) : (
                    <DefaultButton onClick={closeMobileMenu} bigFont primary>
                      {' '}
                      CADASTRO{' '}
                    </DefaultButton>
                  )}
                </NavBtnLink>
              </NavItemBtn>
            </>
          )}
        </NavMenu>
      </NavBarContainer>
    </Nav>
  );
};
