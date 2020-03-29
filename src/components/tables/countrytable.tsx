import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { Progress } from 'reactstrap';

import Flagicon from '../flagicon';

import './table.css';

const countryFormatter = (cell, row): ReactElement => {
  return (
    <span className="table-flex">
      <Flagicon code={row.code.toLowerCase()} size="lg" className="country-table-flag" />
      {row.name}
    </span>
  );
};

const ratingFormatter = (cell): ReactElement => {
  if (cell === 0) {
    return <span>No rating</span>;
  }
  return (
    <Progress value={cell} max={5} color="dark">
      {cell.toFixed(2)}
    </Progress>
  );
};

const columns = [
  {
    dataField: 'count',
    text: 'Count',
    sort: true,
  },
  {
    dataField: 'name',
    text: 'Country',
    sort: true,
    formatter: countryFormatter,
  },
  {
    dataField: 'average_rating',
    text: 'Average Rating',
    sort: true,
    formatter: ratingFormatter,
  },
];

const defaultSorted = [
  {
    dataField: 'count',
    order: 'desc',
  },
];

type CountryTableProps = {
  countries: any;
};

const CountryTable: React.FC<CountryTableProps> = (props) => {
  const { countries } = props;

  const history = useHistory();

  const rowEvents = {
    onClick: (e, row) => {
      history.push('map/' + row.code);
    },
  };

  return (
    <BootstrapTable
      bootstrap4
      bordered={false}
      keyField="name"
      data={countries}
      columns={columns}
      defaultSorted={defaultSorted}
      rowEvents={rowEvents}
      wrapperClasses="table-responsive"
    />
  );
};

export default CountryTable;
