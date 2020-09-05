import React, { useEffect, useRef } from 'react';
import { default as ChartJS, ChartData, ChartOptions } from 'chart.js';
// @ts-ignore
import 'chartjs-chart-box-and-violin-plot';
import 'chartjs-chart-matrix';

type ChartProps = {
  data: ChartData;
  height?: number;
  options: ChartOptions;
  type: 'bar' | 'line' | 'matrix' | 'boxplot';
};

export const Chart: React.FC<ChartProps> = (props) => {
  const { data, height, options, type } = props;

  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const myChartRef = chartRef.current;

    if (myChartRef) {
      const context = myChartRef.getContext('2d');

      if (context) {
        new ChartJS(context, {
          type: type,
          data: data,
          options: options,
        });
      }
    }
  });

  return <canvas id="styleChart" height={height} ref={chartRef} />;
};
