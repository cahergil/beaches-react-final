import React from 'react';
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


const useStyles = makeStyles({
  root: {

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
    color: '#777',
    textAlign: 'left'
  },
  cardContent: {
    height: '13.2rem',
    overflowY: 'auto'

  }
});

const ResultsContentItem = (props) => {
  const { beach } = props;
  const classes = useStyles();
  const imagesArray = beach.images.split(',');
  const image = imagesArray[imagesArray.length - 1];

  


  return (
    <Card className={classes.card}>

      <CardHeader
        avatar={
          <Avatar alt="bandera azul" src={beach.bandera_azul !== 'Sí' ? normalBeach : banderaAzul} className={classes.avatar}>

          </Avatar>
        }
        classes={
          {
            subheader: classes.subheader,
            title: classes.title
          }
        }
        // style={{ textAlign: 'left' }}
        title={beach.nombre}
        subheader={beach.termino_municipal}
      />
   

       <ReactImageFallback
         src={image}
         fallbackImage={errorImage}
         alt="cool image should be here"

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
      <Typography align="left" variant="body2" color="textSecondary" component="p">
        {beach.descripcion}
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
        <Button variant="outlined" color="primary">
          Details
        </Button>
    </CardActions>
    </Card > 
  );
}

export default ResultsContentItem;