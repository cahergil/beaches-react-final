import React from 'react';
import { Hidden, Drawer, makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';


const drawerWidth = 150;
const useStyles = makeStyles(theme => ({
 
  navStyle: {
    margin: '1.6rem'
  },
  ulStyle: {
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  liStyle: {
    display: 'block',
    margin: '1.6rem 0'
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
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.primary.main
  }
}))

// https://github.com/ReactTraining/react-router/issues/5376
const LooseNavLink = props => (
  <NavLink {...props} isActive={(match, location) => location.pathname.startsWith(props.to.pathname)} />
)

const SideDrawer = (props) => {
  const { sections, drawerOpen, onClose} = props;
  const classes = useStyles();
  const handleClick = () => {
    onClose()
  }
  
  const drawerSections = (
    <nav className={classes.navStyle}>
      <ul className={classes.ulStyle}>
        {
          sections.map((section, index)=> {
            return (
              <li
                data-cy="drawer-item"
                data-testid="drawer-item"
                key={index}
                className={classes.liStyle}>
                <LooseNavLink
                  key={index}
                  // 
                  exact
                  to={{
                    pathname: '/' + (section === section[0] ? 'spain-map' : section),
                    state: section === 'search' ? 'other' : section
                  }}
                  className={classes.linkStyle}
                  activeStyle={{
                    color: '#D4AC16',
                    fontWeight: 'bold'
                  }}
                 onClick={handleClick}
                >
                  {
                    section.toUpperCase() 
                  }
                  
                </LooseNavLink>
              </li>

            )

          })
        }
      </ul>

    </nav>
  );


  return (
    <Hidden smUp>
      <Drawer
        variant="temporary"
        anchor="left"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        classes={{
          paper: classes.drawerPaper,
        }}
        open={drawerOpen}
        onClose={onClose}
      >
        {drawerSections}
      </Drawer>
     
    </Hidden>
   
  );
}

export default SideDrawer;