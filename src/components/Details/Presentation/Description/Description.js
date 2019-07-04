import React from 'react';

import { makeStyles} from '@material-ui/core';
import Title from './../../Title/Title';
import TranslateTextField from './../../TranslateTextField';
import * as utils from '../../../../Utils/Utils'

const useStyles = makeStyles(theme =>({
  root: {
    gridColumn: '1 / span 2',
    fontSize: '2rem',
    margin: '2rem',
    [theme.breakpoints.down(800)]: {
      gridColumn: '1 / span 1'
    } 
  },
  sectionRoot: {
    width: '100%',
    display: 'grid',
    gridTemplateRows: 'repeat(2, min-content)',
    boxShadow: '2px 1px 5px #ccc',
    borderRadius: '5px',
    overflow: 'hidden'
  },
}))

const Description = props => {
  const { description, colorSchema } = props;
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <div className={classes.sectionRoot}>
        <Title colorSchema={colorSchema} name="Description" />
        <div>
          <TranslateTextField text={utils.toRemoveQuotes(description)}/>
        </div>
      </div> 
    </section>
  );
}

export default Description;