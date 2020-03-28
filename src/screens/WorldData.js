import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";

import axios from "axios";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import "../index.css";
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
const WorldData = () => {
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
  const [worldData, setWorldData] = useState({});

  useEffect(() => {
    axios.get("https://corona.lmao.ninja/all").then(res => {
      console.log("res", res.data);
      setWorldData(res.data);
      //   setDate(res.data.updated);
    });
  }, []);
  return (
    <Grid container style={{ background: "black" }}>
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
    </Grid>
  );
};

export default WorldData;
