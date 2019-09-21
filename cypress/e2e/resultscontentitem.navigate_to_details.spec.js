it('navigate to details page from when clicking beach name', ()=>{
  cy.visit('/spain-map')
  // select Cantabria
  cy.get('#__AmCharts_React_1__ > div > div.amcharts-chart-div > svg > g:nth-child(8) > g > g:nth-child(1) > path:nth-child(5)').click()
  const beachName = 'Oyambre'
  const regex = new RegExp('' + beachName + '', 'i');
  cy.findByText(regex, {timeout: 7000}).click()
  cy.url().should('include', '/details/beach')
});