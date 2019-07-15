import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Stack from '../../components/About/Stack/Stack';
import Attribution from '../../components/About/Attribution/Attribution';
import Email from '../../components/About/Email/Email';
import NavDrawer from '../../components/Navigation/NavDrawer';
import * as actionsMapArea from '../../store/actions/mapArea';

const useStyle = makeStyles({
  root: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '100%',

  }
});

const About = props => {
  const { onSetMapArea } = props;
  const classes = useStyle();
  useEffect(() => {
    const element = document.getElementById('navbar');
    if (element) {
      element.scrollIntoView();
    }
  }, []);
  return (
    <React.Fragment>
      <NavDrawer onSetMapArea={onSetMapArea}/>
      <section className={classes.root}>
        <Stack />
        <Attribution />
        <Email />
      </section>
    </React.Fragment>
      
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onSetMapArea: (value) => dispatch(actionsMapArea.setMapArea(value))
  }
}


export default connect(null, mapDispatchToProps)(About);

