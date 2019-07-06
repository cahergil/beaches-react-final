import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import ImageGallery from 'react-image-gallery';


const useStyles = makeStyles({
  root: {
    '& .image-gallery-slide img': {
      width: '100%',
      height: '40rem',
      objectFit: 'cover'
    }
  }
})

const Gallery = props => {
  const { images } = props;
  const classes = useStyles();
  const imagesArray = [];
  let img = images.split(',').slice(1);
  img.forEach(element => {
    imagesArray.push({original: element, thumbnail: element })
  });

  return (
    <section className={`${classes.root}`}>
    
      <ImageGallery showBullets={true} items={imagesArray} />  
     
    </section>
  );
}

Gallery.propTypes = {
  images: PropTypes.string.isRequired
}

export default Gallery;