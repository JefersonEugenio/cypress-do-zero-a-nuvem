Cypress.Commands.add('fillMandatoryFieldsAndSubmit1', () => {
    cy.get('#firstName').type('Jeferson1')
    cy.get('#lastName').type('Eugenio')
    cy.get('#email').type('jefy@gmail.com')
    cy.get('#open-text-area').type('texto de teste 1')
    cy.contains('.button', 'Enviar').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmit2', data => {
    
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.contains('.button', 'Enviar').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmit3', (data3 = {
    firstName: 'Jeferson3',
    lastName: 'Eugenio',
    email: 'jefy@gmail.com',
    text: 'texto de teste 3'
}) => {
    cy.get('#firstName').type(data3.firstName)
    cy.get('#lastName').type(data3.lastName)
    cy.get('#email').type(data3.email)
    cy.get('#open-text-area').type(data3.text)
    cy.contains('.button', 'Enviar').click()
})