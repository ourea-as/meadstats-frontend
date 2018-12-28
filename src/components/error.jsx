import React from 'react';

export const Error = ({ message }) => (
  <div
    className="mx-auto mt-4 mb-4"
    style={{
      color: 'red',
      textAlign: 'center',
      fontWeight: 400,
      fontSize: '1.5em'
    }}
  >
    <span>{message ? message : 'Something went wrong'}</span>
  </div>
);
