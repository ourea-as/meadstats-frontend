import React from 'react';
import { useHistory } from 'react-router-dom';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

import './table.css';
import moment from 'moment';

const mapBeerToImage = (count: number) => {
  if (count >= 10000) return 'bdg_Uber_sm.jpg';
  if (count >= 5000) return 'bdg_Epic_sm.jpg';
  if (count >= 2500) return 'bdg_elite_sm.jpg';
  if (count >= 1000) return 'bdg_extraordinary_sm.jpg';
  if (count >= 500) return 'bdg_legendary_sm.jpg';
  if (count >= 200) return 'bdg_check200_sm.jpg';
  if (count >= 100) return 'bdg_check100_sm.jpg';
  if (count >= 50) return 'bdg_check50_sm.jpg';
  if (count >= 25) return 'bdg_check25_sm.jpg';
  return 'bdg_newbie_sm.jpg';
};

const mapBeerToName = (count: number) => {
  if (count >= 10000) return 'Uber';
  if (count >= 5000) return 'Epic';
  if (count >= 2500) return 'Elite';
  if (count >= 1000) return 'Extraordinary';
  if (count >= 500) return 'Legendary';
  if (count >= 200) return 'Master';
  if (count >= 100) return 'Artisan';
  if (count >= 50) return 'Journeyman';
  if (count >= 25) return 'Apprentice';
  return 'Newbie';
};

const nameFormatter = (cell, row) => {
  return (
    <span className="table-flex">
      <img className="table-profile-picture" src={row.avatar} alt={`${row.user_name}`} />
      <div>
        <span className="table-twoline-main">
          {row.first_name} {row.last_name}
        </span>
        <span className="table-twoline-sub">{row.user_name}</span>
      </div>
    </span>
  );
};

const beersFormatter = (cell, row) => {
  return (
    <span className="table-flex">
      <img
        className="table-profile-picture"
        src={`https://untappd.akamaized.net/badges/${mapBeerToImage(row.total_beers)}`}
        alt="Total beers badge"
      />
      <div>
        <span className="table-twoline-main">{mapBeerToName(row.total_beers)}</span>
        <span className="table-twoline-sub">{row.total_beers}</span>
      </div>
    </span>
  );
};

const updatedFormatter = (cell) => {
  if (cell === null) {
    return <span>Never</span>;
  }
  return <span>{moment.utc(cell).fromNow()}</span>;
};

const columns = [
  {
    dataField: 'user_name',
    text: 'Username',
    sort: true,
    formatter: nameFormatter,
  },
  {
    dataField: 'total_badges',
    text: 'Badges',
    sort: true,
  },
  {
    dataField: 'total_beers',
    text: 'Beers',
    sort: true,
    formatter: beersFormatter,
  },
  {
    dataField: 'total_friends',
    text: 'Friends',
    sort: true,
  },
  {
    dataField: 'last_update',
    text: 'Last Updated',
    sort: true,
    formatter: updatedFormatter,
  },
];

const defaultSorted = [
  {
    dataField: 'total_beers',
    order: 'desc',
  },
];

type FriendsTableProps = {
  friends: any;
};

const FriendsTable: React.FC<FriendsTableProps> = (props) => {
  const { friends } = props;

  const history = useHistory();

  const rowEvents = {
    onClick: (e, row) => {
      history.push('../' + row.user_name);
    },
  };

  return (
    <BootstrapTable
      bootstrap4
      bordered={false}
      keyField="id"
      data={friends}
      columns={columns}
      defaultSorted={defaultSorted}
      rowEvents={rowEvents}
      wrapperClasses="table-responsive"
    />
  );
};

export default FriendsTable;
