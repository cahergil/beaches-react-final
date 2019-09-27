// @flow
import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, InputLabel, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import filterIcon from '../../assets/images/filters.png';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import debounce from 'lodash/debounce';
import SearchFiltersMobile from './SearchFiltersMobile';
import { logarithmicSlider, logPositionSlider } from './../../Utils/Utils';

import * as searchFiltersActionCreators from '../../store/actions/searchFilters';
import ArrowDownIcon from '../ArrowDownIcon/ArrowDownIcon';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 3rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(6, max-content)',
    gridColumnGap: '2rem',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.7rem',
    padding: '1rem',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '5px',

  },

  filterSize: {
    height: '1.8rem',
    width: '1.8rem',
    paddingTop: '5px'
  },
  wrapper: {

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer'

  },
  textWrapper: {
    position: 'relative',
    // '&:hover  $menuServices': {
    //   visibility: 'visible',
    //   opacity: '1'
    // }
    '&:hover > span': {
      color: '#FABC3D'
    },
    '&:hover + svg > path': {
      fill: '#FABC3D'
    }
  },
  notActive: {
    display: 'none'
  },
  active: {
    color: '#FABC3D !important'
  },
  textStyle: {
    color: '#fff',
    transition: 'all 0.3s',
    // '&:hover': {
    //   color: theme.palette.secondary.main
    // }
  },
  // styles of TYPE OF BEACH dropdown
  menuTypeOfBeach: {
    zIndex: '100',
    clipPath: 'polygon(0% 4%, 5% 4%, 10% 0%, 15% 4% ,100% 4%, 100% 100%, 0% 100%)',
    // backgroundColor: '#F5F5F5',
    background: 'linear-gradient(to bottom right, #e1e1e1, #fff)',
    position: 'absolute',
    paddingTop: '1rem',
    top: '1.8rem',
    left: '0',
    height: '25rem',
    width: '50rem',
    overflowY: 'scroll'

  },
  typeOfBeachListRoot: {
    width: '100%',
    maxWidth: '50rem'
  },
  typeOfBeachSlider: {
    width: '30rem',
    color: theme.palette.secondary.main,
  },
  // styles of SERVICES dropdown
  menuServices: {
    zIndex: '100',
    clipPath: 'polygon(0% 4%, 5% 4%, 10% 0%, 15% 4% ,100% 4%, 100% 100%, 0% 100%)',
    // backgroundColor: '#F5F5F5',
    background: 'linear-gradient(to bottom right, #e1e1e1, #fff)',
    position: 'absolute',
    paddingTop: '1rem',
    top: '1.8rem',
    left: '0',
    height: '30rem',
    width: '30rem',
    overflowY: 'scroll',
  },
  servicesListRoot: {
    width: '100%',
    maxWidth: '30rem'
  },
  menuGeneral: {
    zIndex: '100',
    clipPath: 'polygon(0% 4%, 5% 4%, 10% 0%, 15% 4% ,100% 4%, 100% 100%, 0% 100%)',
    // backgroundColor: '#F5F5F5',
    background: 'linear-gradient(to bottom right, #e1e1e1, #fff)',
    position: 'absolute',
    paddingTop: '2rem',
    top: '1.8rem',
    left: '0',
    height: '30rem',
    width: '40rem',
    overflowY: 'scroll',


  },
  generalPadding: {
    paddingTop: '1.5rem'
  },
  marginCheckbox: {
    margin: '0 1rem'
  },
  labelTextFieldStyle: {
    color: '#fff',
    opacity: '0.6'
  },
  // styles of GENERAL dropdown
  generalListRoot: {
    width: '100%',
    maxWidth: '40rem'
  },
  generalOcuppancyFormControl: {
    width: '20rem',
    marginLeft: '2rem'
  },
  generalPrimary: {
    marginLeft: '1.7rem',

  },
  generalSecondary: {
    marginLeft: '1.7rem',
    marginTop: '1rem'
  },
  sliderThumb: {
    backgroundColor: theme.palette.secondary.main,
    '&:focus,&:hover,&$active': {
      // boxShadow: 'inherit', deletes it
      boxShadow: '#ccc 0px 0px 1px 6px',
      MozBoxShadow: '#ccc 0px 0px 1px 6px'

    },
  },
  generalSlider: {
    width: '20rem',
    color: theme.palette.secondary.main,
  },
  generalSpanKmLeft: {
    display: 'inline-block',
    transform: 'translateY(-7px)',
    marginRight: '0.7rem',
    color: '#777'
  },
  generalSpanKmRight: {
    display: 'inline-block',
    transform: 'translateY(-7px)',
    marginLeft: '1.7rem',
    color: '#777'
  },
  // iconHover: {
  //   '&:hover': {
  //     color: '#FABC3D !important',
  //   },
  // }

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

