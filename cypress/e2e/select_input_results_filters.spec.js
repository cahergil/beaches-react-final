describe('filter main screen component', ()=>{
  const beachName = 'Oyambre';
  // this times out
  // beforeEach(function() { 
  //   cy.fixture('playas.json').as('playas')
  // })
  
  it('on search a beach by beach name should get the associated beaches', ()=>{
    cy.fixture('playas.json').as('playas')
    cy.visit('/spain-map');
    // get Cantabria region in map and click on it
    cy.get('#__AmCharts_React_1__ > div > div.amcharts-chart-div > svg > g:nth-child(8) > g > g:nth-child(1) > path:nth-child(5)').click();
    cy.wait(3000);
    cy.findByTestId('inputType').click();
    cy.findByTestId('beach').click();
    cy.findByTestId('input').type(beachName)
    cy.get('@playas').then((playas)=> {
      const foundBeaches = playas.filter(playa=> playa.nombre === beachName )
      cy.findAllByTestId('results-item').should('have.length', foundBeaches.length);
    })
  })
    

  it('on change select should reset to infinite scroll step', ()=>{
    const infiniteScrollStep = '12';
    cy.fixture('playas.json').as('playas')
    cy.visit('/spain-map');
    // get Cantabria region in map and click on it
    cy.get('#__AmCharts_React_1__ > div > div.amcharts-chart-div > svg > g:nth-child(8) > g > g:nth-child(1) > path:nth-child(5)').click();
    cy.wait(3000);
    cy.findByTestId('inputType').click();
    cy.findByTestId('beach').click();
    cy.findByTestId('input').type(beachName);
    cy.get('@playas').then((playas)=> {
      const foundBeaches = playas.filter(playa=> playa.nombre === beachName )
      cy.findAllByTestId('results-item').should('have.length', foundBeaches.length);
    })
    
    cy.wait(3000)
    // change selector
    cy.findByTestId('inputType').click();
    cy.findByTestId('locality').click();
    cy.findAllByTestId('showing-items').should('have.text', infiniteScrollStep)
  })
})