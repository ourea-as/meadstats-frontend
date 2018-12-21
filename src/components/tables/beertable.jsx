import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'reactstrap';

import './table.css';

export const BeerTable = ({ beers }) => (
  <Table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Brewery</th>
        <th>Country</th>
        <th>Style</th>
        <th>Rating</th>
      </tr>
    </thead>
    <tbody>
      {beers.map(checkin => (
        <BeerListItem key={checkin.beer.beer_id} checkin={checkin} />
      ))}
    </tbody>
  </Table>
);

BeerTable.propTypes = {
  beers: PropTypes.array
};

const BeerListItem = ({ checkin }) => (
  <tr>
    <td style={{ verticalAlign: 'middle' }}>
      <img
        className="beertable-image"
        alt="Beer Logo"
        src={checkin.beer.beer_label}
      />
      {checkin.beer.beer_name}
    </td>
    <td style={{ verticalAlign: 'middle' }}>
      <img
        className="beertable-image"
        alt="Brewery Logo"
        src={checkin.beer.brewery.brewery_label}
      />
      {checkin.beer.brewery.brewery_name}
    </td>
    <td style={{ verticalAlign: 'middle' }}>{checkin.beer.brewery.country}</td>
    <td style={{ verticalAlign: 'middle' }}>{checkin.beer.beer_style}</td>
    <td style={{ verticalAlign: 'middle' }}>
      {checkin.rating_score > 0 ? checkin.rating_score.toFixed(2) : 'No Rating'}
    </td>
  </tr>
);

BeerListItem.propTypes = {
  checkin: PropTypes.object
};
