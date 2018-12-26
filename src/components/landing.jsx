import React from 'react';

import { Jumbotron } from 'reactstrap';

export default function Landing(props) {
  return (
    <>
      <Jumbotron className="bg-dark text-white">
        <h1 className="display-3">Meadstats</h1>
        <p className="lead">Discover deeper insights about your beers</p>
      </Jumbotron>
    </>
  );
}
