import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { API_ROOT } from '../api/api-config';

import { Row, Col, InputGroup, InputGroupAddon, Button, Input, Table } from 'reactstrap';

import './table.css';
import './tasting.css';

type Tasting = {
  name: string;
  tasters: number[];
  beers: number[];
  startTime: Date;
};

type Beer = {
  id: number;
  name: string;
  brewery: string;
  country: string;
  label: string;
  globalrating: number;
  abv: number;
  style: string;
};

type User = {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  avatarHd: string;
  totalBeers: number;
  rank: string;
};

type Checkin = {
  id: number;
  beerid: number;
  userid: number;
  rating: number;
};

function mapTotalToRank(total: number) {
  if (total > 10000) return 'Gud';
  if (total > 5000) return 'Pave';
  if (total > 2500) return 'Dekan';
  if (total > 1500) return 'Kardinal';
  if (total > 1000) return 'Erkebiskop';
  if (total > 500) return 'Biskop';
  if (total > 300) return 'Prest';
  if (total > 200) return 'Diakon';
  if (total > 100) return 'Abbed';
  if (total > 65) return 'Munk';
  if (total > 25) return 'Apostel';
  return 'Misjonær';
}

export function Tasting(props) {
  const { tastingId } = props;

  const [tasting, setTasting] = useState<Tasting>({
    name: '',
    tasters: [],
    beers: [],
    startTime: new Date(),
  });
  const [beers, setBeers] = useState<Beer[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [checkins, setCheckins] = useState<Checkin[]>([]);

  // Get tasting details
  useEffect(() => {
    setTasting({
      name: 'Jul med PIP - Edition 5',
      tasters: [3624256, 2636921, 2821605, 2721461, 6128114, 5790031, 2907284, 5575566, 5572104, 4755947],
      beers: [3550938, 3555678, 2784552, 3403103, 2269438],
      startTime: new Date(),
    });
  }, [tastingId]);

  // Get tasting members and beers
  useEffect(() => {
    if (tasting) {
      setBeers([]);
      setUsers([]);
      setCheckins([]);

      axios
        .get(`${API_ROOT}/v1/tasting/beers/` + tasting.beers.join(','))
        .then(({ data }) => {
          setBeers(
            data.data.beers.map(beer => {
              return {
                id: beer.id,
                name: beer.name,
                brewery: beer.brewery.name,
                label: beer.label,
                globalrating: beer.rating,
                abv: beer.abv,
                style: beer.style,
                country: beer.country,
              } as Beer;
            }),
          );
        })
        .catch(() => {
          console.error('Unable to get beer list');
        });

      axios
        .get(`${API_ROOT}/v1/tasting/users/` + tasting.tasters.join(','))
        .then(({ data }) => {
          setUsers(
            data.data.users.map(user => {
              return {
                id: user.id,
                name: user.user_name,
                firstName: user.first_name,
                lastName: user.last_name,
                avatarHd: user.avatar_hd,
                totalBeers: user.total_beers,
                rank: mapTotalToRank(user.total_beers),
              } as User;
            }),
          );
        })
        .catch(() => {
          console.error('Unable to get user list');
        });

      axios
        .get(`${API_ROOT}/v1/tasting/checkins?users=${tasting.tasters.join(',')}&beers=${tasting.beers.join(',')}`)
        .then(({ data }) => {
          setCheckins(
            data.data.checkins.map(checkin => {
              return {
                id: checkin.id,
                beerid: checkin.beer.id,
                userid: checkin.user.id,
                rating: checkin.rating,
              } as Checkin;
            }),
          );
        })
        .catch(() => {
          console.error('Unable to get checkin list');
        });
    }
  }, [tasting]);

  return (
    <Row>
      <Col xs="12">
        <div className="tasting-heading">
          <h1>{tasting.name}</h1>
        </div>
        <Table responsive borderless hover className={'tasting-table'}>
          <thead>
            <tr>
              <th></th>
              {users
                .sort((a, b) => (a.totalBeers < b.totalBeers ? 1 : -1))
                .map(user => (
                  <th key={user.id}>
                    <UserElement user={user} />
                  </th>
                ))}
              <th>Average</th>
            </tr>
          </thead>
          <tbody>
            {beers.map(beer => {
              return (
                <tr key={beer.id}>
                  <th scope="row">
                    <BeerElement beer={beer} />
                  </th>
                  {users
                    .sort((a, b) => (a.totalBeers < b.totalBeers ? 1 : -1))
                    .map(user => {
                      const checkin = checkins.find(
                        checkin => checkin.beerid === beer.id && checkin.userid === user.id,
                      );
                      return (
                        <td key={beer.id + '' + user.id}>
                          <CheckinElement checkin={checkin} />
                        </td>
                      );
                    })}
                  <td className="tasting-checkin">
                    {(
                      checkins
                        .filter(checkin => checkin.beerid === beer.id)
                        .map(checkin => checkin.rating)
                        .reduce((a, b) => {
                          return a + b;
                        }, 0) / checkins.filter(checkin => checkin.beerid === beer.id).length
                    ).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

function BeerElement(props) {
  let rating;

  if (props.beer.style.includes('-')) {
    const splitted = props.beer.style.split(' - ');
    rating = (
      <div>
        <span className="table-twoline-main">{splitted[0]}</span>
        <span className="table-twoline-sub">{splitted[1]}</span>
      </div>
    );
  } else {
    rating = (
      <div>
        <span className="table-twoline-main">{props.beer.style}</span>
      </div>
    );
  }

  return (
    <>
      <span className="table-flex">
        <img className="beertable-image" alt="Beer Logo" src={props.beer.label} />
        <div>
          <span className="table-twoline-main">{props.beer.name}</span>
          <span className="table-twoline-sub">{props.beer.brewery}</span>
          {rating}
          {props.beer.globalrating.toFixed(2)} - {props.beer.abv.toFixed(1)}%
        </div>
      </span>
    </>
  );
}

function UserElement(props) {
  return (
    <>
      <div>
        <img className="beertable-image" src={props.user.avatarHd} />
      </div>
      <div>{props.user.name}</div>
      <div>
        {props.user.totalBeers} - {props.user.rank}
      </div>
    </>
  );
}

function CheckinElement(props) {
  if (props.checkin == null) {
    return <span className="tasting-checkin">-</span>;
  }
  return <span className="tasting-checkin">{props.checkin.rating.toFixed(2)}</span>;
}
