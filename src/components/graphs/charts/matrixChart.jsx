import React from 'react';
import ChartComponent, { Chart } from 'react-chartjs-2';

export class Matrix extends React.Component {
  UNSAFE_componentWillMount() {
    const resolve = Chart.helpers.options.resolve;
    Chart.controllers.matrix = Chart.controllers.bar;
    Chart.controllers.matrix = Chart.controllers.bar.extend({
      dataElementType: Chart.elements.Rectangle,

      update: function(reset) {
        const meta = this.getMeta();
        const data = meta.data || [];
        let i, ilen;

        this._xScale = this.getScaleForId(meta.xAxisID);
        this._yScale = this.getScaleForId(meta.yAxisID);

        for (i = 0, ilen = data.length; i < ilen; ++i) {
          this.updateElement(data[i], i, reset);
        }
      },

      updateElement: function(item, index, reset) {
        const dataset = this.getDataset();
        const datasetIndex = this.index;
        const value = dataset.data[index];
        const xScale = this._xScale;
        const yScale = this._yScale;
        const options = this._resolveElementOptions(item, index);
        const x = reset ? xScale.getBasePixel() : xScale.getPixelForValue(value, index, datasetIndex);
        const y = reset ? yScale.getBasePixel() : yScale.getPixelForValue(value, index, datasetIndex);
        const h = options.height;
        const w = options.width;
        const halfH = h / 2;

        item._xScale = xScale;
        item._yScale = yScale;
        item._options = options;
        item._datasetIndex = datasetIndex;
        item._index = index;

        item._model = {
          x: x,
          base: y - halfH,
          y: y + halfH,
          width: w,
          height: h,
          backgroundColor: options.backgroundColor,
          borderColor: options.borderColor,
          borderSkipped: options.borderSkipped,
          borderWidth: options.borderWidth,
        };

        item.pivot();
      },

      draw: function() {
        const data = this.getMeta().data || [];
        let i, ilen;

        for (i = 0, ilen = data.length; i < ilen; ++i) {
          data[i].draw();
        }
      },

      /**
       * @private
       */
      _resolveElementOptions: function(rectangle, index) {
        const chart = this.chart;
        const datasets = chart.data.datasets;
        const dataset = datasets[this.index];
        const options = chart.options.elements.rectangle;
        const values = {};
        let i, ilen, key;

        // Scriptable options
        const context = {
          chart: chart,
          dataIndex: index,
          dataset: dataset,
          datasetIndex: this.index,
        };

        const keys = ['backgroundColor', 'borderColor', 'borderSkipped', 'borderWidth', 'width', 'height'];

        for (i = 0, ilen = keys.length; i < ilen; ++i) {
          key = keys[i];
          values[key] = resolve([dataset[key], options[key]], context, index);
        }

        return values;
      },
    });
  }

  render() {
    return (
      <ChartComponent {...this.props} ref={ref => (this.chart_instance = ref && ref.chart_instance)} type="matrix" />
    );
  }
}
