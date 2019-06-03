
import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import SideDrawer from './SideDrawer/SideDrawer'



const NavDrawer = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const sections = ['map', 'search', 'graphics']
  
  const handleBurgerToggle = () => {
    console.log('handleToggleBurger');
    setDrawerOpen(prevState => !prevState);
  }

  return (
    <React.Fragment>

      <Navbar
        sections={sections}
        burgerClicked={handleBurgerToggle}
      />
     
      <SideDrawer
        sections={sections}
        drawerOpen={drawerOpen}
        onClose={handleBurgerToggle}
      />
      
    </React.Fragment>
  );
}

export default NavDrawer;