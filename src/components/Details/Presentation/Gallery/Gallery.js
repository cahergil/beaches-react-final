// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import ImageGallery from 'react-image-gallery';


const useStyles = makeStyles(theme => ({
  root: {
    '& .image-gallery-slide img': {
      width: '100%',
      height: '40rem',
      objectFit: 'cover'
    },
  },
  thumbnailClassBig: {
    maxWidth: '10rem',
    [theme.breakpoints.down(500)]: {
      display: 'none'
    },
    [theme.breakpoints.down(800)]: {
      maxWidth: '8rem'
    }
  },
  thumbnailClassSmall: {
    maxWidth: '8rem',
    [theme.breakpoints.down(500)]: {
      display: 'none'
    },
    [theme.breakpoints.down(800)]: {
      maxWidth: '5rem'
    }
    
  },
  thumbnailClassExtraSmall: {
    maxWidth: '6rem',
    [theme.breakpoints.up(800)]: {
      display: 'none'
    },
    [theme.breakpoints.down(500)]: {
      display: 'none'
    },
    [theme.breakpoints.down(800)]: {
      maxWidth: '4rem'
    }
  },
}));
type Props = {
  images: string
}
const Gallery = (props: Props) => {
  const { images } = props;
  const classes = useStyles();
  const imagesArray = [];
  let img = images.split(',').slice(1);
  let thumbnailClass = classes.thumbnailClassBig;
  if (img.length >= 10) {
    thumbnailClass = classes.thumbnailClassExtraSmall;
  } else if (img.length >= 6) {
    thumbnailClass = classes.thumbnailClassSmall;
  }
  img.forEach((element: string) => {
    imagesArray.push({ original: element, thumbnail: element, thumbnailClass: thumbnailClass })
  });

  return (
    <section className={`${classes.root}`}>
    
      <ImageGallery
        showBullets={true}
        items={imagesArray} />  
     
    </section>
  );
}

Gallery.propTypes = {
  images: PropTypes.string.isRequired
}

export default Gallery;