import { Button, Col, Progress } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { User } from '../types';
import moment from 'moment';
import { useSpring, animated } from 'react-spring';

interface ProfileProps {
  user: User | undefined;
  updating: boolean;
  updateUser: Function;
  count: number;
  total: number;
  exist: boolean;
  isAuthenticated: boolean;
}

export const Profile: React.FunctionComponent<ProfileProps> = (props) => {
  const { user, updating, updateUser, count, total, exist, isAuthenticated } = props;

  const totalBeers = useSpring({ number: user ? user.totalBeers : 0 });

  return (
    <div className="row profile bg-dark">
      {!user || (user && exist) ? (
        <Col lg="10" xs="8" className="profile-data">
          <img
            className="profile-pic"
            src={
              user
                ? user.avatar
                : 'https://gravatar.com/avatar/dda81c541d804f53148efea3b4eec136?size=100&d=https%3A%2F%2Funtappd.akamaized.net%2Fsite%2Fassets%2Fimages%2Fdefault_avatar_v3_gravatar.jpg%3Fv%3D2'
            }
            alt={`${user ? user.userName : '...'}`}
          />
          <div>
            <span className="profile-name">{user ? user.userName : '...'}</span>
            <span className="profile-extra">
              <animated.span className="profile-extra-count">
                {totalBeers.number.interpolate((number) => Math.floor(number))}
              </animated.span>{' '}
              unique beers
            </span>
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
      {isAuthenticated && user ? (
        <Update count={count} total={total} lastUpdate={user.lastUpdate} updating={updating} updateUser={updateUser} />
      ) : (
        ''
      )}
    </div>
  );
};

export const Update = ({ count, total, updating, updateUser, lastUpdate }) => (
  <Col lg="2" xs="4">
    {total > 0 ? (
      <UpdateProgress count={count} total={total} />
    ) : (
      <UpdateButton updating={updating} updateUser={updateUser} lastUpdate={lastUpdate} />
    )}
  </Col>
);

const UpdateProgress = ({ count, total }) => (
  <div className="update-button">
    <Progress className="update-progress border border-light" color="light" value={count} max={total} />
  </div>
);

const UpdateButton = ({ updating, updateUser, lastUpdate }) => {
  const lastUpdateDays = moment(lastUpdate).fromNow();

  return (
    <div className="update-button">
      <div>
        <Button color="secondary" onClick={updating ? null : updateUser}>
          {updating ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Refresh'}
        </Button>
        {lastUpdate && <span className="update-text">Updated {lastUpdateDays}</span>}
      </div>
    </div>
  );
};
