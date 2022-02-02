import React from 'react';
import { Link } from 'react-router-dom';
import { Container, DefaultButton } from '../global';
import { Heading, Img, ImgWrapper, InfoColumn, InfoRow, InfoSec, Subtitle, TextWrapper, TopLine } from './style';

export interface InfoSectionProps {
  alt: string;
  buttonLabel: string;
  description: string;
  headline: string;
  img: string;
  imgStart?: boolean;
  lightBg?: boolean;
  lightText?: boolean;
  lightTextDesc?: boolean;
  lightTopLine?: boolean;
  primary?: boolean;
  start?: boolean;
  topLine?: string;
  redirect?: string | Record<string, any>;
  onClick?(): void | Promise<void>;
}

export const InfoSection = ({
  alt,
  buttonLabel,
  description,
  headline,
  img,
  imgStart = false,
  lightBg = true,
  lightText = false,
  lightTextDesc = false,
  lightTopLine = true,
  primary = true,
  start = true,
  topLine,
  redirect,
  onClick,
}: InfoSectionProps) => {
  return (
    <InfoSec lightBg={lightBg}>
      <Container>
        <InfoRow imgStart={imgStart}>
          <InfoColumn>
            <TextWrapper>
              <TopLine lightTopLine={lightTopLine}>{topLine}</TopLine>
              <Heading lightText={lightText}>{headline}</Heading>
              <Subtitle lightTextDesc={lightTextDesc}>{description}</Subtitle>
              {redirect ? (
                <Link to={redirect} onClick={onClick}>
                  <DefaultButton big primary={primary}>
                    {buttonLabel}
                  </DefaultButton>
                </Link>
              ) : (
                <DefaultButton big primary={primary} onClick={onClick}>
                  {buttonLabel}
                </DefaultButton>
              )}
            </TextWrapper>
          </InfoColumn>
          <InfoColumn>
            <ImgWrapper start={start}>
              <Img src={img} alt={alt} />
            </ImgWrapper>
          </InfoColumn>
        </InfoRow>
      </Container>
    </InfoSec>
  );
};
