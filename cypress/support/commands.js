import 'cypress-file-upload';
import Home from '../support/Page_Objects/Home.js';
require('cypress-downloadfile/lib/downloadFileCommand')

Cypress.Commands.add('login', (login_email, login_password) => {
    //cy.session('login session', () => {
        Home.launch()
        Home.Login_SignUPBtn.click()
        cy.get('.login-form h2').should('have.text', 'Login to your account')
        cy.get('[data-qa="login-email"]').type(login_email)
        cy.get('[data-qa="login-password"]').type(login_password)
        cy.get('[data-qa="login-button"]').click()
    //})
})

