import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '../../../../../tests/test-utils'
import ResultsFilter from './../ResultsFilter';



const defaultProps = {
  count: 81,
  region: 'Cantabria',
  onSearched: jest.fn(),
  onMapResultsSelectChange: jest.fn(),
  selectValue: 'termino_municipal',
  inputValue: '',
  isReturn: false
}

test('test set value to input', () => {
  const { getByTestId } = render(<ResultsFilter {...defaultProps} />);
  const input = getByTestId('input');
  const newVal = 'Arnuero';
  fireEvent.change(input, { target: { value: newVal } });
  expect(input.value).toBe(newVal);
});

test('test select options available', () => {
  const { getByTestId } = render(<ResultsFilter {...defaultProps} />);
  let selectButton = getByTestId('inputType');
  expect(selectButton).toHaveTextContent('Locality');
  const leftClick = { button: 0 };
  fireEvent.click(selectButton, leftClick);
  const beachOption = getByTestId('beach');
  const localityOption = getByTestId('locality');
  expect(beachOption).toBeInTheDocument()
  expect(localityOption).toBeInTheDocument();

});
test('test select change', () => {
  const selectOptions = ['Locality', 'Beach']
  const props = {
    selectValue: 'nombre',
  }
  const { getByTestId, rerender } = render(<ResultsFilter {...defaultProps} />);
  let selectButton = getByTestId('inputType');
  expect(selectButton).toHaveTextContent(selectOptions[0]);
  // new props from redux
  rerender(<ResultsFilter {...defaultProps} {...props} />)
  selectButton = getByTestId('inputType');
  expect(selectButton).toHaveTextContent(selectOptions[1])
});