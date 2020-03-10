import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { API_ROOT } from '../api/api-config';
import { Col } from 'reactstrap';

import FriendsTable from './tables/friendstable';
import { ErrorBoundary } from './errorboundary';

type FriendsProps = {
  username: string;
};

const Friends: React.FC<FriendsProps> = ({ username }) => {
  const [friendsData, setFriendsData] = useState([]);

  useEffect(() => {
    if (username !== '') {
      axios.get(`${API_ROOT}/v1/users/${username}/friends`).then(({ data }) => {
        if (data.status === 'success') {
          setFriendsData(data.data.friends);
        }
      });
    }
  }, [username]);

  return (
    <>
      <Col xs="12">
        <ErrorBoundary>
          <FriendsTable friends={friendsData} />
        </ErrorBoundary>
      </Col>
    </>
  );
};

export default Friends;
