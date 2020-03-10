import React from 'react';

type ErrorProps = {
  message?: string;
};

export const Error: React.FC<ErrorProps> = ({ message }) => (
  <div
    className="mx-auto mt-4 mb-4"
    style={{
      color: 'red',
      textAlign: 'center',
      fontWeight: 400,
      fontSize: '1.5em',
    }}
  >
    <span>{message}</span>
  </div>
);

Error.defaultProps = {
  message: 'Something went wrong',
};
