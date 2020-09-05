import React from 'react';

import { Chart } from './chart';
import moment from 'moment';
import { useWindowSize } from 'react-use';
import { ChartOptions } from 'chart.js';

type DataPoint = {
  date: string;
  count: number;
};

type GraphChartProps = {
  data: Array<DataPoint>;
};

const GraphChart: React.FC<GraphChartProps> = ({ data }) => {
  const formattedData = data.map((x) => ({ x: new Date(x.date), y: x.count }));
  const today = new Date();
  const { width } = useWindowSize();

  const shouldDisplayMonths = (data: any): boolean => {
    const firstDate = data[0].x;

    return moment().diff(moment(firstDate), 'days') < 365 * (width < 1000 ? 0.5 : 1) ? true : false;
  };

  // Create a data point today containing the same value as the last day with data
  if (!formattedData.some((x) => x.x.toDateString() === today.toDateString())) {
    const maxCount = Math.max(...formattedData.map((x) => x.y), 0);
    formattedData.push({ x: today, y: maxCount });
  }

  formattedData.sort((a, b) => (a.x < b.x ? -1 : 1));
  const months = shouldDisplayMonths(formattedData);

  const barData = {
    datasets: [
      {
        backgroundColor: '#343a40',
        borderColor: '#01070D',
        borderWidth: 2,
        data: formattedData,
        steppedLine: true,
      },
    ],
  };

  const graphOptions = {
    animation: { duration: 0 },
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
      },
    },
    legend: {
      display: false,
    },
    tooltips: {
      intersect: false,
    },
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
          type: 'time',
          time: {
            unit: months ? 'month' : 'year',
            displayFormats: {
              month: 'MMM YY',
            },
            tooltipFormat: 'D MMMM',
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
    },
    title: { display: true, text: 'Cumulative count over time' },
  } as ChartOptions;

  return (
    <>
      <div className="col-md-12 col-xs-12 mb-4">
        <Chart data={barData} height={300} options={graphOptions} type="line" />
      </div>
    </>
  );
};

export default GraphChart;
