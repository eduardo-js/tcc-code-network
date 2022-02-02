import React from 'react';
import { LoginComponent } from './Login';

export const Login = () => {
  return (
    <LoginComponent
      small={false}
      lightBg={true}
      imgStart={false}
      lightTitle={false}
      errorLightBg={false}
      errorMessage={''}
      type="submit"
      lightText={false}
    />
  );
};
