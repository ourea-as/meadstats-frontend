import React from 'react';

import { Redirect } from 'react-router';

type LogoutProps = {
  logoutUser: () => void;
};

const Logout: React.FC<LogoutProps> = (props) => {
  const { logoutUser } = props;

  logoutUser();

  return <Redirect to="/" />;
};

export default Logout;
