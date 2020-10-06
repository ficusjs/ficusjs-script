/* global describe cy before it  */
describe('Script loader', () => {
  before(() => {
    cy.visit('http://localhost:8080/test/e2e')
  })

  it('name is loaded', () => {
    cy.get('#name')
      .should('have.text', 'Name ESM')
  })

  it('address is loaded', () => {
    cy.get('#address')
      .should('have.text', 'Address ESM')
  })

  it('postcode is loaded', () => {
    cy.get('#postcode')
      .should('have.text', 'Postcode ES5')
  })

  it('phone is loaded', () => {
    cy.get('#phone')
      .should('have.text', 'Phone ESM')
  })
})
