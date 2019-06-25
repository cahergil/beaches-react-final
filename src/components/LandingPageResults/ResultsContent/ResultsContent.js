import React, { useState, useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ResultsContentItem from './ResultsContentItem/ResultsContentItem';
import scrollIntoView from 'scroll-into-view';


const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(35rem, 1fr))',
    gridColumn: '5rem',
    justifyItems: 'center',
    justifyContent: 'center',
    gridRowGap: '2rem'
    
  },
  // loader: {
  //   fontSize: '2rem',
  //   color: '#fff',
  //   backgroundColor: '#777'
  // },
  showing: {
    alignContent: 'center',
    fontSize: '1.5rem',
    margin: '2rem',
    color: '#777'
  }
})

const initialState = {
  offset: 6,
  loading: false,
  hasMoreItems: true
}

const ResultsContent = (props) => {
  const { beachesRegionList } = props;
  const [beaches, setBeaches] = useState([]);

  const [state, dispatch] = useReducer(reducer, initialState)
 
  function reducer(state, action) {
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
      default: return state
      }


  }
  const classes = useStyles()
  const step = 6;
 
 

  useEffect(() => {
    const hasMoreItems = beachesRegionList.length > step;
    setBeaches(beachesRegionList.slice(0, hasMoreItems ? step: beachesRegionList.length));
    dispatch({ type: 'CHANGE_LOADING', payload: false });
    dispatch({ type: 'CHANGE_HAS_MORE_ITEMS', payload: hasMoreItems ? true : false })
    dispatch({ type: 'CHANGE_OFFSET', payload: 6 })

    setTimeout(() => {
      const element = document.getElementById('filter');
      if (element) {
          scrollIntoView(element, {
            time: 500,
            align: {
              top: 0.2
            }
          })
        }
        
    }, 500);
   
    
  },[beachesRegionList]);

  useEffect(() => {
    const loadItems = () => {
      if (state.loading || !state.hasMoreItems) {
        return;
      }
      dispatch({ type: 'CHANGE_LOADING', payload: true });
      setBeaches(beachesRegionList.slice(0, state.offset + step));
      dispatch({ type: 'CHANGE_HAS_MORE_ITEMS', payload: (state.offset + step) >= beachesRegionList.length ? false : true })
      dispatch({ type: 'CHANGE_OFFSET', payload: state.offset + step });
      dispatch({ type: 'CHANGE_LOADING', payload: false });
    }
    const handleScroll = (event) => {

      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        loadItems();
      }

    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }

  }, [beachesRegionList,state.loading, state.offset, state.hasMoreItems]);
 
 
  
  return (
    <React.Fragment>
      <div className={classes.showing}>Showing {beaches.length} beach(es) of {beachesRegionList.length}</div>
      <div id="content" className={classes.root}>
        {
          beaches.map((beach, index) => {
              return <ResultsContentItem key={index} beach={beach} />
          })}
      </div>
    
    </React.Fragment>
    
  );
}

export default ResultsContent;