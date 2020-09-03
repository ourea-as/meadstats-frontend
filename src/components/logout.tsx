import React from 'react';

import { Navigate } from 'react-router-dom';

type LogoutProps = {
  logoutUser: () => void;
};

const Logout: React.FC<LogoutProps> = (props) => {
  const { logoutUser } = props;

  logoutUser();

  return <Navigate to="/" />;
};

export default Logout;
