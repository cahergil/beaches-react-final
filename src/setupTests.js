// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import '@testing-library/jest-dom/extend-expect';

// import '@testing-library/react/cleanup-after-each'; NO necessary
// this adds jest-dom's custom assertions


/**
 * fix: `matchMedia` not present, legacy browsers require a polyfill
 * https://stackoverflow.com/questions/41366380/matchmedia-not-present-when-testing-create-react-app-component-which-contain-rea
 */
global.matchMedia = global.matchMedia || function () {
  return {
    matches: false,
    addListener: function () { },
    removeListener: function () { }
  }
}
global.currentUser = {
  name: 'john'
}
global.AmCharts = {
  makeChart: jest.fn(),
  options: {
    "type": "map",
    "zoomControl": {
      "homeButtonEnabled": false,
      "zoomControlEnabled": false,
      "panControlEnabled": false,
    },

    "backgroundAlpha": 1,
    "areasSettings": {
      "outlineColor": '#fff',
      "outlineAlpha": 1,
      "outlineThickness": 1,
      "autoZoom": false,
      "selectedColor": '#D4AC16',
      "selectable": true,
      "rollOverColor": '#D4AC16'

    },
    "listeners": [
      {
        "event": "clickMapObject",
        "method": jest.fn(e => "ES-CT")
      },
      {
        "event": "init",
        "method": jest.fn(e => " ")
      }
    ]

  }

}




