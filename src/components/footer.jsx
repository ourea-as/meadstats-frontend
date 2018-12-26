import React from 'react';

import UntappdAttribution from '../assets/pbu_160_black.png';
import './footer.css';

export const Footer = () => (
  <div className="attribution">
    <hr />
    <img
      src={UntappdAttribution}
      alt="untappd attribution"
      className="attribution-image"
    />
    <span className="attribution-text">
      This website is not affiliated with Untappd.
    </span>
  </div>
);
