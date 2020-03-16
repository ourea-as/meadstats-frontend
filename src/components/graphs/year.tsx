import React from 'react';

import { RatingLine } from './charts/ratingLine';
import { CountBar } from './charts/countBar';

const getDayInYear = (): number => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.valueOf() - start.valueOf() + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day;
};

type YearChartProps = {
  data: any;
  ratingData: any;
  labels: Array<string>;
};

export const YearChart: React.FC<YearChartProps> = props => {
  const { data, ratingData, labels } = props;

  let x = 0;
  const len = ratingData.length;
  while (x < len) {
    ratingData[x] = parseFloat(ratingData[x]).toFixed(2);
    x++;
  }

  const barData = {
    labels: labels,
    datasets: [
      {
        label: 'Consumed',
        stack: 'stack',
        backgroundColor: '#343a40',
        borderColor: '#01070D',
        borderWidth: 2,
        data: data,
      },

      {
        label: 'Projection',
        stack: 'stack',
        backgroundColor: '#00000000',
        borderColor: '#01070D',
        borderWidth: 2,
        data: [...data].map((d, index) => {
          if (index === data.length - 1) {
            return Math.floor((d / getDayInYear()) * 365);
          } else {
            return 0;
          }
        }),
      },
    ],
  };

  const ratingBarData = {
    labels: labels,
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
        <CountBar data={barData} title="Count by year" />
      </div>
      <div className="col-md-6 col-xs-12 mb-4">
        <RatingLine data={ratingBarData} title="Average rating by year" />
      </div>
    </>
  );
};
