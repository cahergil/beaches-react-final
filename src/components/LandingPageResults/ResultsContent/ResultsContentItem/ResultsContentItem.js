import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import { Typography,Button } from '@material-ui/core';
import ReactImageFallback from "react-image-fallback";

import banderaAzul from '../../../../assets/images/blue_flag_mini.png'
import normalBeach from '../../../../assets/images/normal_beach.png'
import errorImage from '../../../../assets/images/image_na.png'
import loaderGif from '../../../../assets/images/loader.gif'
import BeachObject from './../../../Model/Model';

const useStyles = makeStyles(theme=>({
  root: {
  },
  headerRoot: {
    backgroundColor: props => props.beach.bandera_azul !== 'Sí' ? theme.palette.secondary.light : theme.palette.primary.dark
  },
  card: {
    width: '35rem'
  },
  media: {
    // height: 0,
    // paddingTop: '56.25%', // 16:9
    objectFit: 'cover',
    height: '20rem',
    width: '100%'
  },
  title: {
    textAlign: 'left'

  },
  subheader: {
    color: props => props.beach.bandera_azul !=='Sí'? theme.palette.secondary.dark: theme.palette.primary.light,
    textAlign: 'left'
  },
  cardContent: {
    height: '13.2rem',
    overflowY: 'auto',
  }
}));

const ResultsContentItem = (props) => {
  const { beach } = props;
  const classes = useStyles(props);
  const imagesArray = beach.images.split(',');
  const image = imagesArray[imagesArray.length - 1];

  const handleButtonClick = (e) => {
   
    props.history.push({
      pathname: '/details/beach',
      search: `?id=${beach.id}`
    });
  }


  return (
    <Card
      className={classes.card}
      classes={{
        root: classes.root
      }}
    >

      <CardHeader
        avatar={
          <Avatar alt="bandera azul" src={beach.bandera_azul !== 'Sí' ? normalBeach : banderaAzul} className={classes.avatar}>
          </Avatar>
        }
        classes={
          {
            root: classes.headerRoot,
            subheader: classes.subheader,
            title: classes.title
          }
        }
       
        title={beach.nombre}
        subheader={beach.termino_municipal}
      />
       <ReactImageFallback
        src={image}
        fallbackImage={errorImage}
        initialImage={loaderGif}
        alt={beach.nombre}
        className={classes.media} />
    
      {/* <img src={image} alt="prueba" className={classes.media}/> */}
      {/* <CardMedia
        className={classes.media}
        image={image}
        title={`beach ${beach.nombre}`}
    />  */}
    
    <CardContent
      classes={{
        root: classes.cardContent
        }}
      >

        {/* color="textPrimary" */}
      <Typography align="left" variant="body2" component="p">
        {beach.descripcion}
      </Typography>
    </CardContent>
    <CardActions >
        <Button variant="outlined" color={beach.bandera_azul !== 'Sí' ? 'secondary': 'primary'} onClick={handleButtonClick}>
          Details
        </Button>
    </CardActions>
    </Card > 
  );
}
ResultsContentItem.propTypes = {
  beach: PropTypes.shape(BeachObject).isRequired
}

export default withRouter(ResultsContentItem);