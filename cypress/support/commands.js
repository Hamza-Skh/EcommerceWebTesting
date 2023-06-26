import 'cypress-file-upload';
import Home from '../support/Page_Objects/Home.js';
import CommonObject from './Page_Objects/CommonObject.js';

Cypress.Commands.add('login', (login_email, login_password) => {
    //cy.session('login session', () => {
        Home.launch()
        Home.Login_SignUPBtn.click()
        cy.get('.login-form h2').should('have.text', 'Login to your account')
        cy.get('[data-qa="login-email"]').type(login_email)
        CommonObject.PasswordField.type(login_password)
        cy.get('[data-qa="login-button"]').click()
        cy.get('li a i.fa.fa-user + b').should('be.visible').contains('Hamza')
    //})
})

