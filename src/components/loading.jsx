import React from 'react';

export const Loading = () => (
  <div className="mx-auto mt-4 mb-4" style={{ width: '2rem' }}>
    <div className="spinner-grow" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);
