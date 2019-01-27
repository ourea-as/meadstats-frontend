import React from 'react';

import { Bar, Line } from 'react-chartjs-2';

export class YearChart extends React.PureComponent {
  render() {
    const { data, ratingData, labels } = this.props;

    var x = 0;
    var len = ratingData.length;
    while (x < len) {
      ratingData[x] = parseFloat(ratingData[x]).toFixed(2);
      x++;
    }

    const barData = {
      labels: labels,
      datasets: [
        {
          backgroundColor: '#343a40',
          borderColor: '#01070D',
          borderWidth: 2,
          data: data
        }
      ]
    };

    const ratingBarData = {
      labels: labels,
      datasets: [
        {
          borderColor: '#01070D',
          borderWidth: 2,
          data: ratingData
        }
      ]
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
                      drawBorder: true
                    }
                  }
                ],
                xAxes: [
                  {
                    gridLines: {
                      display: false,
                      drawBorder: false
                    }
                  }
                ]
              },
              title: { display: true, text: 'Count by Year' }
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
                      drawBorder: true
                    }
                  }
                ],
                xAxes: [
                  {
                    gridLines: {
                      display: false,
                      drawBorder: false
                    }
                  }
                ]
              },
              title: { display: true, text: 'Average rating by year' }
            }}
          />
        </div>
      </>
    );
  }
}
