/// <reference types="Cypress" />

describe('toolbar nav and drawer nav', ()=> {

  it('nav items are present in toolbar in desktop and hidden in drawer', ()=>{
    cy.visit('/spain-map')
    cy.findByText('SPAIN-MAP').should('be.visible')
    cy.findByText('SEARCH').should('be.visible')
    cy.findByText('ABOUT').should('be.visible')
    cy.get('[data-cy=drawer-item]').should('have.length', 0)
  })
 it('nav items are present in drawer on mobile and hidden in desktop', ()=>{
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
    // toolbar items doesn't exist
    cy.get('[data-cy=nav-item]').should('not.exist');
  
  })

});

it('drawer closes on item click, mobile', ()=> {
  cy.viewport(500, 584)
  cy.visit('/spain-map')
    // burger icon
  cy.get('#root > div > header > div > button > span.MuiIconButton-label > svg').click()
  cy.get('.MuiDrawer-paper').should('not.have.css', 'visibility', 'hidden')
  cy.findByText('SPAIN-MAP').click()
  cy.get('.MuiDrawer-paper').should('have.css', 'visibility', 'hidden')

});
it('drawer closes on backdrop click, mobile', ()=> {
  cy.viewport(500, 584)
  cy.visit('/spain-map')
    // burger icon
  cy.get('#root > div > header > div > button > span.MuiIconButton-label > svg').click()
  // drawer paper showed
  cy.get('.MuiDrawer-paper').should('not.have.css', 'visibility', 'hidden')
  // backdrop
  cy.get('.MuiBackdrop-root').click()
  // drawer paper hidden
  cy.get('.MuiDrawer-paper').should('have.css', 'visibility', 'hidden')

});