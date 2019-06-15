import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ResultsContentItem from './ResultsContentItem/ResultsContentItem';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(35rem, 1fr))',
    gridColumn: '5rem',
    justifyItems: 'center',
    justifyContent: 'center',
    gridRowGap: '2rem'
    
  }
})

const ResultsContent = (props) => {
  const { beachesRegionList } = props;
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {
        beachesRegionList.map((beach, index) => {
          return <ResultsContentItem key={index} beach={beach} />
        })
        }
    </div>
  );
}

export default ResultsContent;