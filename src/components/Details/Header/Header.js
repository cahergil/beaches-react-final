import React from 'react';
import { makeStyles } from '@material-ui/core';

import bannerNormal from '../../../assets/images/beachBannerNormal.jpg';
import bannerBlueFlag from '../../../assets/images/beachBannerBlueFlag.jpg';

const useStyles = makeStyles({
  root: {
    width: '100%',
    textAlign: 'center',
    fontSize: '4rem',
    opacity: '0.87',
    height: '20rem',
    backgroundImage: props => props.isBlueFlag ? `url(${bannerBlueFlag})` : `url(${bannerNormal})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    boxShadow: '0 1.5rem 3rem rgba(0,0,0,0.20);',
    display: 'grid',
    gridTemplateRows: 'repeat(3, 30px)',
    gridRowGap: '6rem',
    paddingTop: '3rem'
  },
  beachName: {
    fontSize: '6rem',
    opacity: '0.87',
    color: props => props.colorSchema.backgroundColor
  }
})

const Header = (props) => {
  const classes = useStyles(props);
  
  return (
    <section className={classes.root}>
      <div style={{color: '#fff'}}>Beach</div>
      <div className={classes.beachName}>{props.name}</div>
    </section>
  );
}

export default Header;