import '/Users/hamzayounas/Desktop/Testing E-Commerce Web/cypress/support/Utilities.js';

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
    it('Verify user add multiple products in cart', () => {
        cy.ProductPageVisit()
        cy.get('[class="nav nav-pills nav-justified"]').eq(0).click()
        cy.get('.product-information').within(() => {
            cy.contains('h2', 'Blue Top').should('be.visible');
        })
        cy.get('#quantity').clear().type(4)
        cy.get('[class="btn btn-default cart"]').click()
        cy.contains('a', 'View Cart').click();
        cy.get('tr#product-1 td.cart_quantity button.disabled').should('contain', '4')
    })
    it('Verify user Remove added products from cart', () => {
        cy.ProductPageVisit()
        cy.AddProductsInCart()
        cy.get('#product-1 > .cart_delete > .cart_quantity_delete').click()
        cy.get('#product-2 > .cart_delete > .cart_quantity_delete').click()
        cy.get('.description').should('not.be.visible')
    })
    it.only('Verify user add to cart from recomended items', () => {
        cy.visit(Cypress.env('baseUrl'))
        cy.get('div.recommended_items > h2.title.text-center').scrollIntoView().should('contain', 'recommended items')
        cy.get('.carousel-inner').find('.item.active').contains('p', 'Stylish Dress').parent('.productinfo').within(() => {
            cy.get('.add-to-cart').click()
        })
        cy.contains('a', 'View Cart').click();
        cy.get('.cart_description > p').should('be.visible')
    })
})