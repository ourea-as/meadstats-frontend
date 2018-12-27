import { Button, Col, Progress } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export const Profile = ({
  user,
  updating,
  updateUser,
  count,
  total,
  exist,
  isAuthenticated
}) => (
  <div className="row profile bg-dark">
    {exist ? (
      <Col xs="10" className="profile-data">
        <img
          className="profile-pic"
          src={user.avatar}
          alt={`${user.user_name}`}
        />
        <div>
          <span className="profile-name">{user.user_name}</span>
          <span className="profile-extra">{user.total_beers} Unique Beers</span>
        </div>
      </Col>
    ) : (
      <Col xs="10" className="profile-data">
        <img
          className="profile-pic"
          alt="No user"
          src={
            'https://gravatar.com/avatar/dda81c541d804f53148efea3b4eec136?size=100&d=https%3A%2F%2Funtappd.akamaized.net%2Fsite%2Fassets%2Fimages%2Fdefault_avatar_v3_gravatar.jpg%3Fv%3D2'
          }
        />
        <div>
          <span className="profile-name">
            <b>{user.user_name}</b>
          </span>
          <span className="profile-extra profile-extra-error text-danger">
            Does not exist in database. Please refresh.
          </span>
        </div>
      </Col>
    )}
    {isAuthenticated ? (
      <Update
        count={count}
        total={total}
        updating={updating}
        updateUser={updateUser}
      />
    ) : (
      ''
    )}
  </div>
);

export const Update = ({ count, total, updating, updateUser }) => (
  <Col xs="2">
    {total > 0 ? (
      <UpdateProgress count={count} total={total} />
    ) : (
      <UpdateButton updating={updating} updateUser={updateUser} />
    )}
  </Col>
);

const UpdateProgress = ({ count, total }) => (
  <div className="update-button">
    <Progress
      className="update-progress border border-light"
      color="light"
      value={count}
      max={total}
    />
  </div>
);

const UpdateButton = ({ updating, updateUser }) => (
  <div className="update-button">
    <Button outline color="primary" onClick={updating ? null : updateUser}>
      {updating ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Refresh'}
    </Button>
  </div>
);
