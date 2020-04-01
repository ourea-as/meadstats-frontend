import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { API_ROOT } from '../api/api-config';
import { Col } from 'reactstrap';

import FriendsTable from './tables/friendstable';
import { ErrorBoundary } from './errorboundary';
import { User } from '../types';

type FriendsProps = {
  user: User;
};

const Friends: React.FC<FriendsProps> = (props) => {
  const { user } = props;

  const [friendsData, setFriendsData] = useState([]);

  useEffect(() => {
    if (user.userName !== '') {
      axios.get(`${API_ROOT}/v1/users/${user.userName}/friends`).then(({ data }) => {
        if (data.status === 'success') {
          setFriendsData(data.data.friends);
        }
      });
    }
  }, [user]);

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
