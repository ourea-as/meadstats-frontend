import React, { useState, useEffect } from 'react';

import {
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Button,
  Input,
  Table
} from 'reactstrap';

import './tasting.css';

export function Tasting(props) {
  const [beers, setCountries] = useState([1, 2, 3]);
  const [users, setUsers] = useState([1, 2, 3]);

  return (
    <Row>
      <Col xs="12" md="6">
        <InputGroup>
          <Input />
          <InputGroupAddon addonType="append">
            <Button color="secondary">Add taster</Button>
          </InputGroupAddon>
        </InputGroup>
      </Col>
      <Col xs="12" md="6">
        <InputGroup>
          <Input />
          <InputGroupAddon addonType="append">
            <Button color="secondary">Add beer</Button>
          </InputGroupAddon>
        </InputGroup>
      </Col>
      <Col xs="12">
        <Table responsive borderless hover className={'tasting-table'}>
          <thead>
            <tr>
              <th>Beer</th>
              <th>Rein Auestad</th>
              <th>Fredrik Bore</th>
              <th>Tord Auestad</th>
              <th>Average</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" />
              <td>4.25</td>
              <td>4.00</td>
              <td>4.75</td>
              <td>4.50</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

function BeerElement(props) {
  return (
    <div>
      <p>#500</p>
      <p>Nøgne Ø</p>
    </div>
  );
}

function UserElement(props) {
  return (
    <div>
      <p>Tord Auestad</p>
      <p>500 Unique Beers</p>
      <p>2.75 Average Rating</p>
    </div>
  );
}

function CheckinElement(props) {
  return '4.50';
}
