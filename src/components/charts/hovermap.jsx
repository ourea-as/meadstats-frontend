import React from 'react';
import { scaleLinear } from 'd3-scale';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import PropTypes from 'prop-types';
import Data from '../../assets/world-50m-with-population.json';

export class HoverMap extends React.PureComponent {
  render() {
    const popScale = scaleLinear()
      .domain([0, 10, 200])
      .range(['#CFD8DC', '#607D8B', '#37474F']);

    const { countries } = this.props;

    const countriesMap = {};

    countries.forEach(country => {
      countriesMap[country.code.toUpperCase()] = country.count;
    });

    return (
      <ComposableMap
        projectionConfig={{
          scale: 205,
          rotation: [-11, 0, 0]
        }}
        width={980}
        height={551}
        style={{
          width: '100%',
          height: 'auto'
        }}
      >
        <ZoomableGroup center={[0, 20]} disablePanning>
          <Geographies geography={Data} disableOptimization>
            {(geographies, projection) =>
              geographies.map((geography, i) => (
                <Geography
                  key={i}
                  geography={geography}
                  projection={projection}
                  style={{
                    default: {
                      fill: countriesMap[
                        geography.properties.iso_a2.toUpperCase()
                      ]
                        ? popScale(
                            countriesMap[
                              geography.properties.iso_a2.toUpperCase()
                            ]
                          )
                        : '#ffffff',
                      stroke: '#607D8B',
                      strokeWidth: 0.75,
                      outline: 'none'
                    },
                    hover: {
                      fill: '#263238',
                      stroke: '#607D8B',
                      strokeWidth: 0.75,
                      outline: 'none'
                    },
                    pressed: {
                      fill: '#263238',
                      stroke: '#607D8B',
                      strokeWidth: 0.75,
                      outline: 'none'
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    );
  }
}

HoverMap.propTypes = {
  countries: PropTypes.array
};
