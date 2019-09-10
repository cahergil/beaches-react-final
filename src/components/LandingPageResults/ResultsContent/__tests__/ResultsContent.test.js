import React from 'react';
import axios from 'axios';
import {debug, renderWithRouter} from '../../../../../tests/test-utils';
import ResultsContent from '../ResultsContent';

const defaultProps = {
  beachesList: [],
  regionId: 'ES-CB'
}

test('<ResultsContent/> renders correct beaches number and name', async ()=> {
  const region = 'Cantabria';
  let response;
  try {
    response = await axios.get('playas.json')
  } catch(err) {
    const t = () => {
    throw new TypeError();
    };
    debug(err)
    expect(t).toThrowError()
  }
  let fakeBeaches = response.data.filter(playa => playa.comunidad_autonoma === region);
  defaultProps.beachesList = fakeBeaches

  const route = '/spain-map/Cantabria'
  const { getByTestId, getAllByTestId} = renderWithRouter(<ResultsContent {...defaultProps }/>, route)
  const beachesListLength = getByTestId('region-beaches-count');
  expect(beachesListLength).toHaveTextContent(fakeBeaches.length)
  const beachesNames =getAllByTestId('beach-name').map(div => div.textContent);
  const infiniteScrollStep = 12
  const fakeBeachesNames = fakeBeaches.slice(0, infiniteScrollStep).map(el => el.nombre + ' beach');
  expect(fakeBeachesNames).toEqual(beachesNames);

});

//https://www.youtube.com/watch?v=Qf2k9zt3S_A