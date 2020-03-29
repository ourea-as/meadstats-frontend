import { Button, Col, Progress } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { User } from '../types';

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

function getDaysAgo(date) {
  const updatedate = Date.parse(date);
  const datenow = Date.now();

  return Math.floor((datenow - updatedate) / _MS_PER_DAY);
}

interface ProfileProps {
  user: User;
  updating: boolean;
  updateUser: Function;
  count: number;
  total: number;
  exist: boolean;
  isAuthenticated: boolean;
}

export const Profile: React.FunctionComponent<ProfileProps> = (props) => {
  const { user, updating, updateUser, count, total, exist, isAuthenticated } = props;

  return (
    <div className="row profile bg-dark">
      {exist ? (
        <Col lg="10" xs="8" className="profile-data">
          <img className="profile-pic" src={user.avatar} alt={`${user.userName}`} />
          <div>
            <span className="profile-name">{user.userName}</span>
            <span className="profile-extra">{user.totalBeers} Unique Beers</span>
          </div>
        </Col>
      ) : (
        <Col lg="10" xs="8" className="profile-data">
          <img
            className="profile-pic"
            alt="No user"
            src={
              'https://gravatar.com/avatar/dda81c541d804f53148efea3b4eec136?size=100&d=https%3A%2F%2Funtappd.akamaized.net%2Fsite%2Fassets%2Fimages%2Fdefault_avatar_v3_gravatar.jpg%3Fv%3D2'
            }
          />
          <div>
            <span className="profile-name">{user.userName}</span>
          </div>
        </Col>
      )}
      {isAuthenticated ? (
        <Update
          count={count}
          total={total}
          lastUpdateDays={getDaysAgo(user.lastUpdate)}
          updating={updating}
          updateUser={updateUser}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export const Update = ({ count, total, updating, updateUser, lastUpdateDays }) => (
  <Col lg="2" xs="4">
    {total > 0 ? (
      <UpdateProgress count={count} total={total} />
    ) : (
      <UpdateButton updating={updating} updateUser={updateUser} lastUpdateDays={lastUpdateDays} />
    )}
  </Col>
);

const UpdateProgress = ({ count, total }) => (
  <div className="update-button">
    <Progress className="update-progress border border-light" color="light" value={count} max={total} />
  </div>
);

const UpdateButton = ({ updating, updateUser, lastUpdateDays }) => (
  <div className="update-button">
    <div>
      <Button color="secondary" onClick={updating ? null : updateUser}>
        {updating ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Refresh'}
      </Button>
      {lastUpdateDays > 1 && <span className="update-text">Updated {lastUpdateDays} days ago</span>}
    </div>
  </div>
);
