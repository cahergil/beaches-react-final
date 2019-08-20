import jsonData from '../../public/playas.json'
export default {
  get: jest.fn(() => Promise.resolve({ data: jsonData }))
};