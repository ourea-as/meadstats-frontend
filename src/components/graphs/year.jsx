import React from 'react';

import { Bar, Line } from 'react-chartjs-2';

const getDayInYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day;
};

export const YearChart = props => {
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
            title: { display: true, text: 'Count by Year' },
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
            title: { display: true, text: 'Average rating by year' },
          }}
        />
      </div>
    </>
  );
};
