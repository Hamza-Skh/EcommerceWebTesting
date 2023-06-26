class CommonObject {

    get ContinueBtn() {
        return cy.get('[data-qa="continue-button"]')
    }
    get SignUpBtn() {
        return cy.get('[data-qa="signup-button"]')
    }
    get HeadingTitle() {
        return cy.get('.title')
    }
    get EnterName() {
        return cy.get('[placeholder="Name"]')
    }
    get EmailAdress() {
        return cy.get('[placeholder="Email"]')
    }
    get PageFooter() {
        return cy.get('.footer-bottom > .container > .row')
    }
    get PageHeader() {
        return cy.get('.header-middle > .container > .row')
    }
    get ScrollUpBtn() {
        return cy.get('#scrollUp > .fa')
    }
    get Subscription() {
        return cy.get('#susbscribe_email')
    }
    get CartDescription() {
        return cy.get('.description')
    }
    get ViewCart() {
        return cy.contains('a', 'View Cart')
    }
    get OrderCheckOutBtn() {
        return cy.get('.col-sm-6 > .btn')
    }
    get DeleteBtn() {
        return cy.contains('li a', 'Delete Account')
    }
    get PasswordField() {
        return cy.get('[type="password"]')
    }
}
export default new CommonObject