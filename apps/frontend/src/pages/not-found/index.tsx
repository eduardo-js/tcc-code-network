import React from 'react';
import { UnderConstruction } from '../../assets';
import { Container } from '../../components';
export const NotFound = () => {
  return (
    <Container style={{ height: '80vh' }}>
      <h1 style={{ textAlign: 'center', marginTop: '3%' }}>Não existe nada por aqui no momento</h1>
      <img
        style={{ display: 'block', marginRight: 'auto', marginLeft: 'auto', width: '80%', marginTop: '3%' }}
        src={UnderConstruction}
      ></img>
    </Container>
  );
};

export default NotFound;
