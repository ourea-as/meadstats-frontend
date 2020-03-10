import React from 'react';
import PropTypes from 'prop-types';

import { Bar, Line } from 'react-chartjs-2';

export class DayOfWeekChart extends React.PureComponent {
  render() {
    const { data, ratingData } = this.props;

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
              title: { display: true, text: 'Count by day of week' },
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
              title: { display: true, text: 'Average rating by day of week' },
            }}
          />
        </div>
      </>
    );
  }
}

DayOfWeekChart.propTypes = {
  data: PropTypes.array,
};
