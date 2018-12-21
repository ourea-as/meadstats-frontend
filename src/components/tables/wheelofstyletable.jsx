import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import {
  faCircle as faSolidCircle,
  faCaretDown,
  faCaretUp
} from '@fortawesome/free-solid-svg-icons';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { Progress } from 'reactstrap';

import { BeerTable } from './beertable';

import './table.css';

function ratingFormatter(cell) {
  if (cell === 0) {
    return <span>No rating</span>;
  }
  return (
    <Progress value={cell} max={5} color="dark">
      {cell.toFixed(2)}
    </Progress>
  );
}

function countFormatter(cell) {
  return (
    <span>
      {' '}
      {[...Array(5)].map((x, i) =>
        i >= cell ? (
          <FontAwesomeIcon icon={faCircle} />
        ) : (
          <FontAwesomeIcon icon={faSolidCircle} />
        )
      )}
    </span>
  );
}

const columns = [
  {
    dataField: 'count',
    text: 'Count',
    sort: true,
    align: 'center',
    headerAlign: 'center',
    formatter: countFormatter
  },
  {
    dataField: 'name',
    text: 'Style',
    sort: true
  },
  {
    dataField: 'average_rating',
    text: 'Average Rating',
    sort: true,
    formatter: ratingFormatter
  }
];

const expandRow = {
  renderer: row =>
    row.beers.length > 0 ? (
      <div>
        <BeerTable beers={row.beers} />
      </div>
    ) : (
      <div>No Beers</div>
    ),
  showExpandColumn: true,
  expandColumnRenderer: ({ expanded }) =>
    expanded ? (
      <FontAwesomeIcon icon={faCaretUp} />
    ) : (
      <FontAwesomeIcon icon={faCaretDown} />
    ),
  expandHeaderColumnRenderer: () => ''
};

export const WheelOfStyleTable = ({ styles }) => (
  <BootstrapTable
    bootstrap4
    bordered={false}
    keyField="name"
    data={styles}
    columns={columns}
    expandRow={expandRow}
  />
);

WheelOfStyleTable.propTypes = {
  styles: PropTypes.array
};
