import React, { useState } from 'react';
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

const TranslateTextField = (props) => {
  const classes = useStyles();
  const { text } = props
  const [state, setState] = useState({ text: text, translated: false })
  const handlerTranslate = () => {
    let fromLang = 'es';
    let toLang = 'en'
    let text = state.text;
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
        // console.log("response from google: ", response);
        setState({
          text: response.data.translations[0].translatedText,
          translated: true
        })
      })
      .catch(error => {
        console.log("There was an error with the translation request: ", error);
        setState({
          text: text,
          translated: false
        });
      });

  }
  return (
    
  <React.Fragment>
    <div className={classes.description}>{state.text}</div>
    <ColorButton
      variant="outlined"
      disabled={state.translated}
      onClick={handlerTranslate}
      color="secondary"
      className={classes.button}
    >
      Translate
          </ColorButton>
  </React.Fragment>
  );
}

TranslateTextField.propTypes = {
  text: PropTypes.string.isRequired
}

export default TranslateTextField;