import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
  cardContents: {
    background: "linear-gradient(to right, #ece9e6, #ffffff)",
    textAlign: "center"
  },
  textColor: {
    color: " #581845 "
  }
}));

const WorldWideCases = props => {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();

  const [globalData, setGlobalData] = useState([]);
  useEffect(() => {
    let url = process.env.REACT_APP_PROD_API_URL;
    axios
      .get(`${url}all`, {
        headers: { "Access-Control-Allow-Origin": "*" }
      })
      .then(res => {
        if (res.status === 200) {
          setGlobalData(res.data);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Grid item>
      <Card>
        <CardContent className={classes.cardContents}>
          <Typography
            className={classes.textColor}
            variant={matchesMD ? "h5" : "h3"}
          >
            Cases WorldWide
          </Typography>
          <hr />
          {Object.entries(globalData).length === 0 ? (
            <Typography variant="h6">Loading...</Typography>
          ) : (
            Object.entries(globalData).map(([key, value]) => {
              return (
                <Typography
                  style={{ color: " #C70039 ", fontWeight: "bold" }}
                  key={key}
                  variant={matchesMD ? "h6" : "h5"}
                >
                  {key} : {value}
                </Typography>
              );
            })
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default WorldWideCases;
