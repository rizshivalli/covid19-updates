import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  CircularProgress
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import axios from "axios";
import "./index.css";
import countryCode from "./code";

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
export default function App() {
  const [countryData, setCountryData] = useState([]);
  const [worldData, setWorldData] = useState({});
  const [date, setDate] = useState(1584724653093);
  const [search, setSearch] = useState("");
  const classes = useStyles();
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

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    axios.get("https://corona.lmao.ninja/countries").then(res => {
      setCountryData([...res.data]);
      console.log({ res });
    });

    axios.get("https://corona.lmao.ninja/all").then(res => {
      console.log("res", res.data);
      setWorldData(res.data);
      setDate(res.data.updated);
    });
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  let data = countryData;
  var updatedDate = new Date(date);
  var day =
    updatedDate.getDate() +
    "-" +
    (updatedDate.getMonth() + 1) +
    "-" +
    updatedDate.getFullYear();
  var time = updatedDate.getHours() + " : " + updatedDate.getMinutes();

  if (search.length > 0) {
    let searchResult = countryData.filter(item =>
      item.country.toLowerCase().includes(search.toLowerCase())
    );
    data = searchResult;
  } else {
    data = countryData;
  }

  return (
    <Container maxWidth="lg" className="app-container">
      {countryData.length > 0 ? (
        <Grid container>
          <AppBar
            position="static"
            color="transparent"
            style={{ marginBottom: "1%" }}
          >
            <Toolbar>
              <Typography variant="h6" className={classes.root}>
                corona.org.in
              </Typography>
              <IconButton
                href="https://github.com/rizshivalli/covid19-updates"
                target="_blank"
              >
                <GitHubIcon style={{ color: "white" }} />
              </IconButton>
            </Toolbar>
          </AppBar>

          <Grid item md={4} xs={12} style={{ marginRight: "10px" }}>
            <h1 className="heading-one">COVID19 </h1>
            <h1 className="heading-two">UPDATES </h1>
          </Grid>

          <Grid item md={7} xs={12} style={styles.flexEnd}>
            <Grid container>
              <Grid item md={3} xs={4}>
                <div className="world-data-item">
                  <div>
                    <p className="caption" style={styles.totalColor}>
                      Total Cases
                    </p>
                    <p className="title-large" style={styles.totalColor}>
                      {worldData.cases}
                    </p>
                  </div>
                </div>
              </Grid>
              <Grid item md={3} xs={4}>
                <div className="world-data-item">
                  <div>
                    <p className="caption" style={styles.recoveryColor}>
                      Recovery Rate
                    </p>
                    <p className="title-large" style={styles.recoveryColor}>
                      {(
                        Math.round(
                          ((100 * worldData.recovered) / worldData.cases) * 100
                        ) / 100
                      ).toFixed(2)}{" "}
                      %
                    </p>
                  </div>
                </div>
              </Grid>

              <Grid item md={3} xs={4}>
                <div className="world-data-item">
                  <div>
                    <p className="caption" style={styles.deathRateColor}>
                      Death Rate
                    </p>
                    <p className="title-large" style={styles.deathRateColor}>
                      {Math.round(
                        ((100 * worldData.deaths) / worldData.cases) * 100
                      ) / 100}{" "}
                      %
                    </p>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={12}>
            <input
              className="input-box"
              placeholder="Search Country...."
              onChange={handleChange}
            />
          </Grid>

          <Grid item md={12} xs={12} className="heading-wrapper">
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
                <p className="caption">Death</p>
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

          <Grid item xs={12} md={12} className="footer">
            <div>
              <p className="footer-text">
                Source from{" "}
                <a target="blank" href="https://www.worldometers.info">
                  worldometers.info
                </a>
              </p>
              <p className="footer-text">
                API from{" "}
                <a target="blank" href="https://www.programmableweb.com/">
                  programmableweb.com
                </a>
              </p>
              <p className="footer-text">
                Created by{" "}
                <a target="blank" href="http://linkedin.com/in/muqsithck">
                  {" "}
                  Abdul Muqsith
                </a>{" "}
                and{" "}
                <a target="blank" href="https://rizwanshivalli.me">
                  Rizwan Shivalli
                </a>
              </p>
            </div>
          </Grid>

          <div className="app-wrapper"></div>
        </Grid>
      ) : (
        <Grid className="loading-screen">
          <CircularProgress size={100} thickness={4} />
        </Grid>
      )}
    </Container>
  );
}
