import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import BackgroundVideo  from 'react-background-video-player';
// const BackgroundVideo = require('react-background-video-player');


import ResultsContent from '../../components/LandingPageResults/ResultsContent/ResultsContent';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import * as beachesActions from '../../store/actions/beaches';
import * as searchFiltersActions from '../../store/actions/searchFilters';
import * as mapsFilterActions from '../../store/actions/mapFilters';
import * as utils from '../../Utils/Utils';
import videoMp4 from '../../assets/videos/video_compressed.mp4';
import videoMp4Width500 from '../../assets/videos/videoMp4Width500.mp4';

const useStyles = makeStyles(theme =>({

  root: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '100%',
    justifyContent: 'center',
    gridRowGap: '2rem',
  },
  titleWrapper: {
    margin: '4rem 2rem 2rem 2rem',
    fontSize: '3rem',
    opacity: '0.87',
    fontWeight: '300',
  },
  title: {
    background: 'linear-gradient(to bottom right,rgba(255,255,255,0.7),rgba(255,255,255,1))',
    borderRadius: '10px',
    padding: '5px',
    boxShadow: '0 1.5rem 4rem rgba(0,0,0,.5)'

  },
  circleProgressRoot: {
    marginTop: '10rem',
    justifySelf: 'center'
  },

  video: {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '31vh',
    width: '100%',
    zIndex: '-2',
    maskImage: 'linear-gradient(to right,rgba(255,255,255,1),rgba(255,255,255,0.2),rgba(255,255,255,0.2))',
    // opacity: '0.15',
    overflow: 'hidden',
    [theme.breakpoints.down(500)]: {
      height: '25vh'
    },
    [theme.breakpoints.down(900)]: {
      height: '28.5vh'
    }
  }
}));


const Search = (props) => {
  const { beachesList, filters, actions } = props;
  const classes = useStyles();
  const [filteredBeachesList, setFilteredBeachesList] = useState([]);
  // to avoid props warnings of the video background library. The size is actually  managed in jss
  const [videoContainerWidth, setVideoContainerWidth] = useState(1800);
  const [videoContainerHeight, setVideoContainerHeight] = useState(400);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const matchesWidth500 = useMediaQuery(theme.breakpoints.down(500));
  useEffect(() => {
    if (props.location.state && !props.location.state.includes('search')) {
      
      const element = document.getElementById('navbar');
      if (element) {
        element.scrollIntoView();
      }
    }
    
  }, [props.location]);
  // point 4 of https://github.com/reactjs/rfcs/blob/master/text/0068-react-hooks.md#drawbacks
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  });

  useEffect(() => {
    actions.setCountryBeaches('../playas.json');
    return () => {
      actions.setReturnFromDetails(false);
    }
  }, [actions]);
  
  useEffect(() => {
    if (beachesList.length === 0) {
      return;
    }
    setLoading(true);
    const filterObject = {};
    if (filters.nudism) {
      filterObject['nudismo'] = utils.translateYesNoIntoSpanish(filters.nudism);
    }
    if (filters.blueFlag) {
      filterObject['bandera_azul'] = utils.translateYesNoIntoSpanish(filters.blueFlag)
    }
    if (filters.surfingArea) {
      filterObject['zona_surf'] = utils.translateYesNoIntoSpanish(filters.surfingArea)
      
    }
    if (filters.beachBar) {
      filterObject['establecimiento_comida'] = utils.translateYesNoIntoSpanish(filters.beachBar)
      
    }
    if (filters.nauticsRental) {
      filterObject['alquiler_nauticos'] = utils.translateYesNoIntoSpanish(filters.nauticsRental)
      
    }
    if (filters.divingArea) {
      filterObject['submarinismo'] = utils.translateYesNoIntoSpanish(filters.divingArea)
      
    }
    if (filters.sunbedRental) {
      filterObject['alquiler_hamacas'] = utils.translateYesNoIntoSpanish(filters.sunbedRental)
      
    }
    if (filters.beachUmbrellaRental) {
      filterObject['alquiler_sombrillas'] = utils.translateYesNoIntoSpanish(filters.beachUmbrellaRental)
      
    }
    if (filters.disabledPersons) {
      filterObject['acceso_discapacitados'] = utils.translateYesNoIntoSpanish(filters.disabledPersons)
      
    }
    if (filters.promenade) {
      filterObject['paseo_maritimo'] = utils.translateYesNoIntoSpanish(filters.promenade);

    }
    if (filters.occupancy !== 'All') {
      filterObject['grado_ocupacion'] = utils.translateOccupancyIntoSpanish(filters.occupancy)
    }
    if (filters.searchText.trim()) {
      filterObject[`${filters.selectText}`] = filters.searchText; 
    }
    if (filters.hospitalDistance) {
      filterObject['distancia_hospital'] = filters.hospitalDistance;
    }
    if (filters.beachLength) {
      filterObject['longitud'] = filters.beachLength;
    }
    
    const tempBeaches = beachesList.filter(beach => {
      const keys = Object.keys(filterObject);
      return keys.every(key => {
        if (key === 'termino_municipal' || key === 'nombre' || key === 'comunidad_autonoma') {
          const regex = new RegExp("" + filterObject[key] + "", "i");
          return beach[key].match(regex)
        }
        if (key === 'distancia_hospital') {
          let distance = beach[key];
          if (!distance) {
            distance = '30 Km';
            // return false, there are almost 100 record not informed;
          }
          if (distance) {
            if (distance === 'Al lado') {
              distance = "0 Km"
            }
            return utils.includeDistance(distance, filterObject[key]);
          }
        }
        if (key === 'longitud') {
          let len = beach[key];
          if (!len) {
            len = '0 metros';
          }
          return utils.includeLength(len, filterObject[key]);
        }
        return beach[key] === filterObject[key];
      });
    
    });
    setFilteredBeachesList(tempBeaches);
    setLoading(false);


  },[beachesList, filters])
  
  const handleResize = e => {
    setVideoContainerWidth(window.innerWidth);
    setVideoContainerHeight(window.innerHeight*0.31);
  }

  let resultContent = <ResultsContent beachesList={filteredBeachesList} />
  if (loading) {
    resultContent = <CircularProgress
      color="primary"
      size={80}
      thickness={3.6}
      classes={{ root: classes.circleProgressRoot }}
    />;
  }
  let video = null;
  if (matchesWidth500) {
    video = <BackgroundVideo
      verticalAlign={0.05}
      src={videoMp4Width500}
      containerWidth={videoContainerWidth}
      containerHeight={videoContainerHeight}
    />

  } else {
    video = <BackgroundVideo
      verticalAlign={0.05}
      src={videoMp4}
      containerWidth={videoContainerWidth}
      containerHeight={videoContainerHeight}
    />
  }
  return (
    <section>
    
      <div className={classes.root}>
        <div className={classes.video}>
          {video}
        </div>
        <div className={classes.titleWrapper}>
          <span className={classes.title}>Advanced Search
          </span>
        </div>
        <SearchFilters 
          filters={filters}
          actions={actions}
        />
        {resultContent}
      </div>
    </section>
  );
};
const mapStateToProps = state => {
  return {
    beachesList: state.beaches.beachesList,
    filters: state.searchFilters
  }
};
const mapDispatchToProps = dispatch => {
  // https://stackoverflow.com/questions/35454633/redux-connect-with-multiples-actions-states
  
  return {
    actions: bindActionCreators(Object.assign({}, beachesActions, searchFiltersActions, mapsFilterActions), dispatch)

  }
}




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));