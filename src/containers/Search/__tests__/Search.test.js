import React from 'react';
// import ReactTestUtils from 'react-dom/test-utils'
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { customRenderWithReduxAndRouter, waitForElement, fireEvent, wait } from '../../../../tests/test-utils';
import Search from '../Search';
import beachesReducer from '../../../store/reducers/beaches';
import searchFiltersReducer from '../../../store/reducers/searchFilters'

const initialState = {
  beaches: {
    beachesList: [],
    error: false
  },
  searchFilters: {
    nudism: false,
    blueFlag: false,
    surfingArea: false,
    beachBar: false,
    nauticsRental: false,
    divingArea: false,
    sunbedRental: false,
    beachUmbrellaRental: false,
    disabledPersons: false,
    occupancy: 'All',
    promenade: false,
    hospitalDistance: 120,
    beachLength: 28000,
    selectText: 'termino_municipal',
    searchText: ''
  }
}
const rootReducer = combineReducers({
  beaches: beachesReducer,
  searchFilters: searchFiltersReducer
});



function renderSearch(initState = initialState) {
  const route = { route: 'search' }
  const store = createStore(rootReducer, initState, applyMiddleware(thunk))
  const utils = customRenderWithReduxAndRouter(<Search />, route, store);
  return { ...utils }
}


