import 'cypress-file-upload';

Cypress.Commands.add('login', (login_email, login_password) => {
    //cy.session('login session', () => {
        cy.visit(Cypress.env('baseUrl'));
        cy.get('a[href="/login"]').click()
        cy.get('.login-form h2').should('have.text', 'Login to your account')
        cy.get('[data-qa="login-email"]').type(login_email)
        cy.get('[data-qa="login-password"]').type(login_password)
        cy.get('[data-qa="login-button"]').click()
    //})
})

