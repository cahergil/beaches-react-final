import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Stack from './Stack/Stack';
import Attribution from './Attribution/Attribution';
import Email from './Email/Email';
import NavDrawer from './../Navigation/NavDrawer';

const useStyle = makeStyles({
  root: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '100%',
    // gridRowGap: '2rem'
  }
});

const About = props => {
  const classes = useStyle();
  return (
    <React.Fragment>
      <NavDrawer />
      <section className={classes.root}>
        <Stack />
        <Attribution />
        <Email />
      </section>
    </React.Fragment>
      
  );
}

export default About;

