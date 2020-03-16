import React from 'react';

import { RatingLine } from './charts/ratingLine';
import { CountBar } from './charts/countBar';

type TimeOfDayChartProps = {
  data: any;
  ratingData: any;
};

export const TimeOfDayChart: React.FC<TimeOfDayChartProps> = props => {
  const { data, ratingData } = props;

  let x = 0;
  const len = ratingData.length;
  while (x < len) {
    ratingData[x] = parseFloat(ratingData[x]).toFixed(2);
    x++;
  }

  const barData = {
    labels: [
      '00',
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
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
      '00',
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
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
        <CountBar data={barData} title="Count by hour of day" />
      </div>
      <div className="col-md-6 col-xs-12 mb-4">
        <RatingLine data={ratingBarData} title="Average rating by hour of day" />
      </div>
    </>
  );
};
