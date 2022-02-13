import React from 'react';
import { Form } from '../../components/form';

export const Register = () => {
  return (
    <Form
      small={false}
      lightBg={true}
      imgStart={false}
      lightTitle={false}
      errorLightBg={true}
      errorMessage={''}
      type="submit"
      lightText={false}
    />
  );
};
