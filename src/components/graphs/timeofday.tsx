import React from 'react';

import { Bar, Line } from 'react-chartjs-2';

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
        <Bar
          data={barData}
          legend={{ display: false }}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: { beginAtZero: true, maxTicksLimit: 5 },
                  gridLines: {
                    display: true,
                    drawBorder: true,
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
            title: { display: true, text: 'Count by hour of day' },
          }}
        />
      </div>
      <div className="col-md-6 col-xs-12 mb-4">
        <Line
          data={ratingBarData}
          legend={{ display: false }}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: { beginAtZero: true, maxTicksLimit: 5, max: 5 },
                  gridLines: {
                    display: true,
                    drawBorder: true,
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
            title: { display: true, text: 'Average rating by hour of day' },
          }}
        />
      </div>
    </>
  );
};