const SearchFilters = (props: Props) => {
  const { filters, actions } = props;
  const classes = useStyles();
  const debouncedhospitalDistance = useCallback(debounce(actions.setHospitalDistance, 500), []);
  const debouncedContainText = useCallback(debounce(actions.setSearchText, 500), []);
  const debouncedBeachLength = useCallback(debounce(actions.setBeachLength, 500), []);
  const [stateServices, setStateServices] = useState(false);
  const [stateTypeOfBeach, setStateTypeOfBeach] = useState(false);
  const [stateGeneral, setStateGeneral] = useState(false);
  const [valueContainText, setValueContainText] = useState(filters.searchText);
  const [hospitalDistance, setHospitalDistance] = useState(filters.hospitalDistance);
  const [beachLength, setBeachLength] = useState(filters.beachLength);

  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down(900));

  // clear filter press => correct updated value
  useEffect(() => {
    setValueContainText(filters.searchText);
  }, [filters.searchText])
  // clear filter press => correct updated value
  useEffect(() => {
    setHospitalDistance(filters.hospitalDistance);
  }, [filters.hospitalDistance])
  // clear filter press => correct updated value
  useEffect(() => {
    setBeachLength(filters.beachLength);
  }, [filters.beachLength])

  const handleClick = (name: string) => event => {
    if (name === 'services') {

      setStateServices(!stateServices);
      if (stateServices === false) {
        setStateGeneral(false);
        setStateTypeOfBeach(false);
      }
    } else if (name === 'typeOfBeach') {
      setStateTypeOfBeach(!stateTypeOfBeach);
      if (stateTypeOfBeach === false) {
        setStateServices(false);
        setStateGeneral(false);
      }
    } else if (name === 'general') {
      setStateGeneral(!stateGeneral);
      if (stateGeneral === false) {
        setStateServices(false);
        setStateTypeOfBeach(false);
      }
    }
  }
  const checkBoxHandler = (name: string) => (event: { target: { checked: boolean } }) => {
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
  };

  const handleOccupancy = (event: { target: { value: string } }) => {
    actions.setOccupancy(event.target.value);
  }
  const handleHospitalDistanceChange = (event, newValue: number) => {
    setHospitalDistance(newValue);
    debouncedhospitalDistance(newValue);


  }
  const handleBeachLengthChange = (event, newValue: number) => {
    const value = logarithmicSlider(newValue);
    setBeachLength(value);
    debouncedBeachLength(value);
  }
  const handleSelectChange = (e: { target: { value: string } }) => {

    actions.setSelectText(e.target.value);
    actions.setSearchText('');
    setValueContainText('');
  }
  const handleContainText = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setValueContainText(value);
    debouncedContainText(value);

  }

  const handleOnReset = () => {
    // hide menus
    setStateServices(false);
    setStateGeneral(false);
    setStateTypeOfBeach(false);
    // reset state in Redux
    actions.setReset();
  }
  // Active menu customization
  // type of beach
  let isActiveTypeOfBeach = classes.notActive;
  let highlightOnClickSectionTypeOfBeach = '';
  if (stateTypeOfBeach) {
    isActiveTypeOfBeach = '';
    highlightOnClickSectionTypeOfBeach = classes.active
  }
  // services
  let isActiveServices = classes.notActive;
  let highlightOnClickSectionServices = ''
  if (stateServices) {
    isActiveServices = '';
    highlightOnClickSectionServices = classes.active
  };
  // general
  let isActiveGeneral = classes.notActive;
  let highlightOnClickSectionGeneral = ''
  if (stateGeneral) {
    isActiveGeneral = '';
    highlightOnClickSectionGeneral = classes.active
  }
  let contentDesktop = (
    <div className={classes.root}>

      <div className={classes.generalPadding}>
        <span className={classes.textStyle} style={{ color: '#BBDEFB' }}>FILTERS </span>
        <img className={classes.filterSize} src={filterIcon} alt="filter icon" />
      </div>

      {/* TYPE OF BEACH *********************************************************** */}
      <div
        className={`${classes.wrapper} ${classes.generalPadding}`}>
        <div className={classes.textWrapper}>
          <span
            onClick={handleClick('typeOfBeach')}
            data-testid="dropdown-type-of-beach"
            className={`${classes.textStyle} ${highlightOnClickSectionTypeOfBeach}`}>Type of Beach
          </span>
          <div
            className={`${classes.menuTypeOfBeach} ${isActiveTypeOfBeach}`}
            data-testid="menu-type-of-beach"
          >
            <List classes={{
              root: classes.typeOfBeachListRoot
            }}>
              <ListItem alignItems="flex-start">
                <FormControlLabel
                  className={classes.marginCheckbox}
                  control={
                    <Checkbox
                      inputProps={{ 'data-testid': 'checkbox-nudism' }}
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
                      inputProps={{ 'data-testid': 'checkbox-blue-flag' }}
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

                      <span style={{ marginLeft: '12rem', display: 'block' }}>{Math.round(beachLength)} meters</span>
                    </React.Fragment>
                  }
                  classes={{
                    primary: classes.generalPrimary,
                    secondary: classes.generalSecondary
                  }}
                />
              </ListItem>

            </List>
          </div>
        </div>
        <ArrowDownIcon
          className={`${highlightOnClickSectionTypeOfBeach}`}
          titleAccess="dropdown icon"
          data-testid="arrowdownicon"
          role="img"
          onClick={handleClick('typeOfBeach')}
        />
      </div>

      {/* SERVICES *********************************************************** */}
      <div
        className={`${classes.wrapper} ${classes.generalPadding}`}>
        <div className={classes.textWrapper}>
          <span
            onClick={handleClick('services')}
            data-testid="dropdown-services"
            className={`${classes.textStyle} ${highlightOnClickSectionServices}`}
          >
            Services
          </span>
          <div className={`${classes.menuServices} ${isActiveServices}`}
            data-testid="menu-services"
          >
            <List classes={{
              root: classes.servicesListRoot
            }}>
              <ListItem alignItems="flex-start">
                <FormControlLabel
                  className={classes.marginCheckbox}
                  control={
                    <Checkbox
                      inputProps={{ 'data-testid': 'checkbox-surf' }}
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
                      inputProps={{ 'data-testid': 'checkbox-beach-bar' }}
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
                      inputProps={{ 'data-testid': 'checkbox-nautics' }}
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
                      inputProps={{ 'data-testid': 'checkbox-diving' }}
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
                      inputProps={{ 'data-testid': 'checkbox-sunbed-rental' }}
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
                      inputProps={{ 'data-testid': 'checkbox-umbrella-rental' }}
                      checked={filters.beachUmbrellaRental}
                      onChange={checkBoxHandler('alquiler_sombrillas')}
                      value="alquiler_sombrillas"
                    />
                  }
                  label="Beach umbrella rental"
                />
              </ListItem>
            </List>
          </div>
        </div>
        <ArrowDownIcon
          className={`${highlightOnClickSectionServices}`}
          titleAccess="dropdown icon"
          data-testid="arrowdownicon"
          role="img"
          onClick={handleClick('services')}
        />

      </div>
      {/* GENERAL *********************************************************** */}
      <div
        className={`${classes.wrapper} ${classes.generalPadding}`}>
        <div className={classes.textWrapper}>
          <span
            onClick={handleClick('general')}
            data-testid="dropdown-general"
            className={`${classes.textStyle} ${highlightOnClickSectionGeneral}`}
          >
            General
          </span>
          <div className={`${classes.menuGeneral} ${isActiveGeneral}`}
            data-testid="menu-general">
            <List classes={{
              root: classes.generalListRoot
            }}>
              <ListItem alignItems="flex-start">
                <FormControlLabel
                  className={classes.marginCheckbox}
                  control={
                    <Checkbox
                      inputProps={{ 'data-testid': 'checkbox-disabled' }}
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
                      inputProps={{ 'data-testid': 'checkbox-promenade' }}
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
                <FormControl classes={{
                  root: classes.generalOcuppancyFormControl
                }}>
                  <InputLabel htmlFor="select">Occupancy</InputLabel>
                  <Select
                    value={filters.occupancy}
                    onChange={handleOccupancy}
                    SelectDisplayProps={{
                      'data-testid': 'select-occupancy'
                    }}
                  >
                    <MenuItem value="All">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value="Alto" data-testid="hight">
                      High
                    </MenuItem>
                    <MenuItem value="Bajo">
                      Low
                    </MenuItem>
                    <MenuItem value="Medio">
                      Average
                    </MenuItem>
                    <MenuItem value="Medio / Alto">
                      Average / High
                    </MenuItem>
                    <MenuItem value="Medio / Bajo">
                      Average / Low
                    </MenuItem>
                    <MenuItem value="Muy bajo">
                      Very Low
                    </MenuItem>
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
                  classes={{
                    primary: classes.generalPrimary,
                    secondary: classes.generalSecondary
                  }}
                />
              </ListItem>
            </List>
          </div>
        </div>
        <ArrowDownIcon
          className={`${highlightOnClickSectionGeneral}`}
          titleAccess="dropdown icon"
          data-testid="arrowdownicon"
          role="img"
          onClick={handleClick('general')}
        />

      </div>

      <div className={classes.wrapper}>
        <FormControl>
          <InputLabel htmlFor="select" style={{ color: '#fff' }}>Select by</InputLabel>
          <Select
            value={filters.selectText}
            onChange={handleSelectChange}
            SelectDisplayProps={{
              'data-testid': 'select-search'
            }}
          >
            <MenuItem value="termino_municipal" data-testid="locality">
              Locality
            </MenuItem>
            <MenuItem value="nombre" data-testid="beach">
              Beach
            </MenuItem>
            <MenuItem value="comunidad_autonoma" data-testid="region">
              Region
            </MenuItem>
          </Select>

        </FormControl>
        <TextField
          id="my-search"
          label="Contain text"
          type="search"
          value={valueContainText}
          inputProps={{ "data-testid": "input" }}
          InputLabelProps={{
            className: classes.labelTextFieldStyle,
          }}
          style={{ marginLeft: '2rem' }}
          onChange={handleContainText}
          margin="none"
        />
      </div>
      <div className={`${classes.wrapper} ${classes.generalPadding}`}>
        <Typography onClick={handleOnReset} variant="subtitle1" style={{ opacity: '0.6' }}>Clear filters</Typography>
      </div>
    </div>
  );

  let contentMobile = (<SearchFiltersMobile
    filters={filters}
    actions={actions}
  />);
  let content = contentDesktop;
  if (matchesMobile) {
    content = contentMobile;
  }
  return (
    <React.Fragment>
      {content}
    </React.Fragment>
  );
}

export default SearchFilters;