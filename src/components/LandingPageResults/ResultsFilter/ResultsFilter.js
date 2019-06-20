import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { InputLabel } from '@material-ui/core';

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
  }
})


const ResultsFilter = (props) => {
  const { count, region } = props;
  const [selectValue, setSelectValue] = useState('locality');
  const classes = useStyles();
  console.log(selectValue);
  const handleSelectChange = (e) =>{
    setSelectValue(e.target.value);
  }
  return (
    <section id="filter" className={classes.root}>
      <div className={classes.resultsHeader}>
        <span className={classes.resultsHeaderNumber}>{count}</span>
        <span> beaches in </span>
        <span className={classes.resultsHeaderRegion}>{region}</span>
      </div>
      <div className={classes.resultsSearch}>
        <div className={classes.resultsSearchTitle}>Narrow your search by beach name or locality</div>
        <FormControl>
          <InputLabel htmlFor="select">Select by</InputLabel>
          <Select
            value={selectValue}
            onChange={handleSelectChange}
            >
            <MenuItem
              value="locality"
            >
              Locality
            </MenuItem>
            <MenuItem
              value="beach"
            >
              Beach
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </section>
  );
}

export default ResultsFilter;