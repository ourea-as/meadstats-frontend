import React from "react";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import { Progress } from "reactstrap";

import "./table.css";

function nameFormatter(cell, row) {
  return (
    <span className="table-flex">
      <img className="beertable-image" alt="Beer Logo" src={row.label} />
      <div>
        <span className="table-twoline-main">{cell}</span>
        <span className="table-twoline-sub">{row.brewery.name}</span>
      </div>
    </span>
  );
}

function ratingFormatter(cell) {
  if (cell === 0) {
    return <span>No rating</span>;
  }
  return (
    <Progress value={cell} max={5} color="dark">
      {cell.toFixed(2)}
    </Progress>
  );
}

function abvFormatter(cell) {
  return cell.toFixed(1) + "%";
}

function styleFormatter(cell) {
  if (cell.includes("-") > -1) {
    const splitted = cell.split(" - ");
    return (
      <div>
        <span className="table-twoline-main">{splitted[0]}</span>
        <span className="table-twoline-sub">{splitted[1]}</span>
      </div>
    );
  } else {
    return (
      <div>
        <span className="table-twoline-main">{cell}</span>
      </div>
    );
  }
}

const columns = [
  {
    dataField: "name",
    text: "Name",
    sort: true,
    formatter: nameFormatter
  },
  {
    dataField: "style",
    text: "Style",
    sort: true,
    formatter: styleFormatter
  },
  {
    dataField: "abv",
    text: "ABV",
    sort: true,
    formatter: abvFormatter
  },
  {
    dataField: "userRating",
    text: "Rating",
    sort: true,
    formatter: ratingFormatter
  },
  {
    dataField: "rating",
    text: "Global Rating",
    sort: true,
    formatter: ratingFormatter
  }
];

const defaultSorted = [
  {
    dataField: "rating",
    order: "desc"
  }
];

export const BeerTable = ({ beers }) => (
  <BootstrapTable
    bootstrap4
    bordered={false}
    keyField="id"
    data={beers}
    columns={columns}
    defaultSorted={defaultSorted}
    wrapperClasses="table-responsive"
  />
);
