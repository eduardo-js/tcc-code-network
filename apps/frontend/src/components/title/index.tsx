import React from 'react';
import { TitleStyle } from './style';

interface TitleProps {
  title: string;
}
export const TitleComponent = ({ title }: TitleProps) => <TitleStyle>{title}</TitleStyle>;
