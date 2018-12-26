import React from 'react';

import FlagIcon from './flagicon';

import './countrystats.css';

export default function CountryStats(props) {
  const { data } = props;

  return (
    <>
      <div className="country-name-container">
        <FlagIcon code={data.code} size="2x" />{' '}
        <span className="country-name">{data.name}</span>
      </div>
    </>
  );
}
