// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import AmCharts  from "@amcharts/amcharts3-react";

import * as utils from '../../Utils/Utils';

const styles = ({
  root: {
    height: '100vh'
  },
  mapDiv: {
    width: '100%',
    height: '70vh'
  },
  headerTitle: {
    fontWeight: '300',
    textAlign: 'center',
    fontSize: '5rem',
    padding: '2rem 0rem',
    color: '#777'
  },
  areaColor: {
    color: '#BDBDBD'
  }
});

type Props = {
  onMapClicked: (region: string, regionId: string) => void,
  preSelectedArea: string,
  classes: {
    root: {
      height: string
    },
    mapDiv: {
      width: string,
      height: string
    },
    headerTitle: {
      fontWeight: string,
      textAlign: string,
      fontSize: string,
      padding: string,
      color: string
    },
    areaColor: {
      color: string
    }
  }
};
type State = {
  mapObject: { 
    id: string,  
    showAsSelected: boolean,
    getObjectById: (area:string) => { showAsSelected: boolean},
    returnInitialColor: ({showAsSelected: boolean}) => void
  }
}
const stateInitialValue = {
  id: '',
  showAsSelected: false,
  getObjectById: function(area: string) {
    return { showAsSelected: false };
  },
  returnInitialColor: function({showAsSelected: boolean}) {
    return;
  }
};
class MapSpain extends React.Component<Props, State> {
  state = {
    mapObject: stateInitialValue
  };

  handleRegionClick = e => {
    const areaId: string = e.mapObject.id;
    const region: string | void = utils.getRegionFromRegionId(areaId);
    // unselect previous area
    const prevArea = this.state.mapObject.getObjectById(
      this.props.preSelectedArea
    );
    if (prevArea) {
      prevArea.showAsSelected = false;
      this.state.mapObject.returnInitialColor(prevArea);
    }
    // select current area
    const currentArea = this.state.mapObject.getObjectById(areaId);
    if (currentArea) {
      currentArea.showAsSelected = true;
    }
    if(typeof region === 'string') {
      this.props.onMapClicked(region, areaId);
    }
  };
  getCurrentArea = () => {
    if (this.state.mapObject) {
      return this.state.mapObject.getObjectById(this.props.preSelectedArea);
    }
    return null;
  };
  handlePreSelect = e => {
    const map = e.chart;
    // get map instance to use it in handleRegionClick
    this.setState({ mapObject: map });
    const area = map.getObjectById(this.props.preSelectedArea);
    if (area) {
      area.showAsSelected = true;
      map.returnInitialColor(area);
    }
  };
  render() {
    const { classes } = this.props;
    const areaColor = '#BDBDBD';
    const dataProvider = {
      map: 'spain2Low',
      areas: [
        { id: 'ES-AN', color: areaColor },
        { id: 'ES-AS', color: areaColor },
        { id: 'ES-CB', color: areaColor },
        { id: 'ES-CE', color: areaColor },
        { id: 'ES-CN', color: areaColor },
        { id: 'ES-CT', color: areaColor },
        { id: 'ES-GA', color: areaColor },
        { id: 'ES-IB', color: areaColor },
        { id: 'ES-MC', color: areaColor },
        { id: 'ES-ML', color: areaColor },
        { id: 'ES-PV', color: areaColor },
        { id: 'ES-VC', color: areaColor }
      ]
    };
    return (
      <section id="map">
        <div className={classes.headerTitle}>Select a region</div>
        <div id="mapdiv">
          <AmCharts.React
            className={classes.mapDiv}
            options={{
              type: 'map',
              zoomControl: {
                homeButtonEnabled: false,
                zoomControlEnabled: false,
                panControlEnabled: false
              },
              zoomOnDoubleClick: false,
              // "backgroundColor": "#90CAF9",
              backgroundAlpha: 1,
              dataProvider: dataProvider,
              areasSettings: {
                outlineColor: '#fff',
                outlineAlpha: 1,
                outlineThickness: 1,
                autoZoom: false,
                selectedColor: '#D4AC16',
                // "selectedColor": '#E91E63',
                // "selectedOutlineColor": '#33fddd',
                // "selectedOutlineThickness": 1,
                selectable: true,
                rollOverColor: '#D4AC16'
              },
              listeners: [
                {
                  event: 'clickMapObject',
                  method: e => {
                    this.handleRegionClick(e);
                  }
                },
                {
                  event: 'init',
                  method: e => {
                    this.handlePreSelect(e);
                  }
                }
              ]
            }} // options
          />
        </div>
      </section>
    );
  }
}

MapSpain.propTypes = {
  onMapClicked: PropTypes.func.isRequired,
  preSelectedArea: PropTypes.string.isRequired
}
export default withStyles(styles)(MapSpain);