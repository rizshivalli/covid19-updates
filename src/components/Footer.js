import React from "react";
import { Grid } from "@material-ui/core";

const Footer = () => {
  return (
    <Grid
      item
      xs={12}
      md={12}
      className="footer"
      style={{ background: "black" }}
    >
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
          </a>{" "}
          and{" "}
          <a target="blank" href="https://rapidapi.com/">
            rapidapi
          </a>
        </p>
        <p className="footer-text">
          Created by{" "}
          <a target="blank" href="https://rizwanshivalli.me">
            Rizwan Shivalli
          </a>
        </p>
      </div>
    </Grid>
  );
};

export default Footer;
