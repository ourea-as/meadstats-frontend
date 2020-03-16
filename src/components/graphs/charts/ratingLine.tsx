import React from 'react';
import { Line } from 'react-chartjs-2';

type RatingLineProps = {
  data: any;
  title: string;
};

export const RatingLine: React.FC<RatingLineProps> = props => {
  const { data, title } = props;

  return (
    <Line
      data={data}
      legend={{ display: false }}
      options={{
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
      }}
    />
  );
};
