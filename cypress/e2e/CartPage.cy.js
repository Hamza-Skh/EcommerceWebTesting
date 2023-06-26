import '../support/Utilities.js';
import CommonObject from '../support/Page_Objects/CommonObject.js';
import Home from '../support/Page_Objects/Home.js';

describe('This suite contain test case of cart products', () => {
    it('Verify that user can add Products in Cart', () => {
        cy.ProductPageVisit()
        cy.AddProductsInCart()
        cy.get('#product-1').within(() => {
            cy.get('.cart_price p').should('contain', 'Rs. 500')
            cy.get('.cart_quantity button').should('contain', '1')
            cy.get('.cart_total .cart_total_price').should('contain', 'Rs. 500')
        })
        cy.get('#product-2').within(() => {
            cy.get('.cart_price p').should('contain', 'Rs. 400')
            cy.get('.cart_quantity button').should('contain', '1')
            cy.get('.cart_total .cart_total_price').should('contain', 'Rs. 400')
        })
    })
    it('Verify user can add multiple quantity of same product in cart', () => {
        cy.ProductPageVisit()
        cy.get('[class="nav nav-pills nav-justified"]').eq(0).click()
        cy.get('.product-information').within(() => {
            cy.contains('h2', 'Blue Top').should('be.visible')
        })
        cy.get('#quantity').clear().type(4)
        cy.get('[class="btn btn-default cart"]').click()
        CommonObject.ViewCart.click()
        cy.get('tr#product-1 td.cart_quantity button.disabled').should('contain', '4')
    })
    it('Verify user Remove added products from cart', () => {
        cy.ProductPageVisit()
        cy.AddProductsInCart()
        cy.get('#product-1 > .cart_delete > .cart_quantity_delete').click()
        cy.get('#product-2 > .cart_delete > .cart_quantity_delete').click()
        CommonObject.CartDescription.should('not.be.visible') 
    })
    it('Verify user add to cart from recomended items', () => {
        Home.launch()
        cy.get('div.recommended_items > h2.title.text-center').scrollIntoView().should('contain', 'recommended items')
        cy.get('.carousel-inner').find('.item.active').contains('p', 'Stylish Dress').parent('.productinfo').within(() => {
            cy.get('.add-to-cart').click()
        })
        CommonObject.ViewCart.click()
        CommonObject.CartDescription.should('be.visible')
    })
})