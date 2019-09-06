import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const circularStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center'
}

const SpinnerWhenRouting = props => {

  return (
    <div data-testid="spinner" style={circularStyle}>
      <CircularProgress
        color="primary"
        size={80}
        thickness={3.6}
      />
    </div>   
  );
}

export default SpinnerWhenRouting