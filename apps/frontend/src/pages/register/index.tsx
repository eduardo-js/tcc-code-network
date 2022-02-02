import React from 'react';
import { Form } from '../../components/form';

export const Register = () => {
  return (
    <Form
      small={false}
      lightBg={false}
      imgStart={false}
      lightTitle={true}
      errorLightBg={false}
      errorMessage={''}
      type="submit"
      lightText={false}
    />
  );
};
