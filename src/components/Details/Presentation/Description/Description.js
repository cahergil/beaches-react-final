import React, { useState} from 'react';

import { makeStyles, Button, withStyles } from '@material-ui/core';
import Title from './../../Title/Title';
import { green } from '@material-ui/core/colors';


const useStyles = makeStyles(theme =>({
  root: {
    gridColumn: '1 / span 2',
    fontSize: '2rem',
    margin: '2rem',
    [theme.breakpoints.down(800)]: {
      // gridTemplateColumns: '100%',
      // gridTemplateRows: 'repeat(3,min-content)',
      // gridColumnGap: '0rem',
      // gridRowGap: '2rem'
      gridColumn: '1 / span 1'
    } 
  },
  sectionRoot: {
    width: '100%',
    display: 'grid',
    gridTemplateRows: 'repeat(2, min-content)',
    // gridRowGap: '2rem',
    // padding: '1rem',
    boxShadow: '2px 1px 5px #ccc',
    borderRadius: '5px',
    overflow: 'hidden'
  },
  description: {
    margin: '1.5rem',
    opacity: '0.6'
  },
  button: {
    margin: '1rem'
  }
}))
const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);


const Description = props => {
  const { description, colorSchema } = props;
  const [translatedDescription, setTranslatedDescription] = useState({text:description ,translated: false})
  const classes = useStyles();
  const handlerTranslate = () => {
    let fromLang = 'es';
    let toLang = 'en'
    let text = translatedDescription.text;
    const API_KEY = 'AIzaSyCKOeL1RQS5BNIKgPQMuBl8jy30MkuyShA';
    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    url += '&q=' + encodeURI(text);
    url += `&source=${fromLang}`;
    url += `&target=${toLang}`;
    // console.log(url);
    fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then((response) => {
        console.log("response from google: ", response);
        setTranslatedDescription({
          text: response.data.translations[0].translatedText,
          translated: true
        })
      })
      .catch(error => {
        console.log("There was an error with the translation request: ", error);
        setTranslatedDescription({
          text: description,
          translated: false
        });
      });
    
  }
  return (
    <section className={classes.root}>
      <div className={classes.sectionRoot}>
        <Title colorSchema={colorSchema} name="Description" />
        <div>
          <div className={classes.description}>{translatedDescription.text}</div>
          <ColorButton
            variant="outlined"
            disabled={translatedDescription.translated}
            onClick={handlerTranslate}
            color="secondary"
            className={classes.button}
          >
            Translate
          </ColorButton>
            
        </div>
      
      </div> 
    </section>
  );
}

export default Description;