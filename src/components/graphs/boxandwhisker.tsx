import React, { useEffect, useMemo, useRef } from 'react';
import Chart from 'chart.js';
// @ts-ignore
import 'chartjs-chart-box-and-violin-plot';
import { CheckinsData } from '../../types';

type BoxProps = {
  data: Array<CheckinsData>;
};

export const BoxAndWhiskers: React.FC<BoxProps> = (props) => {
  const { data } = props;

  const computedData = useMemo(() => {
    const filteredData = data.filter((checkin) => checkin.rating !== 0);

    // Build a dictionary with each unique style
    const styles = [...new Set(filteredData.map((checkin) => checkin.beer.style.split(' - ')[0]))];
    const formattedData: { [style: string]: number[] } = {};
    styles.forEach((style) => (formattedData[style] = []));

    // Fill the dictionary with data
    filteredData.forEach((checkin) => {
      const style = checkin.beer.style.split(' - ')[0];
      formattedData[style].push(checkin.rating);
    });

    // Find average of each style and sort by average
    const items = Object.keys(formattedData).map((key) => [key, formattedData[key]]) as (
      | string
      | number[]
      | number
    )[][];
    const averageFunc = (arr: number[]) => arr.reduce((p, c) => p + c, 0) / arr.length;

    items.forEach((item) => (item[2] = averageFunc(item[1] as number[])));
    items.sort((a, b) => (b[2] as number) - (a[2] as number));

    // Extract labels and values from list
    const labels = items.map((a) => a[0]);
    const values = items.map((a) => a[1]);

    return { labels, values };
  }, [data]);

  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const myChartRef = chartRef.current;

    if (myChartRef) {
      const context = myChartRef.getContext('2d');

      if (context) {
        new Chart(context, {
          type: 'boxplot',
          data: {
            labels: computedData.labels,
            datasets: [
              {
                label: '',
                backgroundColor: '#343a40',
                borderColor: '#01070D',
                borderWidth: 2,
                //outlierColor: '#999999',
                //padding: 10,
                //itemRadius: 0,
                data: computedData.values as number[][],
              },
            ],
          },
          options: {
            responsive: true,
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'Style Preferences',
            },
          },
        });
      }
    }
  });

  return (
    <div className="col-md-12 col-xs-12 mb-4">
      <canvas id="styleChart" ref={chartRef} />
    </div>
  );
};
