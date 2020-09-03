import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { Progress } from 'reactstrap';

import Flagicon from '../flagicon';

import './table.css';

const getImagelink = (badge: string): string => {
  const base = 'https://untappd.akamaized.net/badges/bdg_';
  const suffix = '_sm.jpg';

  return base + badge + suffix;
};

const countryImages = {
  AT: getImagelink('TrekkingtheAlps'),
  AU: getImagelink('downUnder_lg'),
  BE: getImagelink('belgianHoliday'),
  CA: getImagelink('canada'),
  CH: getImagelink('SwissMiss'),
  CZ: getImagelink('czech'),
  DE: getImagelink('DasBoot16'),
  DK: getImagelink('DanishDelight'),
  EE: getImagelink('Estonia'),
  ES: getImagelink('spain'),
  FI: getImagelink('finnished'),
  FR: getImagelink('LaCremedelaCreme'),
  GR: getImagelink('GetToGreek'),
  IS: getImagelink('BrewLagoon'),
  IT: getImagelink('italy'),
  JP: getImagelink('RisingSun17'),
  NO: getImagelink('HereComeTheVikings'),
  NL: getImagelink('GoingDutch'),
  NZ: getImagelink('newzeland'),
  MX: getImagelink('cervMtdr'),
  SE: getImagelink('Sweden'),
  US: getImagelink('america'),
};

const mapCountryToImage = (country: string, level: number): string => {
  if (!Object.keys(countryImages).includes(country.toUpperCase())) return '';
  if (level < 1) return getImagelink('default');

  return countryImages[country.toUpperCase()];
};

const mapCountryToLevel = (country: string, count: number): number => {
  // TODO: Handle countries with shared badges
  if (!Object.keys(countryImages).includes(country.toUpperCase())) return -1;

  return Math.min(100, Math.floor(count / 5));
};

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

const countFormatter = (cell, row) => {
  const badgelevel = mapCountryToLevel(row.code, row.count);
  const badgeImage = mapCountryToImage(row.code, badgelevel);

  return (
    <span className="table-flex">
      {badgelevel === -1 ? (
        <div className="table-profile-picture-empty" />
      ) : (
        <img className="table-profile-picture-empty" src={badgeImage} alt={row.name + ' badge'} />
      )}
      <div className="table-count-container">
        <span className="table-twoline-main table-twoline-main-count">{row.count}</span>
        {badgelevel !== -1 && (
          <>
            <Progress
              value={badgelevel}
              max={100}
              color="dark"
              className="progress-half-size"
              barClassName={badgelevel >= 100 ? 'progress-bar-gold' : ''}
            ></Progress>
            <span className="table-twoline-sub table-twoline-sub-count">Level {badgelevel} / 100</span>
          </>
        )}
      </div>
    </span>
  );
};

const columns = [
  {
    dataField: 'count',
    text: 'Count',
    sort: true,
    formatter: countFormatter,
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
