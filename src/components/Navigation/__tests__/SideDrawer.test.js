import React from 'react';

import { renderWithRouter, customRenderWithRouter, wait } from '../../../../tests/test-utils';
import NavDrawer from '../NavDrawer';

const resizeWindow = (x) => {
  window.innerWidth = x;
  window.dispatchEvent(new Event('resize'));
}

// const defaultProps = {
//   sections: ['spain-map', 'search', 'about'],
//   drawerOpen: true,
//   onClose: jest.fn()
// }

test('<SideDrawer /> renders ok', async ()=> {
  // resizeWindow(500,582);
  const route = { route: '/spain-map'}
  const { getByText, queryByText, debug, rerender } = customRenderWithRouter(<NavDrawer/>, route);
  resizeWindow(500);
  rerender(<NavDrawer/>)
  // await wait(()=> {
  //   expect(queryByText('SPAIN-MAP')).not.toBeInTheDocument()
  // })
  debug()
  // defaultProps.sections.forEach(element => {
  //   const upperElement = element.toUpperCase();
  //   const navItem = getByText(`${upperElement}`);
  //   expect(navItem).toBeInTheDocument()
  // });
  
});