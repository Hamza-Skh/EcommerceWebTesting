import '../support/Utilities.js';
import CommonObject from '../support/Page_Objects/CommonObject.js';
import Home from '../support/Page_Objects/Home.js';

describe('This suite contain test cases of login and signup', () => {
    it('Verify new user register and delete account sucessfully', () => {
        Home.launch()
        Home.Login_SignUPBtn.click()
        cy.UserSignUp((Cypress.env('Name')), (Cypress.env('email')))
        cy.NewUserRegistration()
        cy.Del_Account()
    })
    it('Verfiy user can signup while checkout', () => {
        cy.ProductPageVisit()
        cy.AddProductsInCart()
        cy.get('.col-sm-6 > .btn').click()
        Home.Login_SignUPBtn.eq(1).click()
        cy.UserSignUp((Cypress.env('Name')), (Cypress.env('email')))
        cy.NewUserRegistration()
        Home.CartBtn.click()
        cy.PlaceAnOrder()
        CommonObject.HeadingTitle.should('have.text', 'Order Placed!')
        cy.Del_Account()
    })
    it('Verify user checkout after signup', () => {
        Home.launch()
        Home.Login_SignUPBtn.click()
        cy.UserSignUp((Cypress.env('Name')), (Cypress.env('email')))
        cy.NewUserRegistration()
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
        cy.UserSignUp((Cypress.env('Name')), (Cypress.env('email')))
        cy.NewUserRegistration()
        cy.ProductPageVisit()
        cy.AddProductsInCart()
        CommonObject.OrderCheckOutBtn.click()
        cy.get('li.address_address1.address_address2').eq(1).should('have.text', Cypress.env('CustomerAddress'))
        cy.get('li.address_address1.address_address2').eq(4).should('have.text', Cypress.env('CustomerAddress'))
    })
    it('Verify user does not login with incorrect password', () => {
        Home.launch()
        Home.Login_SignUPBtn.click()
        cy.get('.login-form h2').should('have.text', 'Login to your account')
        cy.get('[data-qa="login-email"]').type(Cypress.env('email'))
        CommonObject.PasswordField.type('invalidpassword')
        cy.get('[data-qa="login-button"]').click()
        cy.get('.login-form > form > p').should('have.text', 'Your email or password is incorrect!')
    })
    it('Verify user login sucessfully after entering correct credentials', () => {
        cy.login((Cypress.env('email')), (Cypress.env('password')))
    })
    it('Verify user logout sucessfully', () => {
        cy.login((Cypress.env('email')), (Cypress.env('password')))
        Home.LogOutBn.click();
        cy.get('.login-form').should('exist');
    })
    it('Verify user Search Products and Verify Cart After Login', () => {
        cy.ProductPageVisit()
        cy.SearchProduct()
        cy.get('.productinfo.text-center').eq(0).trigger('mouseover').find('.add-to-cart').click({ multiple: true })
        CommonObject.ViewCart.click();
        cy.login((Cypress.env('email')), (Cypress.env('password')))
        Home.CartBtn.click()
        cy.get('#product-2 > .cart_product > a > .product_image').should('be.visible')
    })
    it('Verify user get an error on Registering User with an existing email', () => {
        Home.launch()
        Home.Login_SignUPBtn.click()
        cy.UserSignUp((Cypress.env('Name')), (Cypress.env('email')))
        cy.get('.signup-form > form > p').should('have.text', 'Email Address already exist!')
    })
    it('Verify user place an order after login', () => {
        cy.login((Cypress.env('email')), (Cypress.env('password')))
        cy.get('.productinfo.text-center').eq(0).trigger('mouseover').find('.add-to-cart').click({ multiple: true })
        cy.get('.modal-footer > .btn').should('be.visible').click()
        Home.CartBtn.click()
        cy.get('#product-1 > .cart_product > a > .product_image').should('be.visible')
        cy.PlaceAnOrder()
        cy.Del_Account()
    })
    it.only("Verify user can Download Invoice after purchase order", () => {
        Home.launch()
        Home.Login_SignUPBtn.click()
        cy.UserSignUp((Cypress.env('Name')), (Cypress.env('email')))
        cy.NewUserRegistration()
        cy.ProductPageVisit()
        cy.AddProductsInCart()
        cy.PlaceAnOrder()
        cy.window().document().then(function (doc) {
            doc.addEventListener('click', () => {
                setTimeout(function () { doc.location.reload() }, 5000)
            })
            cy.get('.btn-default').contains('Download Invoice').click()
        })
        cy.readFile('/Users/hamzayounas/Desktop/Testing E-Commerce Web/cypress/downloads/invoice.txt').should('exist');
        cy.Del_Account()
    })
})