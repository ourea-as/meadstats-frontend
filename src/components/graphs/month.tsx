import React from 'react';

import { RatingLine } from './charts/ratingLine';
import { CountBar } from './charts/countBar';

type MonthChartProps = {
  data: any;
  ratingData: any;
};

export const MonthChart: React.FC<MonthChartProps> = (props) => {
  const { data, ratingData } = props;

  let x = 0;
  const len = ratingData.length;
  while (x < len) {
    ratingData[x] = parseFloat(ratingData[x]).toFixed(2);
    x++;
  }

  const barData = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        backgroundColor: '#343a40',
        borderColor: '#01070D',
        borderWidth: 2,
        data: data,
      },
    ],
  };

  const ratingBarData = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        borderColor: '#01070D',
        borderWidth: 2,
        data: ratingData,
      },
    ],
  };

  return (
    <>
      <div className="col-md-6 col-xs-12 mb-4">
        <CountBar data={barData} title="Count by month" />
      </div>
      <div className="col-md-6 col-xs-12 mb-4">
        <RatingLine data={ratingBarData} title="Average rating by month" />
      </div>
    </>
  );
};
