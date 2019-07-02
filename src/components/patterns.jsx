import React, { useState, useEffect } from 'react';

import _ from 'lodash';

import 'react-flag-icon-css';

import axios from 'axios';
import { API_ROOT } from '../api/api-config';

import { DayOfWeekChart } from './dayofweek';
import { TimeOfDayChart } from './timeofday';
import { MonthChart } from './month';
import { YearChart } from './year';
import GraphChart from './graph';

export default function Patterns(props) {
  const [weekdayData, setWeekdayData] = useState({ weekdays: [] });
  const [hourData, setHourData] = useState({ hours: [] });
  const [monthData, setMonthData] = useState({ months: [] });
  const [yearData, setYearData] = useState({ years: [], labels: [] });
  const [graphData, setGraphData] = useState({ dates: [] });

  useEffect(
    () => {
      if (props.username !== '') {
        axios
          .get(`${API_ROOT}/v1/users/${props.username}/dayofweek`)
          .then(({ data }) => {
            if (data.status === 'success') {
              setWeekdayData(data.data);
            }
          });

        axios
          .get(`${API_ROOT}/v1/users/${props.username}/timeofday`)
          .then(({ data }) => {
            if (data.status === 'success') {
              setHourData(data.data);
            }
          });

        axios
          .get(`${API_ROOT}/v1/users/${props.username}/month`)
          .then(({ data }) => {
            if (data.status === 'success') {
              setMonthData(data.data);
            }
          });

        axios
          .get(`${API_ROOT}/v1/users/${props.username}/year`)
          .then(({ data }) => {
            if (data.status === 'success') {
              data.data['labels'] = getLabels(data.data.years, 'year');
              setYearData(data.data);
            }
          });

        axios
          .get(`${API_ROOT}/v1/users/${props.username}/graph`)
          .then(({ data }) => {
            if (data.status === 'success') {
              setGraphData(data.data);
            }
          });
      }
    },
    [props.username]
  );

  function weekDataToArray(data) {
    return _.range(1, 8).map(x => getDataCount(data, 'weekday', x));
  }

  function hourDataToArray(data) {
    return _.range(0, 24).map(x => getDataCount(data, 'hour', x));
  }

  function monthDataToArray(data) {
    return _.range(1, 13).map(x => getDataCount(data, 'month', x));
  }

  function yearDataToArray(data) {
    return data.labels.map(x => getDataCount(data.years, 'year', x));
  }

  function weekRatingToArray(data) {
    return _.range(1, 8).map(x =>
      getDataCount(data, 'weekday', x, 'averageRating')
    );
  }

  function hourRatingToArray(data) {
    return _.range(0, 24).map(x =>
      getDataCount(data, 'hour', x, 'averageRating')
    );
  }

  function monthRatingToArray(data) {
    return _.range(1, 13).map(x =>
      getDataCount(data, 'month', x, 'averageRating')
    );
  }

  function yearRatingToArray(data) {
    return data.labels.map(x =>
      getDataCount(data.years, 'year', x, 'averageRating')
    );
  }

  function getDataCount(data, field, number, dataField = 'count') {
    let outdata = data.find(x => x[field] === number);
    if (typeof outdata != 'undefined') return outdata[dataField];
    return 0;
  }

  function getLabels(data, field) {
    let labels = [];

    data.forEach((dataPoint, _) => {
      labels.push(dataPoint[field]);
    });

    labels.sort();

    return labels;
  }

  return (
    <>
      <GraphChart
        data={graphData.dates}
      />
      <DayOfWeekChart
        data={weekDataToArray(weekdayData.weekdays)}
        ratingData={weekRatingToArray(weekdayData.weekdays)}
      />
      <TimeOfDayChart
        data={hourDataToArray(hourData.hours)}
        ratingData={hourRatingToArray(hourData.hours)}
      />
      <MonthChart
        data={monthDataToArray(monthData.months)}
        ratingData={monthRatingToArray(monthData.months)}
      />
      <YearChart
        data={yearDataToArray(yearData)}
        ratingData={yearRatingToArray(yearData)}
        labels={yearData.labels}
      />
    </>
  );
}
