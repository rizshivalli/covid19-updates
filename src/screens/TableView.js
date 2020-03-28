import React, { useEffect, useState, Fragment } from "react";
import {
  Grid,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  CircularProgress,
  Tabs,
  Tab
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import axios from "axios";
import "../styles/tableStyles.css";
import countryCode from "../utils/code";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    }
  })
);
export default function TableView() {
  const [countryData, setCountryData] = useState([]),
    [search, setSearch] = useState("");
  const styles = {
    flexEnd: {
      display: "flex",
      alignItems: "flex-end"
    },
    recoveryColor: { color: "#27ae60" },
    totalColor: { color: "#f1c40f" },
    deathRateColor: { color: "#e74c3c" },
    flagStyles: { margin: "3px", marginRight: "20px" }
  };

  useEffect(() => {
    axios.get("https://corona.lmao.ninja/countries").then(res => {
      setCountryData([...res.data]);
    });
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  let data = countryData;
  if (search.length > 0) {
    let searchResult = countryData.filter(item =>
      item.country.toLowerCase().includes(search.toLowerCase())
    );
    data = searchResult;
  } else {
    data = countryData;
  }

  return (
    <Fragment>
      {" "}
      {countryData.length > 0 ? (
        <Grid container style={{ background: "black" }}>
          <Grid item md={12}>
            <input
              className="input-box"
              placeholder="Search Country...."
              onChange={handleChange}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <Grid container>
              <Grid item xs={12} md={2} className="flex-start">
                <p className="caption">Country</p>
              </Grid>

              <Grid item md={2} xs={2} className="flex-start">
                <p className="caption">Cases</p>
              </Grid>

              <Grid item md={2} xs={2} className="flex-start">
                <p className="caption">Recovered</p>
              </Grid>

              <Grid item md={2} xs={2} className="flex-start">
                <p className="caption">Recovery Rate</p>
              </Grid>

              <Grid item md={2} xs={2} className="flex-start">
                <p className="caption">Deaths</p>
              </Grid>
              <Grid item md={2} xs={2} className="flex-start">
                <p className="caption">Death Rate</p>
              </Grid>
            </Grid>
          </Grid>

          {data.length > 0 ? (
            data.map((item, index) => {
              let recoveredRate = (
                Math.round(((100 * item.recovered) / item.cases) * 100) / 100
              ).toFixed(2);
              let deathsRate = (
                Math.round(((100 * item.deaths) / item.cases) * 100) / 100
              ).toFixed(2);
              const nationCode = countryCode.find(name => {
                return name.Name === item.country;
              });

              let image = `https://www.countryflags.io/${
                nationCode ? nationCode.Code : null
              }/shiny/64.png`;

              return (
                <Grid key={index} item md={12}>
                  <Grid container>
                    <Grid item xs={12} md={2} className="flex-start">
                      <img
                        src={image}
                        width="50px"
                        alt="flag"
                        style={styles.flagStyles}
                      />
                      <p className="title">{item.country}</p>
                    </Grid>
                    <Grid item xs={3} md={2} className="flex-start">
                      <div
                        className="country-data-item"
                        style={{ backgroundColor: "#f1c40f" }}
                      >
                        <div>
                          <p className="caption text-hide">Cases</p>
                          <p className="title">{item.cases}</p>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={3} md={2} className="flex-start">
                      <div className="country-data-item">
                        <div>
                          <p className="caption text-hide">Recovered</p>
                          <p className="title">{item.recovered}</p>{" "}
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={3} md={2} className="flex-start">
                      <div
                        className="country-data-item"
                        style={{ backgroundColor: "#27ae60" }}
                      >
                        <div>
                          <p className="caption text-hide">Recovery</p>
                          <p className="title">{recoveredRate} %</p>{" "}
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={3} md={2} className="flex-start">
                      <div
                        className="country-data-item"
                        style={{ backgroundColor: "#e74c3c" }}
                      >
                        <div>
                          <p className="caption text-hide">Death</p>
                          <p className="title">{item.deaths} </p>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={3} md={2} className="flex-start">
                      <div
                        className="country-data-item"
                        style={{ backgroundColor: "#e74c3c" }}
                      >
                        <div>
                          <p className="caption text-hide">Death Rate</p>
                          <p className="title">{deathsRate} %</p>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })
          ) : (
            <p className="footer-text">No results</p>
          )}
          <div className="app-wrapper"></div>
        </Grid>
      ) : (
        <Grid className="loading-screen">
          <CircularProgress size={100} thickness={4} />
        </Grid>
      )}
    </Fragment>
  );
}
