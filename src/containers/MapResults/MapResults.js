import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {makeStyles} from '@material-ui/styles'

import ResultsFilter from '../../components/LandingPageResults/ResultsFilter/ResultsFilter';
import ResultsContent from '../../components/LandingPageResults/ResultsContent/ResultsContent';

const useStyles = makeStyles({
  root: {
    width: '100%',
    gridTemplateRows: 'repeat(2, min-content)',
    gridRowGap: '2rem'
  }
});

const MapResults = (props) => {
  const { beachesList } = props;
  const [ beachesRegionList, setBeachesRegionList] = useState([]);
  const [ filteredRegionList, setFilteredRegionList] = useState([]);
  const [region, setRegion] = useState([]);

  let refBeachesRegionList = useRef(beachesRegionList);
  let refRegion = useRef(region);

 
  useEffect(() => {
   
    refBeachesRegionList.current = beachesRegionList;
    refRegion.current = region;
  });

  const classes = useStyles()

  useEffect(() => {
 
    const temp = props.match.url.split('/');
    const region = temp[temp.length - 1];
    const regionList = beachesList.filter(beach => beach.comunidad_autonoma === region);
   
    setBeachesRegionList(regionList);
    setFilteredRegionList(regionList);
    setRegion(region)
  }, [beachesList, props.match.url])

  
  const searchHandler = (select, value) => {
    const regex = new RegExp("" + value + "", "i");
    let results;
    if (!value) {
      setFilteredRegionList(refBeachesRegionList.current);
      return;
    }
    results = refBeachesRegionList.current.filter(beach => beach[`${select}`].match(regex));
    setFilteredRegionList(results);
   
  }

  return (
    <div  className={classes.root}>
      <ResultsFilter
        onSearched={(select, value) => searchHandler(select, value)}
        count={beachesRegionList.length}
        region={region} />
      <ResultsContent beachesRegionList={filteredRegionList}/>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    beachesList: state.beaches.beachesList
  }
}


export default withRouter(connect(mapStateToProps,null)(MapResults));