import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "react-flag-icon-css";
import { Nav, NavItem, Col } from "reactstrap";

import HoverMap from "./hovermap";
import CountryTable from "./countrytable";
import { ErrorBoundary } from "./errorboundary";
import { Loading } from "./loading";

import { fetchCountries } from "../actions/map";

const regions = [
  "All",
  "Africa",
  "Asia",
  "Europe",
  "Oceania",
  "North America",
  "South America"
];

function Map({ countries, dispatch, username }) {
  const [region, setRegion] = useState("All");

  useEffect(() => {
    if (username !== "") {
      dispatch(fetchCountries(username));
    }
  }, [dispatch, username]);

  if (!countries.length) {
    return <Loading />;
  }

  return (
    <>
      <Col xs="12">
        <Nav pills horizontal="center" className="user-tabs">
          {regions.map((value, index) => {
            return (
              <NavItem className={value === region ? "active user-nav-tab" : ""} key={index} onClick={() => setRegion(value)}>
                <span className="nav-link user-nav-link  user-nav-tab">{value}</span>
              </NavItem>
            );
          })}
        </Nav>
      </Col>
      <Col xs="12">
        <ErrorBoundary>
          <HoverMap countries={countries} interactive={true} region={region} />
        </ErrorBoundary>
      </Col>
      <Col xs="12">
        <ErrorBoundary>
          <CountryTable countries={countries} />
        </ErrorBoundary>
      </Col>
    </>
  );
}

const mapStateToProps = state => {
  return {
    countries: state.countries
  };
};

export default connect(mapStateToProps)(Map);
