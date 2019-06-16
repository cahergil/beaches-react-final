import React from 'react';
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
})

const MapResults = (props) => {
  
  const classes = useStyles()
  const temp = props.match.url.split('/');
  const region = temp[temp.length - 1];
  const beachesRegionList = props.beachesList.filter(beach => beach.comunidad_autonoma === region);
  return (
    <div id="results" className={classes.root}>
      <ResultsFilter count={beachesRegionList.length} region={region}/>
      <ResultsContent beachesRegionList={beachesRegionList}/>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    beachesList: state.beaches.beachesList
  }
}


export default withRouter(connect(mapStateToProps,null)(MapResults));