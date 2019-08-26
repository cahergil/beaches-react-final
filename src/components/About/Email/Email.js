// @flow
import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import ContactMail from '@material-ui/icons/ContactMail'

import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Title from './../Title';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    paddingBottom: '5rem'
  },
  contactRectangle: {
    height: '5vw',
    backgroundColor: '#fff'
  },
  contactEnvelope: {
    marginTop: '-1px',
    height: '10vw',
    backgroundImage:
      'linear-gradient(rgba(255,255,255,1), rgba(255,255,255,1))',
    clipPath: 'polygon(50% 10vw, 0 0, 100% 0)'
  },
  buttonStyle: {
    // to center the button on the screen
    textAlign: 'center',
    // marginBottom: '10rem'
  },
  rightIcon: {
    marginLeft: theme.spacing(2)
  }
}))

const Email = () => {
  const classes = useStyles();

  return (
    <section id="contact" className={classes.root}>
      <div className={classes.contactRectangle} />
      <div className={classes.contactEnvelope} />
      <Fade duration={600} right>
        <Title title="Contact Me" color="#fff" lineLength="10rem" />
      </Fade>

      <div className={classes.buttonStyle}>
        <Zoom duration={300} delay={1000} clear >
          <a
            style={{ textDecoration: 'none' }}
            href="mailto:chernandezgil@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outlined"
              color="secondary"
              style={{ width: '20rem', fontSize: '2rem' }}
            >
              Send EMail
              <ContactMail className={classes.rightIcon} />
            </Button>
          </a>
        </Zoom>
      </div>
    </section>
  );
  
}

export default Email;