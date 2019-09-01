import React from 'react';
import { withRouter } from 'react-router-dom';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

import './table.css';

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

function getDaysAgo(date) {
  const updatedate = Date.parse(date);
  const datenow = Date.now();

  return Math.floor((datenow - updatedate) / _MS_PER_DAY);
}

function nameFormatter(cell, row) {
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
}

function updatedFormatter(cell) {
  if (cell === null) {
    return <span>Never</span>;
  }
  return <span>{getDaysAgo(cell)} days ago</span>;
}

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

class FriendsTable extends React.Component {
  render() {
    const { friends } = this.props;

    const rowEvents = {
      onClick: (e, row) => {
        this.props.history.push('../' + row.user_name);
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
  }
}

export default withRouter(FriendsTable);
