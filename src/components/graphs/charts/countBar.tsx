import React from 'react';
import { Chart } from '../chart';

type CountBarProps = {
  data: any;
  title: string;
};

export const CountBar: React.FC<CountBarProps> = (props) => {
  const { data, title } = props;

  const options = {
    animation: { duration: 0 },
    legend: { display: false },
    scales: {
      yAxes: [
        {
          stacked: false,
          ticks: { beginAtZero: true, maxTicksLimit: 5, padding: 8 },
          gridLines: {
            display: true,
            drawBorder: false,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
    },
    title: { display: true, text: title },
  };

  return <Chart data={data} options={options} type="bar" />;
};
