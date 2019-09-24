/// <reference types="Cypress" />

describe('google maps test', () => {

  it('should render infowindow', () => {
    const refBeach = {
      "id": "1865",
      "nombre": "Antuerta",
      "coordenada_x": "-3,6196",
      "coordenada_y": "43,4966",
    }
    const id = parseInt(refBeach.id)
    cy.visit(`details/beach?id=${id}&region=ES-CB`);
    cy.findAllByTestId('infowindow', { timeout: 7000 })
      .should('have.length', 1)
  })
});