import '../support/Utilities.js';
import CommonObject from '../support/Page_Objects/CommonObject.js';
import Home from '../support/Page_Objects/Home.js';

describe('This suite contain test case of Homepage', () => {
     beforeEach(() => {
        Home.launch()
    })
    it('Verify user can do subscription in home page', () => {
        cy.ScrollingDown()
        cy.SubscribeEmail()
    })
    it('Verify user can Subscribe in cart page', () => {
        Home.CartBtn.click()
        cy.ScrollingDown()
        cy.SubscribeEmail()
    })
    it('Verify user lands on test cases page sucessfully', () => {
        Home.TestCasesBtn.click()
        cy.url().should('contain', 'test_cases')
    })
    it('Verify Scrolling Up using Arrow button and Scroll Down functionality', ()=>{
        cy.ScrollingDown()
        CommonObject.ScrollUpBtn.click()
        cy.get('div.col-sm-6').should('contain', 'Full-Fledged practice website for Automation Engineers');
    })
    it('Verify Scrolling Up without Arrow button and Scroll Down functionality', ()=>{
        cy.ScrollingDown()
        CommonObject.PageHeader.scrollIntoView()
        cy.get('div.col-sm-6').should('contain', 'Full-Fledged practice website for Automation Engineers');
    })
    it('Verify user lands on contact us form sucessfully', () => {
        Home.ContactUsBtn.click()
        CommonObject.HeadingTitle.should('contain', 'Get In Touch')
        CommonObject.EnterName.type('Hamza');
        CommonObject.EmailAdress.type((Cypress.env('email')));
        cy.get('[data-qa="subject"]').type('Website Testing')
        cy.get('[data-qa="message"]').type('We are testing the website')
        cy.fixture('example.json').then(fileContent => {
            cy.get('[name="upload_file"]').attachFile({
                fileContent: fileContent,
                fileName: 'example.json',
                mimeType: 'application/json'
            })
        })
        cy.get('[data-qa="submit-button"]').click()
        cy.get('[class="status alert alert-success"]').should('have.text', 'Success! Your details have been submitted successfully.')
        cy.get('#form-section > .btn').click()
        CommonObject.PageHeader.should('be.visible')
    })
})