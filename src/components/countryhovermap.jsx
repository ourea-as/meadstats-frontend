import React, { useState, useEffect } from 'react';

import axios from 'axios';
import {
  ComposableMap,
  Geographies,
  Geography,
  Markers,
  Marker,
  ZoomableGroup
} from 'react-simple-maps';
import { Loading } from './loading';
import { Error } from './error';

import centroids from '../assets/centroids.json';

export default function CountryHoverMap(props) {
  const [geography, setGeography] = useState();
  const [error, setError] = useState(false);
  const { data } = props;

  useEffect(
    () => {
      if (props.data !== '') {
        setError(false);

        axios
          .get(`/maps/${data.code}.json`)
          .then(({ data }) => {
            setGeography(data);
          })
          .catch(error => {
            setError(true);
          });
      }
    },
    [data.code]
  );

  if (!geography) {
    if (error) {
      return <Error />;
    } else {
      return <Loading />;
    }
  }

  const markers = [];

  for (var i = 0; i < data.breweries.length; i++) {
    const brewery = data.breweries[i];

    markers.push({
      markerOffset: 0,
      name: brewery.name,
      coordinates: [brewery.location.lon, brewery.location.lat]
    });
  }

  return (
    <ComposableMap
      projectionConfig={{
        scale: centroids[data.code]['scale'],
        xOffset: 0,
        yOffset: 0,
        rotation: [0, 0, 0],
        precision: 0.1
      }}
      width={980}
      height={551}
      style={{
        width: '100%',
        height: 'auto'
      }}
    >
      <ZoomableGroup center={centroids[data.code]['centroid']} disablePanning>
        <Geographies geography={geography} disableOptimization>
          {(geographies, projection) =>
            geographies.map((geography, i) => (
              <Geography
                key={i}
                geography={geography}
                projection={projection}
                style={{
                  default: {
                    fill: '#ffffff',
                    stroke: '#607D8B',
                    strokeWidth: 0.75,
                    outline: 'none'
                  },
                  hover: {
                    fill: '#ffffff',
                    stroke: '#607D8B',
                    strokeWidth: 0.75,
                    outline: 'none'
                  },
                  pressed: {
                    fill: '#ffffff',
                    stroke: '#607D8B',
                    strokeWidth: 0.75,
                    outline: 'none'
                  }
                }}
              />
            ))
          }
        </Geographies>
        <Markers>
          {markers.map((marker, i) => (
            <Marker
              key={i}
              marker={marker}
              style={{
                default: { fill: '#FF5722' },
                hover: { fill: '#FFFFFF' },
                pressed: { fill: '#FF5722' }
              }}
            >
              <circle
                cx={0}
                cy={0}
                r={2}
                style={{
                  stroke: '#FF5722',
                  strokeWidth: 1,
                  opacity: 0.9
                }}
              />
              <text
                textAnchor="middle"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 600,
                  fill: '#000000',
                  fontSize: '0.6em'
                }}
              >
                {marker.name}
              </text>
            </Marker>
          ))}
        </Markers>
      </ZoomableGroup>
    </ComposableMap>
  );
}
