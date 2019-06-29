import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {makeStyles} from '@material-ui/styles'

import ResultsFilter from '../../components/LandingPageResults/ResultsFilter/ResultsFilter';
import ResultsContent from '../../components/LandingPageResults/ResultsContent/ResultsContent';
import * as actionsBeaches from '../../store/actions/beaches';
import * as actionsMapFilters from '../../store/actions/mapFilters'

const useStyles = makeStyles({
  root: {
    width: '100%',
    gridTemplateRows: 'repeat(2, min-content)',
    gridRowGap: '2rem'
  }
});

const MapResults = (props) => {
  const { beachesList, onSetCountryBeaches, onMapResultsSelectChange, onMapResultsInputChange, selectValue, inputValue, isReturn, onSetReturnFromDetails} = props;
  const [ beachesRegionList, setBeachesRegionList] = useState([]);
  const [ filteredRegionList, setFilteredRegionList] = useState([]);
  const [region, setRegion] = useState([]);
  
  const classes = useStyles();
  let refBeachesRegionList = useRef(beachesRegionList);
  let refRegion = useRef(region);
 
  useEffect(() => {
    refBeachesRegionList.current = beachesRegionList;
    refRegion.current = region;
  });

  useEffect(() => {
    onSetCountryBeaches('../../playas.json');
  }, [onSetCountryBeaches]);

  useEffect(() => {
    const temp = props.match.url.split('/');
    const region = temp[temp.length - 1];
    const regionList = beachesList.filter(beach => beach.comunidad_autonoma === region);
    setBeachesRegionList(regionList);
    setFilteredRegionList(regionList);
    setRegion(region)
  }, [beachesList, props.match.url])

 
  const searchHandler = (select, val) => {
    const value = val.trim();
    const regex = new RegExp("" + value + "", "i");
    let results;
    if (!value) {
      setFilteredRegionList(refBeachesRegionList.current);
      onMapResultsInputChange(value);
      return;
    }
    results = refBeachesRegionList.current.filter(beach => beach[`${select}`].match(regex));
    setFilteredRegionList(results);
    onMapResultsInputChange(value)
   
  }

  let content = null;
  if (beachesRegionList.length > 0) {
    content = (
      <React.Fragment >
        <ResultsFilter
          onSearched={(select, value) => searchHandler(select, value)}
          count={beachesRegionList.length}
          region={region}
          onMapResultsSelectChange={onMapResultsSelectChange}
          selectValue={selectValue}
          inputValue={inputValue}
          isReturn={isReturn}
          onSetReturnFromDetails={onSetReturnFromDetails}
        />
        <ResultsContent
            beachesRegionList={filteredRegionList} />
      </React.Fragment>
    ) 
  }

  return (
    <div className={classes.root}>
      {content}  
    </div>
  );
}
const mapStateToProps = state => {
  return {
    beachesList: state.beaches.beachesList,
    selectValue: state.mapResultsFilters.select,
    inputValue: state.mapResultsFilters.input,
    isReturn: state.mapResultsFilters.return
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSetCountryBeaches: (route) => dispatch(actionsBeaches.setCountryBeaches(route)),
    onMapResultsSelectChange: (value) => dispatch(actionsMapFilters.setMapResultsSelect(value)),
    onMapResultsInputChange: (value) => dispatch(actionsMapFilters.setMapResultsInput(value)),
    onSetReturnFromDetails: (value) => dispatch(actionsMapFilters.setReturnFromDetails(value))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MapResults));