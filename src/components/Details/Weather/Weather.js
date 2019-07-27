import React from 'react';
import { makeStyles } from '@material-ui/core';
import ReactWeather from 'react-open-weather';
import 'react-open-weather/lib/css/ReactWeather.css';

const useStyles = makeStyles({
  root: {

  }
});

const Weather = props => {
  const { city } = props
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ReactWeather
        forecast="5days"
        apikey="6cccf08fe6b547f0a6184407192707"
        type="city"
        city={city}
      />
    </div>
  );
}

export default Weather;