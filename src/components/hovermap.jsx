import React from "react";
import { withRouter } from "react-router-dom";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";

import Data from "../assets/maps/world.json";

import "./tooltip.css";

const regionCenter = {
  World: [0, 20],
  Africa: [17, 3],
  Asia: [80, 25],
  Europe: [20, 56],
  "North America": [-102, 45],
  Oceania: [140, -26],
  "South America": [-58, -23]
};

const regionScale = {
  World: 205,
  Africa: 450,
  Asia: 450,
  Europe: 450,
  "North America": 420,
  Oceania: 450,
  "South America": 450
};

class HoverMap extends React.Component {
  constructor(props) {
    super(props);

    this.handleMapClick = this.handleMapClick.bind(this);
  }

  handleMapClick(geography, evt) {
    if (this.props.interactive) {
      this.props.history.push("map/" + geography.properties.iso_a2);
    }
  }

  render() {
    const popScale = scaleLinear()
      .domain([0, 10, 200])
      .range(["#CFD8DC", "#607D8B", "#37474F"]);

    const { countries } = this.props;

    const countriesMap = {};

    countries.forEach(country => {
      countriesMap[country.code.toUpperCase()] = country.count;
    });

    return (
      <>
        <ComposableMap
          projectionConfig={{
            scale: regionScale[this.props.region],
            rotation: [-11, 0, 0]
          }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto"
          }}
        >
          <ZoomableGroup
            center={regionCenter[this.props.region]}
            disablePanning
          >
            <Geographies geography={Data} disableOptimization>
              {(geographies, projection) =>
                geographies
                  .filter(
                    geography =>
                      this.props.region === "World" ||
                      geography.properties.continent === this.props.region
                  )
                  .map((geography, i) => (
                    <Geography
                      key={i}
                      data-tip={`
                    <div class="tooltip-container">
                      <div class="tooltip-text">
                        <p>${geography.properties.name}</p>
                        <p>${
                          countriesMap[
                            geography.properties.iso_a2.toUpperCase()
                          ]
                            ? countriesMap[
                                geography.properties.iso_a2.toUpperCase()
                              ]
                            : "0"
                        } unique</p>
                      </div>
                    </div>`}
                      geography={geography}
                      projection={projection}
                      onClick={this.handleMapClick}
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
                            : "#ffffff",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none"
                        },
                        hover: {
                          fill: "#263238",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none"
                        },
                        pressed: {
                          fill: "#263238",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none"
                        }
                      }}
                    />
                  ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        <ReactTooltip html={true} />
      </>
    );
  }
}

export default withRouter(HoverMap);
