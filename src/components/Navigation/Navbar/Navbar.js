import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';
import Loadable from 'react-loadable';
import SpinnerWhenRouting from '../../SpinnerWhenRouting/SpinnerWhenRouting';


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
      // color: '#E91E63'
      color: theme.palette.secondary.main
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


const SearchLoadable = Loadable({
  loader: () => import('../../../containers/Search/Search'),
  loading: () => <SpinnerWhenRouting />
 
})

const AboutLoadable = Loadable({
  loader: () => import('../../../containers/About/About'),
  loading: () => <SpinnerWhenRouting />
 
})

// https://github.com/ReactTraining/react-router/issues/5376
 const LooseNavLink = props => (
  <NavLink {...props} isActive={(match, location) => location.pathname.startsWith(props.to.pathname)} />
)

const Navbar = (props) => {
  const { sections, burgerClicked } = props;
  const matchesMaxWidth650 = useMediaQuery('(max-width: 650px)')
  const classes = useStyles();
 

  const handleMouseOver = (section) => {
    if (section === 'search') {
      SearchLoadable.preload()
    } 
    if (section === 'about') {
      AboutLoadable.preload();
    }
  }
  const toolbarSections = (
    <nav id="navbar">
      <ul className={classes.ulStyle}>
        {
          sections.map((section, index) => {
            return (
              <li 
                key={index} 
                className={classes.liStyle}
                data-cy="nav-item"
                data-testid="nav-item"
                >
                <LooseNavLink
                  // activeClass(NavLink) only works with this form of 'to'
                  exact
                  to={{
                    pathname: '/' + (section === section[0] ? 'spain-map' : section),
                    state: section === 'search' ? 'other': section
                   

                  }}
                  activeStyle={{
                    color: '#D4AC16',
                    fontWeight: 'bold'
                  }}
                  // pressing Link causes a render, we can caputre props.location.hash
                  // with onClick this is not necessary
                  target="_self"
                  className={`${classes.linkStyle} ${
                    classes.marginRight
                    }`}
                  
                  onMouseOver={() => section === 'search' || section === 'about'? handleMouseOver(section): null}
                >
                  {section.toUpperCase()}
                </LooseNavLink>
              </li>
            );
          })
        }

      </ul>
    </nav>

  );

  return (
    <AppBar position="sticky">
      <Toolbar>
        
        <IconButton className={`${classes.white} ${classes.iconBreakPoint}`} onClick={burgerClicked}>
          <MenuIcon ></MenuIcon>
        </IconButton>
        
        <div className={classes.grow}></div>
        <div className={classes.sectionsBreakPoint}>
          {!matchesMaxWidth650 && toolbarSections}
        </div>
      </Toolbar>

    </AppBar>
  );
}

export default Navbar;