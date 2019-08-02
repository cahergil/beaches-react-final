import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { withStyles, Button, makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles({
  
  description: {
    margin: '1.5rem',
    opacity: '0.6'
  },
  button: {
    margin: '1rem'
  }
});

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

const TranslateTextField = React.memo(({text}) => {
  const classes = useStyles();
  const [translatedText, setTranslatedText] = useState(text);
  const [isTextTranslated, setIsTextTranslated] = useState(false);
  
  // necessary when clicking markers
  useEffect(() => {
    setTranslatedText(text);
    setIsTextTranslated(false);
  }, [text]);

 
  const handlerTranslate = () => {
    const fromLang = 'es';
    const toLang = 'en';
    let text = translatedText;
    // api key restricted in google developer console
    const API_KEY = 'AIzaSyCKOeL1RQS5BNIKgPQMuBl8jy30MkuyShA';
    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    url += '&q=' + encodeURI(text);
    url += `&source=${fromLang}`;
    url += `&target=${toLang}`;
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
        setTranslatedText(response.data.translations[0].translatedText)
        setIsTextTranslated(true);
        
      })
      .catch(error => {
        console.log("There was an error with the translation request: ", error);
        setTranslatedText(text)
        setIsTextTranslated(false);
        
      });

  }
  return (
    
    <React.Fragment>
      <div className={classes.description}>{translatedText}</div>
      <ColorButton
        variant="outlined"
        disabled={isTextTranslated}
        onClick={handlerTranslate}
        color="secondary"
        className={classes.button}
      >
        Translate
          </ColorButton>
    </React.Fragment>
  );
});

TranslateTextField.propTypes = {
  text: PropTypes.string.isRequired
}

export default TranslateTextField;