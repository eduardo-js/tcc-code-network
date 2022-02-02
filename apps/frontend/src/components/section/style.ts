import styled from 'styled-components';
import { Colors } from '../../enums';

interface InfoSecProps {
  lightBg: boolean;
}
export const InfoSec = styled.div<InfoSecProps>`
  color: #fff;
  padding: 160px 0;
  background: ${({ lightBg }) => (lightBg ? Colors.white : Colors.black)};
`;

interface InfoRowProps {
  imgStart: boolean;
}
export const InfoRow = styled.div<InfoRowProps>`
  display: flex;
  margin: 0 -15px -15px -15px;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: ${({ imgStart }) => (imgStart ? 'row' : 'row-reverse')};
`;

export const InfoColumn = styled.div`
  margin-bottom: 15px;
  padding-right: 15px;
  padding-left: 15px;
  flex: 1;
  max-width: 50%;
  flex-basis: 50%;
  @media screen and (max-width: 768px) {
    max-width: 100%;
    flex-basis: 100%;
    display: flex;
    justify-content: center;
  }
`;

export const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;
  padding-bottom: 60px;
  @media screen and (max-width: 768px) {
    padding-bottom: 65px;
  }
`;

interface ImgWrapperProps {
  start: boolean;
}

export const ImgWrapper = styled.div<ImgWrapperProps>`
  max-width: 555px;
  display: flex;
  justify-content: ${({ start }) => (start ? 'flex-start' : 'flex-end')};
`;

interface TopLineProps {
  lightTopLine: boolean;
}

export const TopLine = styled.div<TopLineProps>`
  color: ${({ lightTopLine }) => (lightTopLine ? Colors.white : Colors.black)};
  font-size: 18px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 1.4px;
  margin-bottom: 16px;
`;

export const Img = styled.img`
  padding-right: 0;
  border: 0;
  max-width: 100%;
  vertical-align: middle;
  display: inline-block;
  max-height: 500px;
`;

interface HeadingProps {
  lightText: boolean;
}
export const Heading = styled.h1<HeadingProps>`
  margin-bottom: 24px;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 600;
  color: ${({ lightText }) => (lightText ? Colors.white : Colors.black)};
`;

interface SubtitleProps {
  lightTextDesc: boolean;
}

export const Subtitle = styled.p<SubtitleProps>`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: ${({ lightTextDesc }) => (lightTextDesc ? Colors.white : Colors.black)};
`;
