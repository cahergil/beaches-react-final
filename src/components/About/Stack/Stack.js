import React from 'react';
import { makeStyles, ListItem, ListItemText } from '@material-ui/core';
import Fade  from 'react-reveal/Fade';
import Title from '../Title';
import Divider  from '@material-ui/core/Divider';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  wrapper: {
    paddingLeft: '2rem'
  },
  subHeader: {
    fontSize: '1.7rem',
    textAlign: 'left',
    marginBottom: '1rem'
  },
})

const Stack = props => {
  const classes = useStyles();
  const stack = [{ tech: 'React', url: 'https://reactjs.org/' }, { tech: 'React router', url: 'https://reacttraining.com/react-router/web/guides/quick-start' }, { tech: 'Redux', url: 'https://redux.js.org/' }, {
    tech: 'Material-UI', url: 'https://material-ui.com/'
  }, { tech: 'Sass', url: 'https://sass-lang.com/' }, { tech: 'Formik', url: 'https://github.com/jaredpalmer/formik' }, { tech: 'React-image-gallery', url: 'https://www.npmjs.com/package/react-image-gallery' }, { tech: 'React reveal', url: 'https://www.react-reveal.com/examples/' }, { tech: 'React-image-fallback', url: 'https://github.com/socialtables/react-image-fallback'}]
  return (
    <section className={classes.root}>
      <Fade duration={600} right>
        <Title title="Stack" color="#000" lineLength="5rem" />
      </Fade>
      <div className={classes.wrapper}>
        <div className={classes.subHeader}>
          Libraries:
        </div>
        <div>
          {
            stack.map((stackItem, index) =>
              <React.Fragment key={index}>
                <ListItem button component="a" href={stackItem.url} target="_blank">
                  <ListItemText primary={stackItem.tech} secondary={stackItem.url} />
                </ListItem>
                {index !== stack.length - 1 ? <Divider /> : null
                }
              </React.Fragment>
            )
          }
        </div>
      </div>
    </section>
  );
}

export default Stack;