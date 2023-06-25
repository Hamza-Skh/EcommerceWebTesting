import '../support/Utilities.js';
import CommonObject from '../support/Page_Objects/CommonObject.js';
import Home from '../support/Page_Objects/Home.js';

describe('This suite contain test cases of login and signup', () => {
    // beforeEach(() => {
    //     cy.login()
    //   })
    it('Verify new user register and delete account sucessfully', () => {
        Home.launch()
        Home.Login_SignUPBtn.click()
        cy.UserSignUp('Hamza', (Cypress.env('email')))
        cy.NewUserRegistration()
        cy.UserNameVisibility()
        //cy.Del_Account()
    })
    it('Verify user login sucessfully after entering correct credentials', () => {
        cy.login((Cypress.env('email')), (Cypress.env('password')))
        cy.UserNameVisibility()
        //cy.Del_Account()
    })
    it('Verify user does not login with incorrect password', () => {
        cy.login((Cypress.env('email')), 'WrongPassword')
        cy.get('.login-form > form > p').should('have.text', 'Your email or password is incorrect!')
    })
    it('Verify user logout sucessfully', () => {
        cy.login((Cypress.env('email')), (Cypress.env('password')))
        cy.UserNameVisibility()
        Home.LogOutBn.click();
        cy.get('.login-form').should('exist');
    })
    it('Verify user get an error on Registering User with an existing email', () => {
        Home.launch()
        Home.Login_SignUPBtn.click()
        cy.UserSignUp('Hamza', (Cypress.env('email')))
        cy.get('.signup-form > form > p').should('have.text', 'Email Address already exist!')
    })
    it('Verfiy user can signup while checkout', () => {
        cy.ProductPageVisit()
        cy.AddProductsInCart()
        cy.get('.col-sm-6 > .btn').click()
        Home.Login_SignUPBtn.eq(1).click()
        cy.UserSignUp('Hamza', (Cypress.env('email')))
        cy.NewUserRegistration()
        cy.UserNameVisibility()
        Home.CartBtn.click()
        cy.PlaceAnOrder()
        CommonObject.HeadingTitle.should('have.text', 'Order Placed!')
        //cy.get('.alert-success.alert').should('be.visible').contains('Your order has been placed successfully!');
        cy.Del_Account()
    })
    it('Verify user checkout after signup', () => {
        Home.launch()
        Home.Login_SignUPBtn.click()
        cy.UserSignUp('Hamza', (Cypress.env('email')))
        cy.NewUserRegistration()
        cy.UserNameVisibility()
        cy.get('.productinfo.text-center').eq(0).trigger('mouseover').find('.add-to-cart').click({ multiple: true })
        cy.get('.modal-footer > .btn').should('be.visible').click()
        Home.CartBtn.click()
        cy.get('#product-1 > .cart_product > a > .product_image').should('be.visible')
        cy.PlaceAnOrder()
        cy.Del_Account()
    })
    it('Verify user place an order after login', () => {
        cy.login((Cypress.env('email')), (Cypress.env('password')))
        cy.UserNameVisibility()
        cy.get('.productinfo.text-center').eq(0).trigger('mouseover').find('.add-to-cart').click({ multiple: true })
        cy.get('.modal-footer > .btn').should('be.visible').click()
        Home.CartBtn.click()
        cy.get('#product-1 > .cart_product > a > .product_image').should('be.visible')
        cy.PlaceAnOrder()
        cy.Del_Account()
    })
    it("Verify address details are correct in checkout page", () => {
        Home.launch()
        Home.Login_SignUPBtn.click()
        cy.UserSignUp('Hamza', (Cypress.env('email')))
        cy.NewUserRegistration()
        cy.UserNameVisibility()
        cy.ProductPageVisit()
        cy.AddProductsInCart()
        CommonObject.OrderCheckOutBtn.click()
        cy.get('li.address_address1.address_address2').eq(1).should('have.text', Cypress.env('CustomerAddress'))
        cy.get('li.address_address1.address_address2').eq(4).should('have.text', Cypress.env('CustomerAddress'))
        cy.Del_Account()
    })
    it.only("Verify user can Download Invoice after purchase order", () => {
        //Home.launch()
        //add for test purpose
        cy.login((Cypress.env('email')), (Cypress.env('password')))
        cy.UserNameVisibility()

        // Home.Login_SignUPBtn.click()
        // cy.UserSignUp('Hamza', (Cypress.env('email')))
        // cy.NewUserRegistration()
        // cy.UserNameVisibility()
        cy.ProductPageVisit()
        cy.AddProductsInCart()
        cy.PlaceAnOrder()
        cy.get('.col-sm-9 > .btn-default').click()
        cy.request('GET', 'https://www.automationexercise.com/download_invoice/*').then((response) => {
            expect(response.status).to.eq(200)
          })
        cy.Del_Account()
    })
})