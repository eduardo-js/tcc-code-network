import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Colors } from '../../enums';

interface FormSectionProps {
  lightBg: boolean;
}

export const FormSection = styled.div<FormSectionProps>`
  color: ${Colors.primary};
  padding: 160px 0;
  background: ${({ lightBg }) => (lightBg ? Colors.white : Colors.black)};
`;

interface FormTitleProps {
  lightTitle: boolean;
}

export const FormTitle = styled.h1<FormTitleProps>`
  margin-bottom: 24px;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 600;
  color: ${({ lightTitle }) => (lightTitle ? Colors.white : Colors.black)};
`;

export const FormContainer = styled.div`
  display: flex;
`;

interface FormColumnProps {
  small: boolean;
}
export const FormColumn = styled.div<FormColumnProps>`
  margin-bottom: 15px;
  padding-right: 15px;
  padding-left: 15px;
  padding: ${({ small }) => (small ? '0 50px' : '0 15px')};
  flex: 1;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    max-width: 100% !important;
    flex-basis: 100%;
    justify-content: center;
    align-items: center;
  }
  img {
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`;

export const FormRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 -15px -15px -15px;
  flex-wrap: wrap;
  align-items: center;
`;

interface FormWrapperProps {
  lightText: boolean;
}
export const FormWrapper = styled.form<FormWrapperProps>`
  max-width: 540px;
  padding-top: 0;
  width: 100%;
  > button {
    width: 100%;
    height: 50px;
    margin-top: 1rem;
    background: linear-gradient(90deg, ${Colors.white} 0%, ${Colors.primary} 100%);
    outline: none;
    border: none;
    color: ${({ lightText }) => (lightText ? Colors.white : Colors.black)};
    font-size: 1rem;
  }
`;

interface FormMessageProps {
  hasError?: boolean;
  errorLightBg: boolean;
}
export const FormMessage = styled(motion.div)<FormMessageProps>`
  color: ${({ hasError }) => (hasError ? 'red' : 'green')};
  background-color: ${({ errorLightBg }) => (errorLightBg ? Colors.white : Colors.black)};
  padding: 5px;
  text-align: center;
  margin-top: 1rem;
`;

export const FormInputRow = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: stretch;
  margin-bottom: 0.7rem;
  > p {
    font-size: 0.8rem;
    margin-top: 0.5rem;
    color: #f00e0e;
  }
`;
export const FormInput = styled.input`
  display: block;
  padding-left: 10px;
  outline: none;
  border-radius: 2px;
  height: 40px;
  width: 100%;
  border: none;
  font-size: 1rem;
`;

export const FormLabel = styled.label`
  display: inline-block;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
  color: #fff;
`;

export const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;
  /* padding-bottom: 40px; */
  @media screen and (max-width: 768px) {
    padding-bottom: 65px;
    > h1,
    p {
      text-align: center;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  > img {
    width: 300px;
    margin-left: -3px;
  }
`;

interface ImgWrapperProps {
  imgStart: boolean;
}

export const ImgWrapper = styled(motion.div)<ImgWrapperProps>`
  display: flex;
  justify-content: ${({ imgStart }) => (imgStart ? 'flex-start' : 'flex-end')};
  max-height: 600px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const TopLine = styled(motion.div)`
  font-size: 18px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 1.4px;
  margin-bottom: 1.3rem;
`;

export const Box = styled.span`
  background: #fefefe;
  padding: 10px;
  border-radius: 50px;
  color: black;
  > span {
    background: ${Colors.black};
    padding: 5px 15px;
    border-radius: 50px;
    color: ${Colors.white};
    margin-right: 0.6rem;
  }
`;

export const Img = styled(motion.img)`
  padding-right: 0;
  border: 0;
  max-width: 100%;
  vertical-align: middle;
  display: inline-block;
  object-fit: cover;
  max-height: 700px;
`;

interface HeadingProps {
  lightText: string;
}
export const Heading = styled(motion.h2)<HeadingProps>`
  margin-bottom: 24px;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 600;
  color: ${({ lightText }) => (lightText ? Colors.white : Colors.black)};
`;

interface SubTitleProps {
  lightText: string;
}

export const Subtitle = styled(motion.p)<SubTitleProps>`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: ${({ lightText }) => (lightText ? Colors.white : Colors.black)};
`;
