// @flow
import * as React from 'react';
import  {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {compose } from 'redux';
import { withRouter } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import {makeStyles} from '@material-ui/styles'
import PropTypes  from 'prop-types';

import ResultsFilter from '../../components/LandingPageResults/ResultsFilter/ResultsFilter';
import ResultsContent from '../../components/LandingPageResults/ResultsContent/ResultsContent';
import * as beachesActionCreators from '../../store/actions/beaches';
import * as mapFiltersActionCreators from '../../store/actions/mapFilters'
import BeachType from '../../components/Model/Model';
import type { Beach} from '../../components/Model/Beach';
import type { State } from '../../store/reducers/index'; 
// import type { Action } from '../../store/reducers/index'; 

const useStyles = makeStyles({
  root: {
    width: '100%',
    gridTemplateRows: 'repeat(2, min-content)',
    gridRowGap: '2rem'
  }
});

type OwnProps = {||}
type Props = {|
  ...OwnProps,
  beachesList: Array<Beach>,
  onSetCountryBeaches: typeof beachesActionCreators.setCountryBeaches,
  onMapResultsSelectChange: typeof mapFiltersActionCreators.setMapResultsSelect,
  onMapResultsInputChange: typeof mapFiltersActionCreators.setMapResultsInput,
  selectValue: string,
  inputValue: string,
  isReturn: boolean,
  match: Match,
  onSetMapArea: typeof mapFiltersActionCreators.setMapArea,
  regionId: string
|};



const MapResults = ({beachesList, onSetCountryBeaches, onMapResultsSelectChange, onMapResultsInputChange, selectValue, inputValue, isReturn, match, onSetMapArea, regionId}: Props) => {

  const [numberOfBeaches, setNumberOfBeaches] = useState(0);
  const [filteredRegionList, setFilteredRegionList] = useState([]);
  const [region, setRegion] = useState('');
  const classes = useStyles();
  
  useEffect(() => {
      // to avoid re-rendering when comming back from details.
      // By default leaving to details empty regionId in LandingPage
      // In details we fill the field again. Therefore when comming back we kno
      // if we come back from details looking at this field
      if(!regionId) {
        onSetCountryBeaches('../playas.json');
      }
  }, [onSetCountryBeaches, regionId]);

  useEffect(() => {
    const region = match.params.region;
    // get beaches in the region -> used in ResultsFilter
    const regionList: Array<Beach> = beachesList.filter((beach: Beach)=> beach.comunidad_autonoma === region);
    // get beaches in the region that satisfy the filters -> used in ResultsContent
    const regex = new RegExp('' + inputValue.trim() + '', 'i');
    const filteredList = regionList.filter((beach: Beach) => beach[`${selectValue}`].match(regex));
    // filters
    setNumberOfBeaches(regionList.length);
    if(typeof region === 'string') {
      setRegion(region);
    }
    // content
    setFilteredRegionList(filteredList);
  }, [beachesList,match, inputValue, selectValue])

 
  const updateInputHandler = (inputVal: string) => {
    onMapResultsInputChange(inputVal.trim())
  }
 
  let content = null;
  if (numberOfBeaches > 0) {
    content = (
      <React.Fragment>
        <ResultsFilter
          onSearched={(inputValue: string) =>
            updateInputHandler(inputValue)
          }
          count={numberOfBeaches}
          region={region}
          onMapResultsSelectChange={onMapResultsSelectChange}
          selectValue={selectValue}
          inputValue={inputValue}
          isReturn={isReturn}
        />
        <ResultsContent beachesList={filteredRegionList} regionId={regionId} />
      </React.Fragment>
    ); 
  }

  return (
    <div className={classes.root}>
      {content}  
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    beachesList: state.beaches.beachesList,
    selectValue: state.mapResultsFilters.select,
    inputValue: state.mapResultsFilters.input,
    isReturn: state.mapResultsFilters.return,
    regionId: state.mapResultsFilters.regionId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetCountryBeaches: (route: string) => dispatch(beachesActionCreators.setCountryBeaches(route)),
    onMapResultsSelectChange: (value: string) => dispatch(mapFiltersActionCreators.setMapResultsSelect(value)),
    onMapResultsInputChange: (value: string) => dispatch(mapFiltersActionCreators.setMapResultsInput(value)),
    onSetMapArea: (value: string) => dispatch(mapFiltersActionCreators.setMapArea(value))
    
  }
}
MapResults.propTypes = {
  beachesList: PropTypes.arrayOf(
    PropTypes.shape(BeachType)
  ).isRequired,
  onSetCountryBeaches: PropTypes.func.isRequired,
  onMapResultsSelectChange: PropTypes.func.isRequired,
  onMapResultsInputChange: PropTypes.func.isRequired,
  selectValue: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  isReturn: PropTypes.bool.isRequired,
  onSetMapArea: PropTypes.func.isRequired,
  regionId: PropTypes.string.isRequired
  
};

export default (compose(
  withRouter,
  connect(mapStateToProps,mapDispatchToProps)
  )(MapResults):React.AbstractComponent<OwnProps>);