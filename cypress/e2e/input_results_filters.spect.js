it('on search by locality should get the associated beaches', ()=>{
  cy.visit('/spain-map');
  // get Cantabria region in map and click on it
  cy.get('#__AmCharts_React_1__ > div > div.amcharts-chart-div > svg > g:nth-child(8) > g > g:nth-child(1) > path:nth-child(5)').click();
  cy.wait(3000)
  cy.findAllByTestId('input').type('Arnuero');
  cy.findAllByTestId('results-item').should('have.length', 6);
})