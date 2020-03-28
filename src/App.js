import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import TableView from "./screens/TableView";
import WorldData from "./screens/WorldData";
import MapView from "./screens/MapView";
import CovidTest from "./screens/CovidTest";
import { GithubIcon, Footer, TabPanel } from "./components";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function App() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <WorldData />
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          style={{ background: "red" }}
          variant="scrollable"
          scrollButtons="on"
        >
          <Tab label="World Map" {...a11yProps(0)} />
          <Tab label="Table View" {...a11yProps(1)} />
          <Tab label="Can I get a COVID-19 test?" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} style={{ background: "black" }}>
        <MapView />
      </TabPanel>
      <TabPanel value={value} index={1} style={{ background: "black" }}>
        <TableView />
      </TabPanel>
      <TabPanel value={value} index={2} style={{ background: "black" }}>
        <CovidTest />
      </TabPanel>
      <GithubIcon />
      <Footer />
    </div>
  );
}
