describe('<ResultsContent> inifinte scroll', ()=> {
  
  it('initiallly succesfully loads results items and after scrolling to bottom', ()=> {
    // cy.visit('http://localhost:3000')
    cy.visit('/spain-map')
    // use copy selector in devtools
    cy.get('#__AmCharts_React_1__ > div > div.amcharts-chart-div > svg > g:nth-child(8) > g > g:nth-child(1) > path:nth-child(2)').click();
    cy.wait(3000);
    cy.findAllByTestId('results-item').should('have.length', 12);
    cy.wait(5000);
    cy.scrollTo('bottom');
    cy.findAllByTestId('results-item').should('have.length', 24);
    // cy.findAllByTestId('results-item').then(results =>
    //     expect(results).to.have.lengthOf(24)
    // );
  });

});