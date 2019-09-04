// @flow
import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ResultsContentItem from './ResultsContentItem/ResultsContentItem';
import scrollIntoView from 'scroll-into-view';

import BeachObject from './../../Model/Model';
import type { Beach } from '../../Model/Beach'


const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(35rem, 1fr))',
    gridColumn: '5rem',
    justifyItems: 'center',
    justifyContent: 'center',
    gridRowGap: '2rem',
    minHeight: '30rem'
    
  },
  loading: {
    alignContent: 'center',
    fontSize: '2rem',
    backgroundColor: '#777',
    color: '#fff'
  },
  showing: {
    alignContent: 'center',
    fontSize: '1.5rem',
    margin: '2rem',
    color: '#777'
  }
})

type Action =
   { type: 'CHANGE_OFFSET', payload: number }
  | { type: 'CHANGE_LOADING', payload: boolean }
  | { type: 'CHANGE_HAS_MORE_ITEMS', payload: boolean }
  | { type: 'SET_BEACHES', payload: Array<Beach> };

type State = {
  offset: number,
  loading: boolean,
  hasMoreItems: boolean,
  beaches: Array<Beach>
}


const initialState: State = {
  offset: 6,
  loading: false,
  hasMoreItems: true,
  beaches: []
}
function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'CHANGE_OFFSET':
      return {
        ...state,
        offset: action.payload
      }
    case 'CHANGE_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'CHANGE_HAS_MORE_ITEMS':
      return {
        ...state,
        hasMoreItems: action.payload
      }
    case 'SET_BEACHES':
      return {
        ...state,
        beaches: action.payload
      }
    default: return state
  }


}


type Props = {
  beachesList: Array<Beach>,
  regionId?: string
}
// React.memo to avoid rerender with all beaches when returning from details
const ResultsContent = ({beachesList, regionId}: Props) => {
  const [state, dispatch] = useReducer<State, Action>(reducer, initialState)
  const classes = useStyles()
  const step = 12;
  
  useEffect(() => {
 
    const hasMoreItems = beachesList.length > step;
    const tempBeaches = beachesList.slice(0, hasMoreItems ? step : beachesList.length);
    dispatch({ type: 'CHANGE_LOADING', payload: false });
    dispatch({ type: 'CHANGE_HAS_MORE_ITEMS', payload: hasMoreItems ? true : false });
    dispatch({ type: 'CHANGE_OFFSET', payload: 12 });
    dispatch({ type: 'SET_BEACHES', payload: tempBeaches });
      
    setTimeout(() => {
      const element = document.getElementById('filter');
      if (element) {
          scrollIntoView(element, {
            time: 300,
            align: {
              top: 0.2
            }
          })
        }
        
    }, 200);
     
   
    
  },[beachesList]);

  useEffect(() => {
    const loadItems = () => {
      // beachesList.length ===0 conditon for coming back from details
      if (state.loading || !state.hasMoreItems || beachesList.length ===0) {
        return;
      }
      
      dispatch({ type: 'CHANGE_LOADING', payload: true });
      dispatch({ type: 'SET_BEACHES', payload: beachesList.slice(0, state.offset + step) });
      dispatch({ type: 'CHANGE_HAS_MORE_ITEMS', payload: (state.offset + step) >= beachesList.length ? false : true });
      dispatch({ type: 'CHANGE_OFFSET', payload: state.offset + step });
      dispatch({ type: 'CHANGE_LOADING', payload: false });
    }
    const handleScroll = (event) => {
      const viewport: number = window.innerHeight;
      const rootNode: window.HTMLHtmlElement = document.documentElement;
      const scrolledFromTop: number = rootNode.scrollTop;
      const bottom: number = rootNode.offsetHeight;
      // 100 for mobile to work
      if (viewport + scrolledFromTop + 100 > bottom) {
        loadItems();
      }

    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }

  }, [beachesList,state.loading, state.offset, state.hasMoreItems]);
 
 
  
  return (
    <React.Fragment>
      <div className={classes.showing}>Showing {state.beaches.length} beach(es) of {beachesList.length}</div>
      <div id="content" data-testid="content" className={classes.root}>
        {
          state.beaches.map((beach, index) => {
            return <ResultsContentItem
              key={index}
              beach={beach}
              regionId={regionId}
              remainingPhotos={beach.images.split(',').length - 2} />
          })}
      </div>
    
    </React.Fragment>
    
  );
};

ResultsContent.propTypes = {
  beachesList: PropTypes.arrayOf(
    PropTypes.shape(BeachObject)
  ).isRequired,
  // not required in search component
  regionId: PropTypes.string
};

export default React.memo<Props>(ResultsContent);