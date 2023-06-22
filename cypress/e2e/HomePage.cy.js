import '/Users/hamzayounas/Desktop/Testing E-Commerce Web/cypress/support/Utilities.js';

describe('This suite contain test case of Homepage', () => {
    it('Verify user can Subscribe in home page', () => {
        cy.visit(Cypress.env('baseUrl'));
        cy.ScrollingDown()
        cy.SubscribeEmail()
    })
    it('Verify user can Subscribe in cart page', () => {
        cy.visit(Cypress.env('baseUrl'));
        cy.contains('a', 'Cart').click();
        cy.ScrollingDown()
        cy.SubscribeEmail()
    })
    it('Verify user lands on test cases page sucessfully', () => {
        cy.visit(Cypress.env('baseUrl'));
        cy.contains('a', 'Test Cases').click();
        cy.url().should('contain', 'test_cases')
    })
    it('Verify Scroll Up using Arrow button and Scroll Down functionality', ()=>{
        cy.visit(Cypress.env('baseUrl'));
        cy.ScrollingDown()
        cy.get('#scrollUp > .fa').click()
        cy.get('div.col-sm-6').should('contain', 'Full-Fledged practice website for Automation Engineers');
    })
    it('Verify Scroll Up without Arrow button and Scroll Down functionality', ()=>{
        cy.visit(Cypress.env('baseUrl'));
        cy.ScrollingDown()
        cy.get('.header-middle > .container > .row').scrollIntoView()
        cy.get('div.col-sm-6').should('contain', 'Full-Fledged practice website for Automation Engineers');
    })
    it('Verify user lands on contact us form sucessfully', () => {
        cy.visit(Cypress.env('baseUrl'))
        cy.contains('Contact us').click()
        cy.get('.contact-form h2.title').should('contain', 'Get In Touch')
        cy.get('[data-qa="name"]').type('Hamza');
        cy.get('[data-qa="email"]').type((Cypress.env('email')));
        cy.get('[data-qa="subject"]').type('Website Testing')
        cy.get('[data-qa="message"]').type('We are testing the website')
        // Assuming the file input has a class name "file-input"
        cy.fixture('example.json').then(fileContent => {
            cy.get('[name="upload_file"]').attachFile({
                fileContent: fileContent,
                fileName: 'example.json',
                mimeType: 'application/json'
            })
        })
        cy.get('[data-qa="submit-button"]').click()
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
        cy.get('#form-section > .btn').click()
        cy.get('a#scrollUp').should('be.visible')
    })
})