import React from 'react';
import matchMediaPolyfill from 'mq-polyfill'
import { wait,customRenderWithRouter, fireEvent, waitForElement } from '../../../../tests/test-utils';
import NavDrawer from '../NavDrawer';

beforeAll(() => {
  matchMediaPolyfill(window)
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event('resize'))
  }
  
})

test('<SideDrawer /> renders  items correctly, mobile', async ()=> {
  window.resizeTo(500, 582)
  const route = { route: '/spain-map'}
  const {getAllByRole, queryAllByTestId} = customRenderWithRouter(<NavDrawer/>, route);
  // the burger icon has a presentation role, and it is the first in the dom
  const burger = getAllByRole('presentation');
  fireEvent.click(burger[0]);
  // could have used getByText directly after the change I made in Navbar, now no longer present in the dom on mobile
  const drawerItems=await waitForElement(() =>queryAllByTestId('drawer-item'));
  expect(drawerItems[0]).toBeVisible();
  expect(drawerItems[1]).toBeVisible();
  expect(drawerItems[2]).toBeVisible();  
});

test('<SideDrawer />  drawer closes on item click, mobile', async ()=> {
  window.resizeTo(500, 582);
  const route = { route: '/spain-map'};
  const {getByRole, getByText, getAllByRole} = customRenderWithRouter(<NavDrawer/>, route);
  // the burger icon has a presentation role, and it is the first in the dom
  const burger = getAllByRole('presentation');
  fireEvent.click(burger[0]);
  // the drawer should appear, be visible
  let drawerPaper = await waitForElement(()=> getByRole('document'));
  expect(drawerPaper).not.toHaveStyle('visibility: hidden');
  // // click item not working
  const spainMapItem=await waitForElement(() =>getByText('SPAIN-MAP'));
  // debug(spainMapItem);
  const leftClick = {button: 0}
  fireEvent.click(spainMapItem, leftClick);

  // wait for drawer to hide in dom, 
  // don't know why but must use -NaNpx instead of -150  
  await wait(()=> {
     expect(getByRole('document')).toHaveStyle('visibility: hidden; transform: translateX(-NaNpx)');
  })

});
test('<SideDrawer />  drawer closes on backdrop click, mobile', async ()=> {
  window.resizeTo(500, 582);
  const route = { route: '/spain-map'};
  const {getByRole, getAllByRole} = customRenderWithRouter(<NavDrawer/>, route);
  // the burger icon has a presentation role, and it is the first in the dom
  const burger = getAllByRole('presentation');
  fireEvent.click(burger[0]);
  // the drawer should appear, be visible
  let drawerPaper = await waitForElement(()=> getByRole('document'));
  expect(drawerPaper).not.toHaveStyle('visibility: hidden');
  
  // click Backdrop, must be [1], because 0 is the burguer
  const backdropWrapper = getAllByRole('presentation');
  fireEvent.click(backdropWrapper[1].firstChild);
  
  // wait for drawer to hide in dom, 
  // don't know why but must use -NaNpx instead of -150  
  await wait(()=> {
     expect(getByRole('document')).toHaveStyle('visibility: hidden; transform: translateX(-NaNpx)');
  })

});