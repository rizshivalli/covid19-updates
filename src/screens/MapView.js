import React, { useEffect, useState } from "react";
import {
  Map as LeafletMap,
  GeoJSON as GeoJsonMap,
  Marker,
  Popup
} from "react-leaflet";
import worldGeoJSON from "geojson-world-map";
import "../styles/mapStyles.css";
import countryCode from "../utils/countrycode-latlong";
import "leaflet/dist/leaflet.css";
import { ChevronDown } from "react-feather";
import { Grid } from "@material-ui/core";

import L from "leaflet";
const customMarker = (ratio, rgb) =>
  new L.icon({
    iconUrl:
      "data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='25' cy='25' r='24' fill='%23" +
      rgb +
      "' fill-opacity='0.6' stroke='%23" +
      rgb +
      "' stroke-width='2'/%3E%3C/svg%3E%0A",
    iconSize: 5 * ratio,
    iconAnchor: [2.5 * ratio, 2.5 * ratio]
  });

const axios = require("axios");

const apiKey = "74666fb8famsh29671ce8aaa6c14p119c2ejsn26472c4cf0dc";

const MapView = () => {
  const [selected, setSelected] = useState("cases"),
    [data, setData] = useState([]),
    [dataTotal, setDataTotal] = useState([]),
    [center, setCenter] = useState([0, 0]),
    [zoom, setZoom] = useState(3);

  const handleChange = e => {
    setSelected(e.target.value);
  };

  const getMapData = () => {
    // Cases by country
    axios
      .get(
        "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
        {
          headers: {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": apiKey
          }
        }
      )
      .then(response => {
        setData(response.data.countries_stat);
      })
      .catch(err => {
        console.log(err);
      });

    // Stats panel
    axios
      .get(
        "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php",
        {
          headers: {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": apiKey
          }
        }
      )
      .then(response => {
        setDataTotal(response.data);
      })

      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMapData();
  }, []);

  return (
    <Grid container>
      <LeafletMap
        center={[0, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={3}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
        style={{
          height: "70vh",
          backgroundColor: "#01011a"
        }}
      >
        <GeoJsonMap
          data={worldGeoJSON}
          style={() => ({
            weight: 0.5,
            color: "#292929",
            fillColor: "rgb(65, 65, 65)",
            fillOpacity: 1
          })}
        />
        {data.map((value, index) => {
          let cases = value.cases.replace(/,/g, "");
          let recovered = value.total_recovered.replace(/,/g, "");
          let active = value.active_cases.replace(/,/g, "");
          let deaths = value.deaths.replace(/,/g, "");
          var cases_ratio = 0;
          var rgb = "";
          if (selected === "cases") {
            cases_ratio = Math.pow(cases, 0.2);
            rgb = "a9002a";
          } else if (selected === "active") {
            cases_ratio = Math.pow(active, 0.2);
            rgb = "ffc107";
          } else if (selected === "recovered") {
            cases_ratio = Math.pow(recovered, 0.2);
            rgb = "28a745";
          } else {
            cases_ratio = Math.pow(deaths, 0.2);
            rgb = "9c9c9c";
          }
          return countryCode.find(el => el.name === value.country_name) ? (
            <Marker
              key={index}
              position={
                countryCode.find(el => el.name === value.country_name) &&
                countryCode.find(el => el.name === value.country_name).latlng
              }
              icon={customMarker(cases_ratio, rgb)}
            >
              <Popup className={"popup"} style={{ backgroundColor: "black" }}>
                <h1>{value.country_name}</h1>
                <p>
                  <b>Cases: </b>{" "}
                  <span style={{ color: "#A90000" }}>{value.cases}</span>
                </p>
                <p>
                  <b>New cases: </b>{" "}
                  <span style={{ color: "#A90000" }}>{value.new_cases}</span>
                </p>
                <p>
                  <b>Recovered: </b>{" "}
                  <span style={{ color: "#28a745" }}>
                    {value.total_recovered}
                  </span>
                </p>
                <p>
                  <b>Active: </b>{" "}
                  <span style={{ color: "#ffc107" }}>{value.active_cases}</span>
                </p>
                <p>
                  <b>Deaths: </b> {value.deaths}
                </p>
                <p>
                  <b>New deaths: </b> {value.new_deaths}
                </p>
                <p>
                  <b>Critical: </b> {value.serious_critical}
                </p>
                <p>
                  <b>Per 1m: </b>
                  {value.total_cases_per_1m_population}
                </p>
              </Popup>
            </Marker>
          ) : (
            console.log("Lat/Lng - Country not found : " + value.country_name)
          );
        })}
      </LeafletMap>
      <div id="attributions">
        &copy;{" "}
        <a target="blank" href="http://osm.org/copyright">
          OpenStreetMap
        </a>{" "}
        contributors | Data from{" "}
        <a target="blank" href="https://coronavirus-monitor.p.rapidapi.com/">
          rapidapi
        </a>{" "}
        | I am not responsible for the veracity of the information provided |
        Developed by{" "}
        <a target="blank" href="https://github.com/rizshivalli/covid19-updates">
          Rizwan Shivalli
        </a>
      </div>
      <div className="info-box" id="choices_desktop">
        <ul>
          <li
            className={selected === "cases" ? "active" : undefined}
            onClick={() => {
              setSelected("cases");
            }}
          >
            Cases
          </li>
          <li
            className={selected === "active" ? "active" : undefined}
            onClick={() => {
              setSelected("active");
            }}
          >
            Active
          </li>
          <li
            className={selected === "recovered" ? "active" : undefined}
            onClick={() => {
              setSelected("recovered");
            }}
          >
            Recovered
          </li>
          <li
            className={selected === "deaths" ? "active" : undefined}
            onClick={() => {
              setSelected("deaths");
            }}
          >
            Deaths
          </li>
        </ul>
      </div>
      <div className="info-box" id="total">
        <b>
          Note: Data and Map might not be accurate because it is fetched from
          open sources
        </b>
        <p></p>
        <p>
          <b>New cases </b>
          <span style={{ color: "#A90000" }}>{dataTotal.new_cases}</span>
        </p>
        <p>
          <b>Total recovered </b>
          <span style={{ color: "#28a745" }}>{dataTotal.total_recovered}</span>
        </p>
        <p>
          <b>Total deaths </b>
          <span>{dataTotal.total_deaths}</span>
        </p>
        <p>
          <b>New deaths </b>
          <span>{dataTotal.new_deaths}</span>
        </p>
        <div className="select">
          <label htmlFor="select">
            <b>Choose a view</b>
          </label>
          <div id="select">
            <select value={selected} name="select" onChange={handleChange}>
              <option value="cases">Cases</option>
              <option value="active">Active</option>
              <option value="recovered">Recovered</option>
              <option value="deaths">Deaths</option>
            </select>
            <ChevronDown size={"150px"} color="red" />
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default MapView;
