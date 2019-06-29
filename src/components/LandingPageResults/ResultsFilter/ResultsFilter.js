import React, {useState, useRef, useEffect, useCallback} from 'react';
import { makeStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { InputLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';



const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '5rem 0'
  },
  resultsHeader: {
    fontSize: '3rem',
    marginBottom: '2rem',
    color: '#000',
    textAlign: 'center'
  },
  resultsHeaderNumber: {
    fontStyle: 'italic',
    color: '#777'
  },
  resultsHeaderRegion: {
    color: '#777'
  },
  resultsSearch: {
    textAlign: 'center'
  },
  resultsSearchTitle: {
    fontSize: '2rem',
    color: '#777',
    marginBottom: '2rem'
  },
  controlsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'
  }
})


const ResultsFilter = (props) => {
  const { count, region, onSearched, onMapResultsSelectChange, selectValue, inputValue, isReturn, onSetReturnFromDetails } = props;
  // to synchronize the input
  const [inputText, setInputText] = useState(inputValue);
  const { debounce } = _;
  const debouncedInput = useCallback(debounce(onSearched, 1000), []);
 
  const classes = useStyles();

  const handleSelectChange = (e) => {
    onMapResultsSelectChange(e.target.value);
    setInputText('');
  }
  const handleInputChange = (e) => {
    
    const value = e.target.value;
    setInputText(value);
    debouncedInput(selectValue, value);
  }

  useEffect(() => {
  
    if (!isReturn) {
      setInputText('');
      onMapResultsSelectChange('termino_municipal');
      
    } else {
      // onSetReturnFromDetails(false);
      // https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-onchange-event-in-react-js
      var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
      const input = document.getElementById('my-search');
      // ' ' in order to passe useCallback in debounce
      nativeInputValueSetter.call(input, input.value + ' ');
      const event = new Event('input', { bubbles: true });
      event.simulated = true;
      input.dispatchEvent(event);
        
    }
  
    
  }, [count, setInputText, isReturn, onSetReturnFromDetails, onMapResultsSelectChange]);
  

  

  return (
    <section id="filter" className={classes.root}>
      <div className={classes.resultsHeader}>
        <span className={classes.resultsHeaderNumber}>{count}</span>
        <span> beaches in </span>
        <span className={classes.resultsHeaderRegion}>{region}</span>
      </div>
      <div className={classes.resultsSearch}>
        <div className={classes.resultsSearchTitle}>
          Narrow your search by beach name or locality
        </div>
        <div className={classes.controlsWrapper}>
          <FormControl>
            <InputLabel htmlFor="select">Select by</InputLabel>
            <Select
              value={selectValue}
              onChange={handleSelectChange}
              >
              <MenuItem
                value="termino_municipal"
              >
                Locality
              </MenuItem>
              <MenuItem
                value="nombre"
              >
                Beach
              </MenuItem>
            </Select>
        
          </FormControl>
          <TextField
            id="my-search"
            label="search"
            type="search"
            value={inputText}
            style={{ marginLeft: '2rem' }}
            onChange={handleInputChange}
            margin="none"
            />
        </div>
      </div>
    </section>
  );
}

export default ResultsFilter;