

export const getYesNo = (value) => {
  if (value === 'Sí') {
    return 'Yes';
  } else if (value === 'No') {
    return 'No';
  } else if (value === '') {
    return '-'
  } else if (value === undefined) {
    return '-'
  } else {
    return value;
  }
}