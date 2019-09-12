describe('toolbar nav and drawer', ()=> {

  it('nav items are present in toolbar in desktop and hidden in drawer', ()=>{
    cy.visit('/spain-map')
    cy.findByText('SPAIN-MAP').should('be.visible')
    cy.findByText('SEARCH').should('be.visible')
    cy.findByText('ABOUT').should('be.visible')
    cy.get('[data-cy=drawer-item]').should('have.length', 0)
  })
 it('nav items are present in drawer in mobile and hidden in desktop', ()=>{
    cy.viewport(500, 584)
    cy.visit('/spain-map')
    // burger icon
    cy.get('#root > div > header > div > button > span.MuiIconButton-label > svg').click()
    // drawer items length
    cy.get('[data-cy=drawer-item]').should('have.length', 3)
    // drawer items visible
    cy.get('[data-cy=drawer-item]').within(()=> {
      cy.contains('SPAIN-MAP').should('be.visible')
      cy.contains('SEARCH').should('be.visible')
      cy.contains('ABOUT').should('be.visible')
    })
    // nav not visible
    cy.get('[data-cy=nav-item]').within(()=> {
       cy.contains('SPAIN-MAP').should('not.be.visible')
       cy.contains('SEARCH').should('not.be.visible')
       cy.contains('ABOUT').should('not.be.visible')
      //  cy.findByText('SPAIN-MAP').should('not.be.visible') also works
     })
    //  contains('SPAIN-MAP').should('not.be.visible');
  
  })

});