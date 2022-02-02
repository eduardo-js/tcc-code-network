import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import { DefaultButton } from '..';
import { NavIcon } from '../navBar/style';
import {
  FooterContainer,
  FooterLink,
  FooterLinkItems,
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinkTitle,
  FooterSubHeading,
  FooterSubscription,
  FooterSubText,
  Form,
  FormInput,
  SocialIconLink,
  SocialIcons,
  SocialLogo,
  SocialMedia,
  SocialMediaWrap,
  WebsiteRights,
} from './style';

interface FooterProps {
  bigFont?: boolean;
}

export const Footer = ({ bigFont = true }: FooterProps) => {
  return (
    <FooterContainer>
      <FooterSubscription>
        <FooterSubHeading>
          Se junte a maior plataforma de crescimento tecnologico do Brasil! Cadastre-se e receba nossas ofertas!
        </FooterSubHeading>
        <FooterSubText>Pode descadastrar a qualquer momento.</FooterSubText>
        <Form>
          <FormInput name="email" type="email" placeholder="Digite seu e-mail" />
          <DefaultButton bigFont>Cadastrar</DefaultButton>
        </Form>
      </FooterSubscription>
      <FooterLinksContainer>
        <FooterLinksWrapper>
          <FooterLinkItems>
            <FooterLinkTitle>Institucional</FooterLinkTitle>
            <FooterLink to="/sign-up">Como funciona?</FooterLink>
            <FooterLink to="/">Casos de sucesso</FooterLink>
            <FooterLink to="/">Carreira</FooterLink>
            <FooterLink to="/">Investidores</FooterLink>
            <FooterLink to="/">Termos de Serviço</FooterLink>
          </FooterLinkItems>
          <FooterLinkItems>
            <FooterLinkTitle>Fale conosco</FooterLinkTitle>
            <FooterLink to="/">Contato</FooterLink>
            <FooterLink to="/">Suporte</FooterLink>
            <FooterLink to="/">Destinatários</FooterLink>
            <FooterLink to="/">Patrocinadores</FooterLink>
          </FooterLinkItems>
        </FooterLinksWrapper>
        <FooterLinksWrapper>
          <FooterLinkItems>
            <FooterLinkTitle>Videos</FooterLinkTitle>
            <FooterLink to="/">Envie seu Video</FooterLink>
            <FooterLink to="/">Embaixadores</FooterLink>
            <FooterLink to="/">Agência</FooterLink>
            <FooterLink to="/">Influenciadores</FooterLink>
          </FooterLinkItems>
          <FooterLinkItems>
            <FooterLinkTitle>Mídia Social</FooterLinkTitle>
            <FooterLink to="/">Instagram</FooterLink>
            <FooterLink to="/">Facebook</FooterLink>
            <FooterLink to="/">Youtube</FooterLink>
            <FooterLink to="/">Twitter</FooterLink>
          </FooterLinkItems>
        </FooterLinksWrapper>
      </FooterLinksContainer>
      <SocialMedia>
        <SocialMediaWrap>
          <SocialLogo to="/">
            <NavIcon />
            CodeNetwork
          </SocialLogo>
          <WebsiteRights>Code Network © {new Date().getFullYear()}</WebsiteRights>
          <SocialIcons>
            <SocialIconLink href="/" target="_blank" aria-label="Facebook">
              <FaFacebook />
            </SocialIconLink>
            <SocialIconLink href="/" target="_blank" aria-label="Instagram">
              <FaInstagram />
            </SocialIconLink>
            <SocialIconLink href={''} rel="noopener noreferrer" target="_blank" aria-label="Youtube">
              <FaYoutube />
            </SocialIconLink>
            <SocialIconLink href="/" target="_blank" aria-label="Twitter">
              <FaTwitter />
            </SocialIconLink>
            <SocialIconLink href="/" target="_blank" aria-label="LinkedIn">
              <FaLinkedin />
            </SocialIconLink>
          </SocialIcons>
        </SocialMediaWrap>
      </SocialMedia>
    </FooterContainer>
  );
};
