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
import ReactTooltip from 'react-tooltip';
import { Loading } from './loading';
import { Error } from './error';

import centroids from '../assets/centroids.json';

import './tooltip.css';

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
            console.error(error);
            if (error.response) {
              if (error.response.status === 404) {
                setError('Map for country not added');
              }
            } else {
              setError('Something went wrong');
            }
          });
      }
    },
    [data.code, props.data]
  );

  useEffect(
    () => {
      setTimeout(() => {
        ReactTooltip.rebuild()
      }, 100);
    }
  )

  if (!geography) {
    if (error) {
      return <Error message={error} />;
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
      count: brewery.count,
      label: brewery.label,
      coordinates: [brewery.location.lon, brewery.location.lat]
    });
  }

  return (
    <>
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
                  data-tip={`
                  <div class="tooltip-container">
                    <div class="tooltip-text">
                      <p>${geography.properties.NAME_1}</p>
                    </div>
                  </div>`
                  }
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
                      fill: '#263238',
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
                  default: { fill: '#aaa' },
                  hover: { fill: '#212529' },
                  pressed: { fill: '#aaa' }
                }}
              >
                <circle
                  cx={0}
                  cy={0}
                  r={Math.max(Math.min(5, marker.count), 3)}
                  data-tip={`
                  <div class="tooltip-container">
                    <img class="tooltip-image" src="${marker.label}"/>
                    <div class="tooltip-text">
                      <p>${marker.name}</p>
                      <p>${marker.count} unique</p>
                    </div>
                  </div>`
                  }
                  style={{
                    stroke: '#212529',
                    strokeWidth: 1,
                    opacity: 0.9
                  }}
                />
              </Marker>
            ))}
          </Markers>
        </ZoomableGroup>
      </ComposableMap>
      <ReactTooltip html={true}/>
    </>
  );
}
