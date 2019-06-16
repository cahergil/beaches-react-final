import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InfiniteScroll from 'react-infinite-scroller';
// import InfiniteScroll from 'react-infinite-scroll-component';
import ResultsContentItem from './ResultsContentItem/ResultsContentItem';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(35rem, 1fr))',
    gridColumn: '5rem',
    justifyItems: 'center',
    justifyContent: 'center',
    gridRowGap: '2rem'
    
  },
  loader: {
    fontSize: '2rem',
    color: '#fff',
    backgroundColor: '#777'
  }
})

const ResultsContent = (props) => {
  const { beachesRegionList } = props;
  const [beaches, setBeaches] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const classes = useStyles()
  const step = 12;
 
  useEffect(() => {
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    items = [];
    setBeaches([]);
    setOffset(0);
    setHasMoreItems(true);
    beaches.map((beach, index) => {
      return items.push(<ResultsContentItem key={index} beach={beach} />)
    });
    setTimeout(() => {
      
      // const element = document.getElementById('content');
      // console.log(element);
      // // element.scrollIntoView(true);
      // window.scrollBy(0,2000);
    }, 1500);

    // window.scrollBy(0, 300);
    // loadFunc();
  },[beachesRegionList]);
  const loadFunc = ()=> {
    const tempArray = beachesRegionList.slice(0, offset + step);
    setBeaches(tempArray);
    setOffset(offset + step);
    if (offset + step >= beachesRegionList.length) {
      setHasMoreItems(false);
    }
  }
  
  let items = [];
  beaches.map((beach, index) => {
      return items.push(<ResultsContentItem key={index} beach={beach} />)
  });
  
  return (
   

       <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={hasMoreItems}
        initialLoad={true}
        loader={<div className={classes.loader} key={0}>Loading ...</div>}
      >
        <div id="content" className={classes.root}>
        {items}
      </div>
      </InfiniteScroll>
      
    
  );
}

export default ResultsContent;