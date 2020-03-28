import React from "react";
import { Grid } from "@material-ui/core";
import { CovidTypography } from "../components";

const WHOInformation =
  "Most people infected with the COVID-19 virus will experience mild to moderate respiratory illness and recover without requiring special treatment.  Older people, and those with underlying medical problems like cardiovascular disease, diabetes, chronic respiratory disease, and cancer are more likely to develop serious illness. \n The best way to prevent and slow down transmission is be well informed about the COVID-19 virus, the disease it causes and how it spreads. Protect yourself and others from infection by washing your hands or using an alcohol based rub frequently and not touching your face. The COVID-19 virus spreads primarily through droplets of saliva or discharge from the nose when an infected person coughs or sneezes, so it’s important that you also practice respiratory etiquette (for example, by coughing into a flexed elbow). At this time, there are no specific vaccines or treatments for COVID-19. However, there are many ongoing clinical trials evaluating potential treatments. WHO will continue to provide updated information as soon as clinical findings become available. Stay informed";

const testInformation =
  "Check whether you can get the COVID-19 (Coronavirus) test";

const CovidTest = () => {
  return (
    <Grid>
      <CovidTypography text="What is Coronavirus?" variant="h2" />

      <Grid container>
        <Grid item xs={12}>
          <CovidTypography
            text="Coronavirus disease (COVID-19) is an infectious disease caused by a newly discovered coronavirus."
            variant="h5"
            align="center"
          />
        </Grid>
        <CovidTypography text={WHOInformation} variant="h5" />
      </Grid>
      <Grid container style={{ margin: 20 }}>
        <Grid item xs={12}>
          <CovidTypography text="Can I get a Covid-19 test?" variant="h2" />
          <CovidTypography text={testInformation} variant="h5" />
          <Grid item style={{ alignItems: "center" }}>
            <a target="blank" href="https://dr-c.in/WG8fD/">
              <CovidTypography
                text="Click here to check your eligibility"
                variant="h5"
              />
            </a>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CovidTest;
