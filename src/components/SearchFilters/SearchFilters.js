import React, {useState, useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, InputLabel, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import KeyBoardArrowDownIcon from '@material-ui/icons/ArrowDropDown';
// import KeyBoardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import filterIcon from '../../assets/images/filters.png';
import FormControl  from '@material-ui/core/FormControl';
import Select  from '@material-ui/core/Select';
import MenuItem  from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import _ from 'lodash';
import SearchFiltersMobile from './SearchFiltersMobile';
import { logarithmicSlider, logPositionSlider } from './../../Utils/Utils';



const useStyles = makeStyles(theme =>({
  root: {
 
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
  },
  // styles of TYPE OF BEACH dropdown
  menuTypeOfBeach: {
    zIndex: '100',
    clipPath: 'polygon(0% 4%, 5% 4%, 10% 0%, 15% 4% ,100% 4%, 100% 100%, 0% 100%)',
    backgroundColor: '#F5F5F5',
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
    backgroundColor: '#F5F5F5',
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
    backgroundColor: '#F5F5F5',
    position: 'absolute',
    paddingTop: '2rem',
    top: '1.8rem',
    left: '0',
    height: '30rem',
    width: '40rem',
    overflowY: 'scroll',
  
    
  },
  notActive: {
    display: 'none'
  },
  textStyle: {
    color: '#fff',
  },
  generalPadding: {
    paddingTop: '1.5rem'
  },
  marginCheckbox: {
    margin: '0 1rem'
  },
  labelTextFieldStyle: {
    color: '#fff'
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
    transform: 'translateY(-7px)',
    display: 'inline-block',
    marginLeft: '1.7rem',
    color: '#777'
  }

}));


const SearchFilters = props => {
  const { filters, actions } = props;
  const classes = useStyles();
  const { debounce } = _;
  const debouncedhospitalDistance = useCallback(debounce(actions.onSetHospitalDistance, 500), []);
  const debouncedContainText = useCallback(debounce(actions.onSetSearchText, 500), []);
  const debouncedBeachLength = useCallback(debounce(actions.onSetBeachLength, 500), []);
  const [stateServices, setStateServices] = useState(false);
  const [stateTypeOfBeach, setStateTypeOfBeach] = useState(false);
  const [stateGeneral, setStateGeneral] = useState(false);
  const [valueContainText, setValueContainText] = useState(filters.searchText);
  const [hospitalDistance, setHospitalDistance] = useState(filters.hospitalDistance);
  const [beachLength, setBeachLength] = useState(filters.beachLength);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(900));

  const handleClick = name => event => {
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
  const checkBoxHandler = name => event => {
    if (name === 'nudismo') {
      
      actions.onSetNudism(event.target.checked);
    } else if (name === 'bandera_azul') {
      actions.onSetBlueFlag(event.target.checked);
    } else if (name === 'zona_surf') {
      actions.onSetSurfingArea(event.target.checked);
    } else if (name === 'establecimiento_comida') {
      actions.onSetBeachBar(event.target.checked);
    } else if (name === 'alquiler_nauticos') {
      actions.onSetNauticsRental(event.target.checked);
    } else if (name === 'submarinismo') {
      actions.onSetDivingArea(event.target.checked);
    } else if (name === 'alquiler_hamacas') {
      actions.onSetSunbedRental(event.target.checked);
    } else if (name === 'alquiler_sombrillas') {
     
      actions.onSetUmbrellaBeachRental(event.target.checked);
    
    } else if (name === 'acceso_discapacitados') {
      actions.onSetDisabledPersons(event.target.checked);
    
    } else if (name === 'paseo_maritimo') {

      actions.onSetPromenade(event.target.checked);
    } 
  }

  const handleOccupancy = event => {
    actions.onSetOccupancy(event.target.value);
  }
  const handleHospitalDistanceChange = (event,newValue) => {
    setHospitalDistance(newValue);
    debouncedhospitalDistance(newValue);
  

  }
  const handleBeachLengthChange = (event, newValue) => {
    const value = logarithmicSlider(newValue);
    setBeachLength(value);
    debouncedBeachLength(value);
  }
  const handleSelectChange = (e) => {

    actions.onSetSelectText(e.target.value);
  }
  const handleContainText = (e) => {
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
    actions.onResetFilters();
  }
  // type of beach
  let isActiveTypeOfBeach = classes.notActive;
  if (stateTypeOfBeach) {
    isActiveTypeOfBeach = '';
  }
  // services
  let isActiveServices = classes.notActive;
  if (stateServices) {
    isActiveServices = '';
  };
  // general
  let isActiveGeneral = classes.notActive;
  if (stateGeneral) {
    isActiveGeneral = '';
  }
  let contentDesktop = (
    <div className={classes.root}>
      
      <div className={classes.generalPadding}>
        <span className={classes.textStyle} style={{ color: '#BBDEFB'}}>FILTERS </span>
        <img className={classes.filterSize} src={filterIcon} alt="filter icon" />
      </div>

      {/* TYPE OF BEACH *********************************************************** */}
      <div  
        onClick={handleClick('typeOfBeach')}
        className={`${classes.wrapper} ${classes.generalPadding}`}>
        <div className={classes.textWrapper}>
          <span  className={classes.textStyle}>Type of Beach</span>
          <div className={`${classes.menuTypeOfBeach} ${isActiveTypeOfBeach}`} >
            <List classes={{
              root: classes.typeOfBeachListRoot
            }}>
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
        <KeyBoardArrowDownIcon />
      </div>

      {/* SERVICES *********************************************************** */}
      <div 
        className={`${classes.wrapper} ${classes.generalPadding}`}>
        <div className={classes.textWrapper}>
          <span onClick={handleClick('services')} className={classes.textStyle}>Services</span>
          <div className={`${classes.menuServices} ${isActiveServices}`}>
            <List classes={{
              root: classes.servicesListRoot
            }}>
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
          </div>
        </div>
        <KeyBoardArrowDownIcon onClick={handleClick('services')} />
      </div>
      {/* GENERAL *********************************************************** */}
      <div 
        className={`${classes.wrapper} ${classes.generalPadding}`}>
        <div className={classes.textWrapper}>
          <span onClick={handleClick('general')}  className={classes.textStyle}>General</span>
          <div className={`${classes.menuGeneral} ${isActiveGeneral}`}>
            <List classes={{
              root: classes.generalListRoot
            }}>
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
                <FormControl classes={{
                  root: classes.generalOcuppancyFormControl
                }}>
                  <InputLabel htmlFor="select">Occupancy</InputLabel>
                  <Select
                    value={filters.occupancy}
                    onChange={handleOccupancy} >
                    <MenuItem value="All">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value="Alto">
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
        <KeyBoardArrowDownIcon onClick={handleClick('general')} />
      </div>
     
      <div className={classes.wrapper}>
        <FormControl>
          <InputLabel htmlFor="select" style={{color: '#fff'}}>Select by</InputLabel>
          <Select
             value={filters.selectText}
             onChange={handleSelectChange}
          >
            <MenuItem value="termino_municipal">
              Locality
            </MenuItem>
            <MenuItem value="nombre">
              Beach
            </MenuItem>
            <MenuItem value="comunidad_autonoma">
              Region
            </MenuItem>
          </Select>

        </FormControl>       
        <TextField
          id="my-search"
          label="Contain text"
          type="search"
          value={valueContainText}
          InputLabelProps={{
            className: classes.labelTextFieldStyle,
          }}
          style={{ marginLeft: '2rem' }}
          onChange={handleContainText}
          margin="none"
        />
      </div>
      <div className={`${classes.wrapper} ${classes.generalPadding}`}>
        <Typography onClick={handleOnReset} variant="subtitle1" style={{opacity: '0.6'}}>Reset</Typography>
      </div>
      </div>
  );

  let contentMobile = (<SearchFiltersMobile
    filters={filters}
    actions={actions}
  />);
  let content = contentDesktop;
  if (matches) {
    content = contentMobile;
  }
  return (
    <React.Fragment>
      {content}  
    </React.Fragment>
      );
}

export default SearchFilters;