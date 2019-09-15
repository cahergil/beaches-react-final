// @flow
import React, {useState, useEffect, useCallback} from 'react';
import { makeStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { InputLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types'


import * as mapFiltersActionCreators from '../../../store/actions/mapFilters';


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

type Props = {
  count: number,
  region: string,
  onSearched: (select: string, value: string) => void,
  onMapResultsSelectChange: typeof mapFiltersActionCreators.setMapResultsSelect,
  selectValue: string,
  inputValue: string,
  isReturn: boolean
};

const ResultsFilter = ({ count, region, onSearched, onMapResultsSelectChange, selectValue, inputValue, isReturn }: Props) => {
    
  // to synchronize the input
  const [inputText, setInputText] = useState(inputValue);
  // const { debounce } = _;
  const debouncedInput = useCallback(debounce(onSearched, 1000), []);

  const classes = useStyles();

  const handleSelectChange = (e) => {
    onMapResultsSelectChange(e.target.value);
    setInputText('');
  }
  const handleInputChange = (e) => {
    
    const value = e.target.value;
    setInputText(value);
    debouncedInput(value);
  }

  useEffect(() => {
  
    if (!isReturn) {
      setInputText('');
      onMapResultsSelectChange('termino_municipal');
      
    } else {
      // console.log('else');
      // // see alternative option in notes.txt
      // let input= document && document.getElementById('my-search');
      // let select= document && document.getElementById('my-select');
      // input.value = input.value + ' ';
      // setInputText(input.value);
      // debouncedInput(select.value, input.value);
     
    }
  
  // count has to be here!  
  }, [count, setInputText, isReturn, onMapResultsSelectChange,debouncedInput]);
  
  return (
    <section id="filter" className={classes.root}>
      <div className={classes.resultsHeader}>
        <span className={classes.resultsHeaderNumber}>{count}</span>
        <span> beaches in </span>
        <span data-testid="region" className={classes.resultsHeaderRegion}>
          {region}
        </span>
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
              SelectDisplayProps={{
                'data-testid': 'inputType'
              }}
            >
              <MenuItem value="termino_municipal" data-testid="locality">Locality</MenuItem>
              <MenuItem value="nombre" data-testid="beach">Beach</MenuItem>
            </Select>
          </FormControl>
          <TextField
            inputProps={{ "data-testid": "input" }}
            // data-testid="input"
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

ResultsFilter.propTypes = {
  count: PropTypes.number.isRequired,
  region: PropTypes.string.isRequired, 
  onSearched: PropTypes.func.isRequired,
  onMapResultsSelectChange: PropTypes.func.isRequired,
  selectValue: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired, 
  isReturn: PropTypes.bool.isRequired,
}

export default ResultsFilter;