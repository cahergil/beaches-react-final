// @flow
import React, { useState, useCallback } from 'react';
import { makeStyles, Typography, List, ListItem, ListItemText, Divider, InputLabel } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import KeyBoardArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import _ from 'lodash';
import Slider from '@material-ui/core/Slider';

import { logarithmicSlider, logPositionSlider } from '../../Utils/Utils';
import * as searchFiltersActionCreators from '../../store/actions/searchFilters';


const useStyles = makeStyles(theme => ({
  rootMobile: {
    margin: '0 3rem',
    height: '5rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.7rem',
    padding: '1rem',
    borderRadius: '5px',
    backgroundColor: theme.palette.primary.main
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },
  textStyle: {
    color: '#fff'
  },
  drawerRoot: {
    overflowY: 'scroll'
  },
  drawerPaper: {
    width: '40rem',
    background: '#F5F5F5'
  },
  drawerHeader: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    fontSize: '2rem',
    color: '#fff'
  },
  drawerSubheader: {
    height: '5rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.7rem',
    color: '#fff',
    fontWeight: '300',
    padding: '1rem',
    backgroundColor: theme.palette.primary.light,
    marginBottom: '1.5rem'
  },
  typeOfBeachSlider: {
    width: '25rem',
    color: '#D4AC16'
  },
  active: {
    color: '#FABC3D !important'
  },
  sliderThumb: {
    backgroundColor: '#D4AC16',
    '&:focus,&:hover,&$active': {
      // boxShadow: 'inherit', deletes it
      boxShadow: '#ccc 0px 0px 1px 6px',
      MozBoxShadow: '#ccc 0px 0px 1px 6px'
    }
  },
  generalSlider: {
    width: '20rem',
    color: '#D4AC16'
  },
  generalSpanKmLeft: {
    display: 'inline-block',
    transform: 'translateY(-7px)',
    marginRight: '0.7rem',
    color: '#777'
  },
  generalSpanKmRight: {
    transform: 'translateY(-7px)',
    display: 'inline-block',
    marginLeft: '1.7rem',
    color: '#777'
  },
  doneStyle: {
    cursor: 'pointer',
    opacity: '.6',
    '&:hover': {
      opacity: '1'
    }
  },
  generalOcuppancyFormControl: {
    width: '20rem'
  }
}));

type Props = {
  filters: {
    nudism: boolean,
    blueFlag: boolean,
    surfingArea: boolean,
    beachBar: boolean,
    nauticsRental: boolean,
    divingArea: boolean,
    sunbedRental: boolean,
    beachUmbrellaRental: boolean,
    disabledPersons: boolean,
    occupancy: string,
    promenade: boolean,
    hospitalDistance: number,
    beachLength: number,
    selectText: string,
    searchText: string
  },
  actions: {
    setNudism: typeof searchFiltersActionCreators.setNudism,
    setBlueFlag: typeof searchFiltersActionCreators.setBlueFlag,
    setSurfingArea: typeof searchFiltersActionCreators.setSurfingArea,
    setBeachBar: typeof searchFiltersActionCreators.setBeachBar,
    setNauticsRental: typeof searchFiltersActionCreators.setNauticsRental,
    setDivingArea: typeof searchFiltersActionCreators.setDivingArea,
    setDisabledPersons: typeof searchFiltersActionCreators.setDisabledPersons,
    setOccupancy: typeof searchFiltersActionCreators.setOccupancy,
    setPromenade: typeof searchFiltersActionCreators.setPromenade,
    setHospitalDistance: typeof searchFiltersActionCreators.setHospitalDistance,
    setBeachLength: typeof searchFiltersActionCreators.setBeachLength,
    setSearchText: typeof searchFiltersActionCreators.setSearchText,
    setUmbrellaBeachRental: typeof searchFiltersActionCreators.setUmbrellaBeachRental,
    setSunbedRental: typeof searchFiltersActionCreators.setSunbedRental,
    setSelectText: typeof searchFiltersActionCreators.setSelectText,
    setReset: typeof searchFiltersActionCreators.setReset
  }
};

