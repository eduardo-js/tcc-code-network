import React from 'react';
import { InfoSection } from '../../components';
import { homeFirstCard, homeSecondCard, homeThirdCard } from '../../resources/home';

export const Home = () => {
  return (
    <>
      <InfoSection {...homeFirstCard} />
      <InfoSection {...homeSecondCard} />
      <InfoSection {...homeThirdCard} />
    </>
  );
};
