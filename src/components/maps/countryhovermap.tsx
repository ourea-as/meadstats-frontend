import React, { useState, useEffect, useCallback } from 'react';

import axios from 'axios';
import { ComposableMap, Geographies, Geography, Markers, Marker, ZoomableGroup, Point } from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import * as TopoJSON from 'topojson-specification';
import { Spring, config } from 'react-spring/renderprops';

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
  [index: string]: {
    centroid: number[];
    scale: number;
    regions?: { [index: string]: { centroid: number[]; scale: number } };
  };
} = centroidsJson;

const CountryHoverMap: React.FC<CountryHoverMapProps> = ({ data }): JSX.Element => {
  const [geography, setGeography] = useState<TopoJSON.Topology>();
  const [scale, setScale] = useState<number>(100);
  const [centroid, setCentroid] = useState<Point>([0, 0]);
  const [error, setError] = useState('');
  const [selectedAreaCode, setSelectedAreaCode] = useState('');

  const zoomToWholeCountry = useCallback((): void => {
    if (data) {
      setCentroid([centroids[data.code].centroid[0], centroids[data.code].centroid[1]]);
      setScale(centroids[data.code].scale);
    }
  }, [data]);

  const handleMapClick = useCallback(
    (geography: any): void => {
      if (selectedAreaCode === geography.properties.NAME_1) {
        zoomToWholeCountry();
        setSelectedAreaCode('');
        return;
      }

      if (
        data &&
        centroidsJson[data.code].regions !== undefined &&
        centroidsJson[data.code].regions[geography.properties.NAME_1] !== undefined
      ) {
        setSelectedAreaCode(geography.properties.NAME_1);
        setScale(centroidsJson[data.code].regions[geography.properties.NAME_1].scale);
        setCentroid(centroidsJson[data.code].regions[geography.properties.NAME_1].centroid);
      }
    },
    [data, selectedAreaCode, zoomToWholeCountry],
  );

  useEffect(() => {
    if (data) {
      setError('');

      zoomToWholeCountry();

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
  }, [data, zoomToWholeCountry]);

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
        <Spring to={{ centroid: centroid, scale: scale }} config={config.slow}>
          {props => (
            <ComposableMap
              projectionConfig={{
                scale: props.scale,
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
              <ZoomableGroup center={props.centroid} disablePanning>
                <Geographies geography={geography} disableOptimization>
                  {(geographies, projection): Array<JSX.Element> =>
                    geographies.map((geography: any, i: number) => (
                      <Geography
                        key={geography.properties.NAME_1 + i}
                        data-tip={`
                            <div class="tooltip-container">
                              <div class="tooltip-text">
                                <p>${geography.properties.NAME_1}</p>
                              </div>
                            </div>`}
                        geography={geography}
                        projection={projection}
                        onClick={handleMapClick}
                        style={{
                          default: {
                            cursor: 'pointer',
                            fill: '#ffffff',
                            stroke: '#607D8B',
                            strokeWidth: 0.75,
                            outline: 'none',
                          },
                          hover: {
                            cursor: 'pointer',
                            fill: '#263238',
                            stroke: '#607D8B',
                            strokeWidth: 0.75,
                            outline: 'none',
                          },
                          pressed: {
                            cursor: 'pointer',
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
          )}
        </Spring>
        <ReactTooltip html />
      </>
    );
  }
  return <Loading />;
};

export default CountryHoverMap;
