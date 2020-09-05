import React from 'react';
import { Chart } from '../chart';

type RatingLineProps = {
  data: any;
  title: string;
};

export const RatingLine: React.FC<RatingLineProps> = (props) => {
  const { data, title } = props;

  const options = {
    animation: { duration: 0 },
    legend: { display: false },
    scales: {
      yAxes: [
        {
          ticks: { beginAtZero: true, maxTicksLimit: 10, max: 5, padding: 8 },
          gridLines: {
            display: true,
            drawBorder: false,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
    },
    title: { display: true, text: title },
  };

  return <Chart data={data} options={options} type="line" />;
};
