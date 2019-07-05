import React from 'react';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(theme=>({
  
  headingGrid: {
    margin: '10rem 0',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'repeat(2, min-content)',
    gridRowGap: '1rem',
    justifyContent: 'center',
    justifyItems: 'center',
    marginBottom: '7rem'
  },
  title: {
    color: props => props.color,
    fontSize: '4rem',
    fontWeight: 300
  },
  underline: {
    
    width: props => props.lineLength,
    height: '0.3rem',
    background: theme.palette.secondary.main
  }
  
}));




const Title = (props) => {
    const { title} = props
  const classes = useStyles(props);
  return (
    <div className={classes.headingGrid}>
      <h1 className={classes.title}>
        {title}
      </h1>
      <div className={classes.underline}>
      </div>
    </div>
  );

}

export default Title;