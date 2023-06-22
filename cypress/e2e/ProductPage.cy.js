import '/Users/hamzayounas/Desktop/Testing E-Commerce Web/cypress/support/Utilities.js';

describe('This suite contain test cases of Product page', () => {
    it('Verify user lands on product page sucessfully', () => {
        cy.ProductPageVisit()
        cy.get('[class="nav nav-pills nav-justified"]').eq(0).click()
        cy.get('.product-information').within(() => {
                cy.contains('h2', 'Blue Top').should('be.visible');
                cy.contains('p', 'Category: Women > Tops').should('be.visible');
                cy.contains('span', 'Rs. 500').should('be.visible');
                cy.contains('p', 'Availability: In Stock').should('be.visible');
                cy.contains('p', 'Condition: New').should('be.visible');
                cy.contains('p', 'Brand: Polo').should('be.visible');
            })
    })
    it('Verify user can Search Product', () => {
        cy.ProductPageVisit()
        cy.SearchProduct()
    })
    it('Verify user Add review on product', () => {
        cy.ProductPageVisit()
        cy.get('.choose a[href="/product_details/1"]').click();
        cy.get('[placeholder="Your Name"]').type('Hamza');
        cy.get('[placeholder="Email Address"]').type((Cypress.env('email')))
        cy.get('[placeholder="Add Review Here!"]').type('Should be availbe in white color');
        cy.get('[id="button-review"]').click()
        cy.get('.alert-success > span').should('be.visible')
    })
    it('Verify user can view and select products from category', () => {
        cy.visit(Cypress.env('baseUrl'))
        cy.get('.left-sidebar h2').should('contain', 'Category')
        cy.get('.panel-title a[data-toggle="collapse"]').contains('Women').click()
        cy.get('.panel-collapse#Women').contains('Tops').click()
        cy.url().should('contain', 'category_products/2')
        cy.get('.title').should('contain', 'Women - Tops Products')
        cy.get('.panel-title a[data-toggle="collapse"]').contains('Men').click()
        cy.get('.panel-collapse#Men').contains('Tshirts').click()
        cy.get('.title').should('contain', 'Men - Tshirts Products')        
    })
    it('Verify user can select products from brands', () => {
        cy.ProductPageVisit()
        cy.get('.left-sidebar h2').should('contain', 'Brands')
        cy.get('a[href="/brand_products/Polo"]').click()
        cy.url().should('contain', 'brand_products')
        cy.get('.title').should('contain', 'Brand - Polo Products')

    })
})