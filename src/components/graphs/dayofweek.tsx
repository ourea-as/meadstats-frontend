import React from 'react';

import { RatingLine } from './charts/ratingLine';
import { CountBar } from './charts/countBar';

type DayOfWeekChartProps = {
  data: any;
  ratingData: any;
};

export const DayOfWeekChart: React.FC<DayOfWeekChartProps> = props => {
  const { data, ratingData } = props;

  let x = 0;
  const len = ratingData.length;
  while (x < len) {
    ratingData[x] = parseFloat(ratingData[x]).toFixed(2);
    x++;
  }

  const barData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
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
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
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
        <CountBar data={barData} title="Count by day of week" />
      </div>

      <div className="col-md-6 col-xs-12 mb-4">
        <RatingLine data={ratingBarData} title="Average rating by day of week" />
      </div>
    </>
  );
};
