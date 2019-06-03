import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  white: {
    color: '#fff'
  },
  ulStyle: {
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  liStyle: {
    display: 'inline-block'
  },
  linkStyle: {
    textDecoration: 'none',
    '&:link,&:visited': {
      color: '#fff'
    },
    '&:hover,&:active': {
      color: '#E91E63'
    },
    fontSize: '1.5rem',
    transition: '200ms color'
  },
  marginRight: {
    marginRight: '2rem'
  },
  sectionsBreakPoint: {
    [theme.breakpoints.down(650)]: {
      display: 'none'
    }
  },
  iconBreakPoint: {
    [theme.breakpoints.up(650)]: {
      display: 'none'
    }
  },
  grow: {
    flexGrow: 1
  },
})
)


const Navbar = (props) => {
  const { sections, burgerClicked } = props;
  const classes = useStyles();

  const toolbarSections = (
    <nav>
      <ul className={classes.ulStyle}>
        {
          sections.map((section, index) => {
            return (
              <li key={index} className={classes.liStyle}>
                <Link
                  // activeClass(NavLink) only works with this form of 'to'
                  to={{
                    pathname: '/'+ section

                  }}
                  // pressing Link causes a render, we can caputre props.location.hash
                  // with onClick this is not necessary
                 
                  className={`${classes.linkStyle} ${
                    classes.marginRight
                    }`}
                >
                  {section.toUpperCase()}
                </Link>
              </li>
            );
          })
        }

      </ul>
    </nav>

  );

  return (
    <AppBar position="fixed">
      <Toolbar>
        
        <IconButton className={`${classes.white} ${classes.iconBreakPoint}`} onClick={burgerClicked}>
          <MenuIcon ></MenuIcon>
        </IconButton>
        
        <div className={classes.grow}></div>
        <div className={classes.sectionsBreakPoint}>
          {toolbarSections}
        </div>
      </Toolbar>

    </AppBar>
  );
}

export default Navbar;