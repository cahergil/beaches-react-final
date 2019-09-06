import React from 'react';
import Loadable  from 'react-loadable';
import SpinnerWhenRouting from '../SpinnerWhenRouting/SpinnerWhenRouting';
const LoadableAbout = () => {
  const LoadableAbout = Loadable({
  loader: () => import('../../containers/About/About'),
  loading: () => <SpinnerWhenRouting />
  })
  return (
    <div>
    <LoadableAbout />
    </div>
  )
}

export default LoadableAbout; 