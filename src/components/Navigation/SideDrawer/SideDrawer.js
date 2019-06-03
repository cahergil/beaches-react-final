import React from 'react';
import { Hidden, Drawer, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';


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
      color: '#E91E63'
      
     
    },
    fontSize: '1.5rem',
    transition: '200ms color'
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.primary.main
  }
}))

const SideDrawer = (props) => {
  const { sections, drawerOpen, onClose} = props;
  const classes = useStyles();

  
  const drawerSections = (
    <nav className={classes.navStyle}>
      <ul className={classes.ulStyle}>
        {
          sections.map((section, index)=> {
            return (
              <li
                key={index}
                className={classes.liStyle}>
                <Link
                  key={index}
                  to={{
                    pathname: '/'
                  }}
                  className={classes.linkStyle}
                  
                >
                  {
                    section.toUpperCase() 
                  }
                  
                </Link>
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