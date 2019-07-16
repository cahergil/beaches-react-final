import React from 'react';
import { makeStyles, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import Fade  from 'react-reveal/Fade';
import Title from '../Title';
import Divider  from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import githubIcon from '../../../assets/images/github.png'
import reactIcon from '../../../assets/images/react.png'
import reactRouterIcon from '../../../assets/images/reactRouter.png'
import reduxIcon from '../../../assets/images/redux.png'
import materialUIIcon from '../../../assets/images/materialUi.png'
import sassIcon from '../../../assets/images/sass.png'


const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  wrapper: {
    padding: '0 2rem'
  },
  subHeader: {
    fontSize: '1.7rem',
    textAlign: 'left',
    marginBottom: '1rem'
  },
  avatar: {
    margin: '3px',
    width: '32px',
    height: '32px',
  },
})

const Stack = props => {
  const classes = useStyles();
  const stack = [
    {
      tech: 'React 16.8.6',
      url: 'https://reactjs.org/',
      icon: reactIcon
    },
    {
      tech: 'React router 5.0.0',
      url: 'https://reacttraining.com/react-router/web/guides/quick-start',
      icon: reactRouterIcon
    },
    {
      tech: 'Redux 4.0.1',
      url: 'https://redux.js.org/',
      icon: reduxIcon
    },
    {
      tech: 'Material-UI 4.2.0',
      url: 'https://material-ui.com/',
      icon: materialUIIcon
    },
    {
      tech: 'Sass',
      url: 'https://sass-lang.com/',
      icon: sassIcon
    },
    {
      tech: 'React-image-gallery 0.8.17',
      url: 'https://github.com/xiaolin/react-image-gallery',
      icon: githubIcon
    },
    {
      tech: 'React reveal 1.2.2',
      url: 'https://github.com/rnosov/react-reveal',
      icon: githubIcon
    },
    {
      tech: 'React-image-fallback 8.0.0',
      url: 'https://github.com/socialtables/react-image-fallback',
      icon: githubIcon
    },
    {
      tech: 'Amcharts3-react 3.1.0',
      url: 'https://github.com/amcharts/amcharts3-react',
      icon: githubIcon
    },
    {
      tech: 'React-google-maps 9.4.5',
      url: 'https://github.com/tomchentw/react-google-maps',
      icon: githubIcon
    },
    {
      tech: 'React-textfit 1.1.0',
      url: 'https://github.com/malte-wessel/react-textfit',
      icon: githubIcon
    }]
  return (
    <section className={classes.root}>
      <Fade duration={600} right>
        <Title margin="3rem 0" title="Stack" color="#000" lineLength="5rem" />
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
                  <ListItemAvatar>
                    <Avatar src={stackItem.icon} alt="Pngtree logo" className={classes.avatar} />
                  </ListItemAvatar>
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