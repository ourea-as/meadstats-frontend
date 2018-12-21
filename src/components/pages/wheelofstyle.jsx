import React from 'react';
import 'react-flag-icon-css';

import axios from 'axios';

import { Col, Progress } from 'reactstrap';
import { API_ROOT } from '../../api/api-config';
import { WheelOfStyleTable } from '../tables/wheelofstyletable';

export default class WheelOfStyle extends React.Component {
  constructor(props) {
    super(props);
    this.reloadData = this.reloadData.bind(this);

    this.state = {
      data: {
        styles: [],
        total_count: 0,
        had_count: 0
      }
    };
  }

  componentDidMount() {
    this.reloadData();
  }

  componentWillReceiveProps(nextProps) {
    this.reloadData(nextProps);
  }

  reloadData(props) {
    props = props || this.props;

    if (props.username !== '') {
      axios.get(`${API_ROOT}/user/${props.username}/wos`).then(({ data }) => {
        if (data.status === 'success') {
          this.setState({ data: data.data });
        }
      });
    }
  }

  render() {
    const { data } = this.state;

    return (
      <React.Fragment>
        <Col xs="12">
          <Progress
            value={data.had_count}
            max={data.total_count}
            color="dark"
            className="count-progress"
          >
            {data.had_count} / {data.total_count}
          </Progress>
        </Col>
        <Col xs="12">
          <WheelOfStyleTable styles={data.styles} />
        </Col>
      </React.Fragment>
    );
  }
}
