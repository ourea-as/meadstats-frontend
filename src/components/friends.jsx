import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { API_ROOT } from '../api/api-config';
import { Col } from 'reactstrap';

import FriendsTable from './friendstable';
import { ErrorBoundary } from './errorboundary';

export default function Friends(props) {
  const [friendsData, setFriendsData] = useState([]);

  useEffect(
    () => {
      if (props.username !== '') {
        axios
          .get(`${API_ROOT}/v1/users/${props.username}/friends`)
          .then(({ data }) => {
            console.log(data);
            if (data.status === 'success') {
              setFriendsData(data.data.friends);
            }
          });
      }
    },
    [props.username]
  );

  return (
    <>
      <Col xs="12">
        <ErrorBoundary>
          <FriendsTable friends={friendsData} />
        </ErrorBoundary>
      </Col>
    </>
  );
}
