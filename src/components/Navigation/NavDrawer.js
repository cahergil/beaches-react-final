
import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import SideDrawer from './SideDrawer/SideDrawer'



const NavDrawer = (props) => {
  const { onSetMapArea } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const sections = ['spain-map', 'search', 'about']
  const handleBurgerToggle = () => {
    setDrawerOpen(prevState => !prevState);
  }

  return (
    <React.Fragment>

      <Navbar
        sections={sections}
        burgerClicked={handleBurgerToggle}
        onSetMapArea={onSetMapArea}
      />
     
      <SideDrawer
        sections={sections}
        drawerOpen={drawerOpen}
        onClose={handleBurgerToggle}
        onSetMapArea={onSetMapArea}

      />
      
    </React.Fragment>
  );
}

export default NavDrawer;