const SearchFiltersMobile = ({filters, actions}: Props) => {
  // const { filters, actions } = props;
  const classes = useStyles();
  const { debounce } = _;
  const debouncedhospitalDistance = useCallback(debounce(actions.setHospitalDistance, 500), []);
  const debouncedContainText = useCallback(debounce(actions.setSearchText, 500), []);
  const debouncedBeachLength = useCallback(debounce(actions.setBeachLength, 500), []);
  const [drawerState, setDrawerState] = useState(false);
  const [valueContainText, setValueContainText] = useState(filters.searchText);
  const [hospitalDistance, setHospitalDistance] = useState(filters.hospitalDistance);
  const [beachLength, setBeachLength] = useState(filters.beachLength);

  const handleOnReset = (e) => {

    // reset state in Redux
    actions.setReset();
  }
  const checkBoxHandler = (name: string) => (event: {target: {checked: boolean}}) => {
    if (name === 'nudismo') {

      actions.setNudism(event.target.checked);
    } else if (name === 'bandera_azul') {
      actions.setBlueFlag(event.target.checked);
    } else if (name === 'zona_surf') {
      actions.setSurfingArea(event.target.checked);
    } else if (name === 'establecimiento_comida') {
      actions.setBeachBar(event.target.checked);
    } else if (name === 'alquiler_nauticos') {
      actions.setNauticsRental(event.target.checked);
    } else if (name === 'submarinismo') {
      actions.setDivingArea(event.target.checked);
    } else if (name === 'alquiler_hamacas') {
      actions.setSunbedRental(event.target.checked);
    } else if (name === 'alquiler_sombrillas') {

      actions.setUmbrellaBeachRental(event.target.checked);

    } else if (name === 'acceso_discapacitados') {
      actions.setDisabledPersons(event.target.checked);

    } else if (name === 'paseo_maritimo') {

      actions.setPromenade(event.target.checked);
    }
  }

  const handleOccupancy = (event: { target: { value: string}}) => {
    actions.setOccupancy(event.target.value);
  }

  const handleHospitalDistanceChange = (event,newValue: number) => {
    setHospitalDistance(newValue);
    debouncedhospitalDistance(newValue);
  }

  const handleBeachLengthChange = (event, newValue: number) => {
    const value = logarithmicSlider(newValue);
    setBeachLength(value);
    debouncedBeachLength(value);
    // setBeachLength(newValue);
    // debouncedBeachLength(newValue);
  }

   const handleSelectChange = (e: { target: { value: string}}) => {

    actions.setSelectText(e.target.value);
  }
  const handleContainText = (e: {target: { value: string}}) => {
    const value = e.target.value;
    setValueContainText(value);
    debouncedContainText(value);
    
  }


  const toggleDrawer = open => (event: { type: string, key: string}) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerState(open);
  };
  const sideList = (
    <div>
      <div className={classes.drawerHeader}>
        <div>Filters</div>
        <div className={classes.doneStyle} onClick={toggleDrawer(false)}>
          Done
        </div>
      </div>
      {/* CONTAIN TEXT ***********************************************************/}
      <div className={classes.drawerSubheader}>
        <div>Contain text</div>
      </div>
      <div className={classes.wrapper}>
        <FormControl>
          <InputLabel htmlFor="select">Select by</InputLabel>
          <Select value={filters.selectText} onChange={handleSelectChange}>
            <MenuItem value="termino_municipal">Locality</MenuItem>
            <MenuItem value="nombre">Beach</MenuItem>
            <MenuItem value="comunidad_autonoma">Region</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="my-search"
          label="Contain text"
          type="search"
          value={valueContainText}
          InputLabelProps={{
            className: classes.labelTextFieldStyle
          }}
          style={{ marginLeft: '2rem' }}
          onChange={handleContainText}
          margin="none"
        />
      </div>
      {/* TYPE OF BEACH *****************************************************/}
      <div className={classes.drawerSubheader} style={{ marginTop: '1rem' }}>
        <div>Type of beach</div>
      </div>
      <List>
        <ListItem alignItems="flex-start">
          <FormControlLabel
            className={classes.marginCheckbox}
            control={
              <Checkbox
                checked={filters.nudism}
                onChange={checkBoxHandler('nudismo')}
                value="nudismo"
              />
            }
            label="Nudism"
          />
        </ListItem>
        <Divider />
        <ListItem alignItems="flex-start">
          <FormControlLabel
            className={classes.marginCheckbox}
            control={
              <Checkbox
                checked={filters.blueFlag}
                onChange={checkBoxHandler('bandera_azul')}
                value="bandera_azul"
              />
            }
            label="Blue flag"
          />
        </ListItem>
        <Divider />
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Beach max length"
            secondary={
              <React.Fragment>
                <span className={classes.generalSpanKmLeft}>50 m</span>
                <Slider
                  classes={{
                    root: classes.typeOfBeachSlider,
                    thumb: classes.sliderThumb
                  }}
                  defaultValue={beachLength}
                  value={logPositionSlider(beachLength)}
                  onChange={handleBeachLengthChange}
                  min={0}
                  max={100}
                  color="secondary"
                />
                <span className={classes.generalSpanKmRight}>28k m</span>

                <span style={{ marginLeft: '12rem', display: 'block' }}>
                  {Math.round(beachLength)} meters
                </span>
              </React.Fragment>
            }
            // classes={{
            //   primary: classes.generalPrimary,
            //   secondary: classes.generalSecondary
            // }}
          />
        </ListItem>
      </List>
      {/* SERVICES *****************************************************/}
      <div className={classes.drawerSubheader}>
        <div>Services</div>
      </div>
      <List>
        <ListItem alignItems="flex-start">
          <FormControlLabel
            className={classes.marginCheckbox}
            control={
              <Checkbox
                checked={filters.surfingArea}
                onChange={checkBoxHandler('zona_surf')}
                value="zona_surf"
              />
            }
            label="Surfing area"
          />
        </ListItem>
        <Divider />
        <ListItem alignItems="flex-start">
          <FormControlLabel
            className={classes.marginCheckbox}
            control={
              <Checkbox
                checked={filters.beachBar}
                onChange={checkBoxHandler('establecimiento_comida')}
                value="establecimiento_comida"
              />
            }
            label="Beach bar"
          />
        </ListItem>
        <Divider />
        <ListItem alignItems="flex-start">
          <FormControlLabel
            className={classes.marginCheckbox}
            control={
              <Checkbox
                checked={filters.nauticsRental}
                onChange={checkBoxHandler('alquiler_nauticos')}
                value="alquiler_nauticos"
              />
            }
            label="Nautics rental"
          />
        </ListItem>
        <Divider />
        <ListItem alignItems="flex-start">
          <FormControlLabel
            className={classes.marginCheckbox}
            control={
              <Checkbox
                checked={filters.divingArea}
                onChange={checkBoxHandler('submarinismo')}
                value="submarinismo"
              />
            }
            label="Diving area"
          />
        </ListItem>
        <Divider />
        <ListItem alignItems="flex-start">
          <FormControlLabel
            className={classes.marginCheckbox}
            control={
              <Checkbox
                checked={filters.sunbedRental}
                onChange={checkBoxHandler('alquiler_hamacas')}
                value="alquiler_hamacas"
              />
            }
            label="Sunbed rental"
          />
        </ListItem>
        <Divider />
        <ListItem alignItems="flex-start">
          <FormControlLabel
            className={classes.marginCheckbox}
            control={
              <Checkbox
                checked={filters.beachUmbrellaRental}
                onChange={checkBoxHandler('alquiler_sombrillas')}
                value="alquiler_sombrillas"
              />
            }
            label="Beach umbrella rental"
          />
        </ListItem>
      </List>
      {/* GENERAL *****************************************************/}
      <div className={classes.drawerSubheader}>
        <div>General</div>
      </div>
      <List>
        <ListItem alignItems="flex-start">
          <FormControlLabel
            className={classes.marginCheckbox}
            control={
              <Checkbox
                checked={filters.disabledPersons}
                onChange={checkBoxHandler('acceso_discapacitados')}
                value="acceso_discapacitados"
              />
            }
            label="Disabled persons"
          />
        </ListItem>
        <Divider />
        <ListItem alignItems="flex-start">
          <FormControlLabel
            className={classes.marginCheckbox}
            control={
              <Checkbox
                checked={filters.promenade}
                onChange={checkBoxHandler('paseo_maritimo')}
                value="paseo_maritimo"
              />
            }
            label="Promenade"
          />
        </ListItem>
        <Divider />
        <ListItem alignItems="flex-start">
          <FormControl
            classes={{
              root: classes.generalOcuppancyFormControl
            }}
          >
            <InputLabel htmlFor="select">Occupancy</InputLabel>
            <Select value={filters.occupancy} onChange={handleOccupancy}>
              <MenuItem value="All">
                <em>All</em>
              </MenuItem>
              <MenuItem value="Alto">High</MenuItem>
              <MenuItem value="Bajo">Low</MenuItem>
              <MenuItem value="Medio">Average</MenuItem>
              <MenuItem value="Medio / Alto">Average / High</MenuItem>
              <MenuItem value="Medio / Bajo">Average / Low</MenuItem>
              <MenuItem value="Muy bajo">Very Low</MenuItem>
            </Select>
          </FormControl>
        </ListItem>
        <Divider />
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Distance to hospital"
            secondary={
              <React.Fragment>
                <span className={classes.generalSpanKmLeft}>0 Km</span>
                <Slider
                  classes={{
                    root: classes.generalSlider,
                    thumb: classes.sliderThumb
                  }}
                  defaultValue={hospitalDistance}
                  value={hospitalDistance}
                  valueLabelDisplay="auto"
                  onChange={handleHospitalDistanceChange}
                  min={0}
                  max={120}
                  color="secondary"
                />
                <span className={classes.generalSpanKmRight}>120 Km</span>
              </React.Fragment>
            }
            // classes={{
            //   primary: classes.generalPrimary,
            //   secondary: classes.generalSecondary
            // }}
          />
        </ListItem>
      </List>
    </div>
  );


  return (
    <React.Fragment>
      <div className={classes.rootMobile}>
        <div className={classes.wrapper}>
          <span onClick={toggleDrawer(true)} className={classes.textStyle}>Filters</span>
          <KeyBoardArrowDownIcon onClick={toggleDrawer(true)} />
        </div>
          <Typography onClick={handleOnReset} style={{cursor: 'pointer', color: '#fff'}} variant="subtitle1">Clear filters</Typography>
      </div>
      <Drawer 
        variant="temporary"
        anchor="left"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        classes={{
          root: classes.drawerRoot,
          paper: classes.drawerPaper
        }}
        open={drawerState}
        onClose={toggleDrawer(false)}>
          {sideList}
        
      </Drawer>
    </React.Fragment>
    
  );
}

export default SearchFiltersMobile;