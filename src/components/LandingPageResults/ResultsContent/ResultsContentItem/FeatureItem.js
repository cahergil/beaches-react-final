import React from 'react';
import { makeStyles } from '@material-ui/core';
import FlagIcon from '@material-ui/icons/Flag';

const useStyle = makeStyles({
  root: {
    backgroundColor: '#F0F0F0',
    color: '#959595',
    padding: '5px 7px',
    fontSize: '1.4rem',
    marginRight: '5px',
    marginTop: '5px'
  },
  icon: {
    fontSize: '16px',
  
  }
})

const FeatureItem = props => {
  const { feature } = props;
  const classes = useStyle();
  let content = feature;
  if (feature === 'blue flag') {
    content = <FlagIcon className={classes.icon} style={{ fill: '#074c82'}} />
  }
  return (
    <div className={classes.root}>
      {content}
    </div>
  );
}

export default FeatureItem;