import React, { useState, useEffect } from 'react';

import 'react-flag-icon-css';

import axios from 'axios';
import { API_ROOT } from '../api/api-config';

import { DayOfWeekChart } from './graphs/dayofweek';
import { TimeOfDayChart } from './graphs/timeofday';
import { MonthChart } from './graphs/month';
import { YearChart } from './graphs/year';
import GraphChart from './graphs/graph';
import { APIResponse, MonthsData, DayOfWeekData, TimeOfDayData, YearsData, GraphData } from '../types';

const getDataCount = (data, field, number, dataField = 'count'): number => {
  const outdata = data.find(x => x[field] === number);
  if (typeof outdata != 'undefined') return outdata[dataField];
  return 0;
};

const getLabels = (data: Array<object>, field: string): Array<string> => {
  const labels: Array<string> = [];

  data.forEach(dataPoint => {
    labels.push(dataPoint[field]);
  });

  labels.sort();

  return labels;
};

const weekDataToArray = (data: Array<DayOfWeekData>): Array<number> => {
  return [...Array(7).keys()].map(k => k + 1).map(x => getDataCount(data, 'weekday', x));
};

const hourDataToArray = (data: Array<TimeOfDayData>): Array<number> => {
  return [...Array(24).keys()].map(x => getDataCount(data, 'hour', x));
};

const monthDataToArray = (data: Array<MonthsData>): Array<number> => {
  return [...Array(12).keys()].map(k => k + 1).map(x => getDataCount(data, 'month', x));
};

const yearDataToArray = (data: Array<YearsData>, labels: Array<string>): Array<number> => {
  return labels.map(x => getDataCount(data, 'year', x));
};

const weekRatingToArray = (data: Array<DayOfWeekData>): Array<number> => {
  return [...Array(7).keys()].map(k => k + 1).map(x => getDataCount(data, 'weekday', x, 'averageRating'));
};

const hourRatingToArray = (data: Array<TimeOfDayData>): Array<number> => {
  return [...Array(24).keys()].map(x => getDataCount(data, 'hour', x, 'averageRating'));
};

const monthRatingToArray = (data: Array<MonthsData>): Array<number> => {
  return [...Array(12).keys()].map(k => k + 1).map(x => getDataCount(data, 'month', x, 'averageRating'));
};

const yearRatingToArray = (data: Array<YearsData>, labels: Array<string>): Array<number> => {
  return labels.map(x => getDataCount(data, 'year', x, 'averageRating'));
};

type PatternsProps = {
  username: string;
};

const Patterns: React.FC<PatternsProps> = props => {
  const [weekdayData, setWeekdayData] = useState<Array<DayOfWeekData>>([]);
  const [hourData, setHourData] = useState<Array<TimeOfDayData>>([]);
  const [monthData, setMonthData] = useState<Array<MonthsData>>([]);
  const [yearData, setYearData] = useState<{ years: Array<YearsData>; labels: Array<string> }>({
    years: [],
    labels: [],
  });
  const [graphData, setGraphData] = useState<Array<GraphData>>([]);

  useEffect(() => {
    if (props.username !== '') {
      axios.get<APIResponse<DayOfWeekData>>(`${API_ROOT}/v1/users/${props.username}/dayofweek`).then(({ data }) => {
        if (data.status === 'success') {
          setWeekdayData(data.data.weekdays);
        }
      });

      axios.get<APIResponse<TimeOfDayData>>(`${API_ROOT}/v1/users/${props.username}/timeofday`).then(({ data }) => {
        if (data.status === 'success') {
          setHourData(data.data.hours);
        }
      });

      axios.get<APIResponse<MonthsData>>(`${API_ROOT}/v1/users/${props.username}/month`).then(({ data }) => {
        if (data.status === 'success') {
          setMonthData(data.data.months);
        }
      });

      axios.get<APIResponse<YearsData>>(`${API_ROOT}/v1/users/${props.username}/year`).then(({ data }) => {
        if (data.status === 'success') {
          const labels = getLabels(data.data.years, 'year');
          setYearData({ years: data.data.years, labels: labels });
        }
      });

      axios.get<APIResponse<GraphData>>(`${API_ROOT}/v1/users/${props.username}/graph`).then(({ data }) => {
        if (data.status === 'success') {
          setGraphData(data.data.dates);
        }
      });
    }
  }, [props.username]);

  return (
    <>
      <GraphChart data={graphData} />
      <DayOfWeekChart data={weekDataToArray(weekdayData)} ratingData={weekRatingToArray(weekdayData)} />
      <TimeOfDayChart data={hourDataToArray(hourData)} ratingData={hourRatingToArray(hourData)} />
      <MonthChart data={monthDataToArray(monthData)} ratingData={monthRatingToArray(monthData)} />
      <YearChart
        data={yearDataToArray(yearData.years, yearData.labels)}
        ratingData={yearRatingToArray(yearData.years, yearData.labels)}
        labels={yearData.labels}
      />
    </>
  );
};

export default Patterns;
