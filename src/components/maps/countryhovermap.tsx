import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { ComposableMap, Geographies, Geography, Markers, Marker, ZoomableGroup } from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import * as TopoJSON from 'topojson-specification';

import { Loading } from '../loading';
import { Error } from '../error';

import centroidsJson from '../../assets/centroids.json';

import '../tooltip.css';

import { CountryData } from '../../types';

interface CountryHoverMapProps {
  data?: CountryData;
}

interface MarkerData {
  markerOffset: number;
  name: string;
  count: number;
  label: string;
  coordinates: [number, number];
}

const centroids: {
  [index: string]: { centroid: number[]; scale: number };
} = centroidsJson;

export const CountryHoverMap: React.FC<CountryHoverMapProps> = ({ data }): JSX.Element => {
  const [geography, setGeography] = useState<TopoJSON.Topology>();
  const [error, setError] = useState('');

  useEffect(() => {
    if (data) {
      setError('');

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
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      ReactTooltip.rebuild();
    }, 100);
  });

  if (data) {
    if (!geography) {
      if (error !== '') {
        return <Error message={error} />;
      }
      return <Loading />;
    }
    const markers: MarkerData[] = [];

    for (let i = 0; i < data.breweries.length; i++) {
      const brewery = data.breweries[i];

      markers.push({
        markerOffset: 0,
        name: brewery.name,
        count: brewery.count,
        label: brewery.label,
        coordinates: [brewery.location.lon, brewery.location.lat],
      });
    }

    return (
      <>
        <ComposableMap
          projectionConfig={{
            scale: centroids[data.code].scale,
            xOffset: 0,
            yOffset: 0,
            rotation: [0, 0, 0],
            precision: 0.1,
          }}
          width={980}
          height={551}
          style={{
            width: '100%',
            height: 'auto',
          }}
        >
          <ZoomableGroup center={[centroids[data.code].centroid[0], centroids[data.code].centroid[1]]} disablePanning>
            <Geographies geography={geography} disableOptimization>
              {(geographies, projection): Array<JSX.Element> =>
                geographies.map((geography: any) => (
                  <Geography
                    key={geography.properties.NAME_1}
                    data-tip={`
                  <div class="tooltip-container">
                    <div class="tooltip-text">
                      <p>${geography.properties.NAME_1}</p>
                    </div>
                  </div>`}
                    geography={geography}
                    projection={projection}
                    style={{
                      default: {
                        fill: '#ffffff',
                        stroke: '#607D8B',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                      hover: {
                        fill: '#263238',
                        stroke: '#607D8B',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                      pressed: {
                        fill: '#ffffff',
                        stroke: '#607D8B',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
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
                    pressed: { fill: '#aaa' },
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
                  </div>`}
                    style={{
                      stroke: '#212529',
                      strokeWidth: 1,
                      opacity: 0.9,
                    }}
                  />
                </Marker>
              ))}
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
        <ReactTooltip html />
      </>
    );
  }
  return <Loading />;
};
