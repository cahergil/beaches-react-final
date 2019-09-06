import React from 'react';
import Loadable  from 'react-loadable';
import SpinnerWhenRouting from '../SpinnerWhenRouting/SpinnerWhenRouting';
const LoadableSearch = () => {
  const LoadableSearch = Loadable({
  loader: () => import('../../containers/Search/Search'),
  loading: () => <SpinnerWhenRouting />
  })
  return (
    <div>
    <LoadableSearch />
    </div>
  )
}

export default LoadableSearch; 