import React from 'react';

import UntappdAttribution from '../assets/untappd_logo.png';
import './footer.css';

export const Footer = (): JSX.Element => (
  <div className="attribution">
    <hr />
    <img src={UntappdAttribution} alt="untappd attribution" className="attribution-image" />
    <span className="attribution-text">This website is not affiliated with Untappd.</span>
  </div>
);
