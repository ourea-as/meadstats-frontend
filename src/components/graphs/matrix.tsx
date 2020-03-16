import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { scaleLinear } from 'd3-scale';
import { useWindowSize } from 'react-use';

import { Matrix } from './charts/matrixChart';

type DataPoint = {
  date: string;
  count: number;
  countDay: number;
};

type MatrixChartProps = {
  data: Array<DataPoint>;
};

const MatrixChart: React.FC<MatrixChartProps> = ({ data }) => {
  const [animationDuration, setAnimationDuration] = useState(0);

  useEffect(() => {
    setAnimationDuration(3000);
  }, [setAnimationDuration]);

  const { width } = useWindowSize();

  // Show different amount on days depending on window size. Max 1 year, min a month
  const filterDays = Math.max(
    30,
    Math.min(270, Math.round(width * (270 / (1140 * (Math.log(width) / Math.log(14) / 2))))),
  );

  const filteredData = data.filter(x => moment().diff(moment(x.date), 'days') < filterDays);

  const maxCount = Math.max(...filteredData.map(x => x.countDay), 0);

  const formattedData = filteredData.map(x => ({
    x: moment(x.date),
    y: moment(x.date).format('e'),
    d: moment(x.date),
    v: x.countDay,
  }));

  // Generate list of
  const dates: Set<string> = new Set();
  let dt = moment()
    .subtract(filterDays, 'days')
    .startOf('day');
  const end = moment().startOf('day');
  while (dt <= end) {
    dates.add(dt.format('YYYY-MM-DD'));
    dt = dt.add(1, 'day');
  }

  // Remove dates present in dataset
  formattedData.forEach(x => {
    dates.delete(moment(x.x).format('YYYY-MM-DD'));
  });

  // Generate missing dates
  dates.forEach(x => {
    formattedData.push({
      x: moment(x),
      y: moment(x).format('e'),
      d: moment(x),
      v: 0,
    });
  });

  formattedData.sort((a, b) => (a.x > b.x ? -1 : 1));

  const colorScale = scaleLinear()
    .domain([0, Math.ceil(Math.sqrt(maxCount)), maxCount])
    .range(['#CFD8DC', '#607D8B', '#01070D']);

  const barData = {
    datasets: [
      {
        data: formattedData,
        backgroundColor: (ctx): string => {
          const value = ctx.dataset.data[ctx.dataIndex].v;
          if (value === 0) return '#eeeeee';
          return colorScale(value);
        },
        borderColor: (ctx): string => {
          const value = ctx.dataset.data[ctx.dataIndex].v;
          if (value === 0) return '#00000000';
          return '#01070D';
        },
        borderWidth: 1,
        borderSkipped: true,
        width: (ctx): number => {
          const a = ctx.chart.chartArea;
          return (a.right - a.left) / (filterDays / 6) - 5;
        },
        height: (ctx): number => {
          const a = ctx.chart.chartArea;
          return (a.right - a.left) / (filterDays / 6) - 5;
        },
      },
    ],
  };

  const graphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    animation: {
      duration: animationDuration,
      easing: 'easeOutCubic',
    },
    tooltips: {
      intersect: false,
      callbacks: {
        label: (tooltipItem, data): string => {
          return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].v;
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          position: 'top',
          offset: true,
          time: {
            unit: 'month',
            round: 'week',
            tooltipFormat: 'D MMMM',
            displayFormats: {
              month: 'MMM',
            },
          },
          ticks: {
            maxRotation: 0,
            autoSkip: true,
            padding: 10,
          },
          gridLines: {
            display: false,
            drawBorder: false,
            tickMarkLength: 0,
          },
        },
      ],
      yAxes: [
        {
          type: 'time',
          offset: true,
          position: 'left',
          time: {
            unit: 'day',
            parser: 'e',
            displayFormats: {
              day: 'ddd',
            },
          },
          ticks: {
            // workaround, see: https://github.com/chartjs/Chart.js/pull/6257
            maxRotation: 90,
            reverse: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
            tickMarkLength: 0,
          },
        },
      ],
    },
    title: { display: false },
  };

  return (
    <>
      <div className="col-md-12 col-xs-12 mb-4">
        <Matrix data={barData} height={200} options={graphOptions} />
      </div>
    </>
  );
};

export default MatrixChart;
