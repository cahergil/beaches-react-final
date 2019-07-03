import React, { useState} from 'react';
import { Button, withStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

const withTextTranslation = (Wrapped, inputText) => {
  return (...props) => {
    const [state, setState] = useState({
      text: props.text,
      translated: false
    });
    // handleTranslate = value => {
    //   let fromLang = 'es';
    //   let toLang = 'en'
    //   let text = props.text;
    //   const API_KEY = 'AIzaSyCKOeL1RQS5BNIKgPQMuBl8jy30MkuyShA';
    //   let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    //   url += '&q=' + encodeURI(text);
    //   url += `&source=${fromLang}`;
    //   url += `&target=${toLang}`;
    //   fetch(url, {
    //     method: 'GET',
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json"
    //     }
    //   })
    //     .then(res => res.json())
    //     .then((response) => {
    //       console.log("response from google: ", response);
    //       setState({
    //         text: response.data.translations[0].translatedText,
    //         translated: true
    //       })
    //     })
    //     .catch(error => {
    //       console.log("There was an error with the translation request: ", error);
    //       setState({
    //         text: props.text,
    //         translated: false
    //       });
    //     });

    // }

    return <Wrapped {...props}/>
  }

}