describe('test Search component', () => {

  test('<Search/> renders ok', async () => {
    const infiniteScrollStep = 12;
    const { getByTestId, getAllByTestId, getByText } = renderSearch();
    const videoElement = await waitForElement(() => getByTestId('video'));
    expect(videoElement).toBeInTheDocument();
    const searchLabel = await waitForElement(() => getByText(/advanced search/i));
    expect(searchLabel).toBeInTheDocument()
    // grid items rendered
    const resultContent = getAllByTestId('results-item');
    expect(resultContent.length).toBe(infiniteScrollStep);
  });

  test('<SearchFilters/> dropdown functionality when clicking on span text', () => {

    const { getByTestId, getByText } = renderSearch();
    const typeOfBeachMenu = getByTestId('menu-type-of-beach');
    const servicesMenu = getByTestId('menu-services');
    const generalMenu = getByTestId('menu-general');
    // initial state, all collapsed(invisible)
    expect(typeOfBeachMenu).not.toBeVisible()
    expect(servicesMenu).not.toBeVisible()
    expect(generalMenu).not.toBeVisible()

    const leftClick = { button: 0 };

    // click on type of beach
    const typeOfBeachSpan = getByText(/type of beach/i);
    fireEvent.click(typeOfBeachSpan, leftClick);
    expect(typeOfBeachMenu).toBeVisible();
    expect(servicesMenu).not.toBeVisible()
    expect(generalMenu).not.toBeVisible()

    // click on services
    const servicesSpan = getByText(/services/i);
    fireEvent.click(servicesSpan, leftClick);
    expect(typeOfBeachMenu).not.toBeVisible();
    expect(servicesMenu).toBeVisible()
    expect(generalMenu).not.toBeVisible()

    // click on general
    const generalSpan = getByText(/general/i);
    fireEvent.click(generalSpan, leftClick);
    expect(typeOfBeachMenu).not.toBeVisible();
    expect(servicesMenu).not.toBeVisible()
    expect(generalMenu).toBeVisible()


  });
  test('<SearchFilters/> dropdown functionality when clicking arrow  icon', () => {

    const { getByTestId, getAllByTestId } = renderSearch();
    const typeOfBeachMenu = getByTestId('menu-type-of-beach');
    const servicesMenu = getByTestId('menu-services');
    const generalMenu = getByTestId('menu-general');
    // initial state, all collapsed(invisible)
    expect(typeOfBeachMenu).not.toBeVisible()
    expect(servicesMenu).not.toBeVisible()
    expect(generalMenu).not.toBeVisible()

    const leftClick = { button: 0 };

    // click on type of beach
    const typeOfBeachIcon = getAllByTestId('arrowdownicon')[0];
    fireEvent.click(typeOfBeachIcon, leftClick);
    expect(typeOfBeachMenu).toBeVisible();
    expect(servicesMenu).not.toBeVisible()
    expect(generalMenu).not.toBeVisible()

    // click on services
    const servicesIcon = getAllByTestId('arrowdownicon')[1];;
    fireEvent.click(servicesIcon, leftClick);
    expect(typeOfBeachMenu).not.toBeVisible();
    expect(servicesMenu).toBeVisible()
    expect(generalMenu).not.toBeVisible()

    // click on general
    const generalIcon = getAllByTestId('arrowdownicon')[2];;
    fireEvent.click(generalIcon, leftClick);
    expect(typeOfBeachMenu).not.toBeVisible();
    expect(servicesMenu).not.toBeVisible()
    expect(generalMenu).toBeVisible()


  });

  test('<SearchFilters/> search-select filter has 3 options available', () => {
    const options = ['Locality', 'Beach', 'Region'];
    const { getByTestId } = renderSearch();
    const selectSearch = getByTestId('select-search');
    const leftClick = { button: 0 };
    fireEvent.click(selectSearch, leftClick);
    const localityOption = getByTestId('locality');
    const beachOption = getByTestId('beach');
    const regionOption = getByTestId('region');
    expect(localityOption.textContent).toBe(options[0])
    expect(beachOption.textContent).toBe(options[1])
    expect(regionOption.textContent).toBe(options[2])
  });
  test('<SearchFilters/> search-select change works', async () => {
    const options = ['Locality', 'Beach', 'Region'];
    const { getByTestId } = renderSearch();
    const selectSearch = getByTestId('select-search');
    // default option, Locality
    expect(selectSearch.textContent).toBe(options[0])
    // first click to show available options
    const leftClick = { button: 0 };
    fireEvent.click(selectSearch, leftClick);
    const localityOption = getByTestId('locality');
    const beachOption = getByTestId('beach');
    const regionOption = getByTestId('region');
    // options visible
    expect(localityOption).toBeVisible()
    expect(beachOption).toBeVisible()
    expect(regionOption).toBeVisible()
    // second click to select an option
    fireEvent.click(beachOption, leftClick);
    // options not visible
    expect(localityOption).not.toBeVisible();
    expect(beachOption).not.toBeVisible();
    expect(regionOption).not.toBeVisible();
    // select has value of Beach
    expect(selectSearch.textContent).toBe(options[1])

  });

  test('<SearchFilters/> search-select change option resets search text value', () => {
    const { getByTestId } = renderSearch();
    const selectSearch = getByTestId('select-search');
    // first click to show available options
    const leftClick = { button: 0 };
    fireEvent.click(selectSearch, leftClick);
    const beachOption = getByTestId('beach');
    // second click to select an option
    fireEvent.click(beachOption, leftClick);
    // get search text
    const input = getByTestId('input');
    expect(input.value).toBe('');

  });

  test('<SearchFilters/> filters works individually ', async () => {
    const initialState = {
      beaches: {
        beachesList: [],
        error: false
      },
      searchFilters: {
        nudism: true,
        blueFlag: true,
        surfingArea: true,
        beachBar: true,
        nauticsRental: true,
        divingArea: true,
        sunbedRental: true,
        beachUmbrellaRental: true,
        disabledPersons: true,
        occupancy: 'Alto',
        promenade: true,
        hospitalDistance: 120,
        beachLength: 28000,
        selectText: 'termino_municipal',
        searchText: ''
      }
    }

    const { getByTestId, getByText, container } = renderSearch(initialState);

    // 1. checkboxes
    const checkBoxArray = container.querySelectorAll('[data-testid^="checkbox"]');
    // initial = true
    checkBoxArray.forEach(element => {
      expect(element).toHaveProperty('checked', true)
    })

    // click on them and verify checked = false
    const leftClick = { button: 0 }
    for (const item of checkBoxArray) {
      fireEvent.click(item, leftClick);
      await wait(() => {
        expect(item).toHaveProperty('checked', false)
      });
    }
    // 2. Select occupancy
    const selectOccupancy = getByTestId('select-occupancy');
    expect(selectOccupancy.textContent).toBe('High');
    fireEvent.click(selectOccupancy, leftClick);
    const allOption = getByText(/all/i);
    fireEvent.click(allOption, leftClick);
    expect(selectOccupancy.textContent).toBe('All');
    // 3. input contain text
    const input = getByTestId('input');
    const newVal = 'santander';
    fireEvent.change(input, { target: { value: newVal } });
    expect(input.value).toBe(newVal);

  });


}); // describe