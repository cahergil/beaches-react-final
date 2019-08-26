//@flow
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import scrollIntoView from 'scroll-into-view';

import Stack from '../../components/About/Stack/Stack';
import Attribution from '../../components/About/Attribution/Attribution';
import Email from '../../components/About/Email/Email';

const useStyle = makeStyles({
  root: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '100%',

  }
});

const About = () => {
  
  const classes = useStyle();
  useEffect(() => {
    const element = document.getElementById('navbar');
    if (element) {
      scrollIntoView(element, {
        time: 0
        
      });
      
    }
  }, []);
  return (
    <React.Fragment>
     
      <section className={classes.root}>
        <Stack />
        <Attribution />
        <Email />
      </section>
    </React.Fragment>
      
  );
}




export default About;

