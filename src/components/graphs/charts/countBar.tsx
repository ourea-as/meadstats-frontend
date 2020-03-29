import React from 'react';
import { Bar } from 'react-chartjs-2';

type CountBarProps = {
  data: any;
  title: string;
};

export const CountBar: React.FC<CountBarProps> = (props) => {
  const { data, title } = props;

  return (
    <Bar
      data={data}
      legend={{ display: false }}
      options={{
        scales: {
          yAxes: [
            {
              ticks: { beginAtZero: true, maxTicksLimit: 5, padding: 8 },
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
      }}
    />
  );
};
