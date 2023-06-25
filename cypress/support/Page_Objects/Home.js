class Home{
    launch (){
        cy.visit(Cypress.env('baseUrl'))
    }
    get CartBtn(){
        return cy.contains('a', 'Cart')
    }
    get TestCasesBtn(){
        return cy.contains('a', 'Test Cases')
    }
    get ContactUsBtn(){
        return cy.contains('Contact us')
    }
    get Login_SignUPBtn(){
        return cy.get('a[href="/login"]')
    }
    get ProductBn(){
        return cy.contains('a', 'Products')
    }
    get LogOutBn(){
        return cy.get('a[href="/logout"]')
    }

}
export default new Home