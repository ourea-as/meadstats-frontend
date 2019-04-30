import React from 'react';

import { Line } from 'react-chartjs-2';

export class GraphChart extends React.PureComponent {
  render() {
    const { data, labels } = this.props;

    const formattedData = data.map(x => ({ t: new Date(x.date), y: x.count }));

    const barData = {
      labels: labels,
      datasets: [
        {
          backgroundColor: '#343a40',
          borderColor: '#01070D',
          borderWidth: 2,
          data: formattedData
        }
      ]
    };

    return (
      <>
        <div className="col-md-12 col-xs-12 mb-4">
          <Line
            data={barData}
            legend={{ display: false }}
            height={300}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              elements: {
                point:{
                    radius: 0
                }
              },
              tooltips: {
                intersect: false
              },
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
                    type: 'time',
                    time: {
                      unit: 'year',
                      tooltipFormat: 'LL'
                    },
                    gridLines: {
                      display: false,
                      drawBorder: false
                    }
                  }
                ]
              },
              title: { display: true, text: 'Cumulative count over time' },
            }}
          />
        </div>
      </>
    );
  }
}
