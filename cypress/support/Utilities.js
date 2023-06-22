Cypress.Commands.add('Del_Account', () => {
    cy.contains('li a', 'Delete Account').click()
    cy.contains('h2[data-qa="account-deleted"]', 'Account Deleted!').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
})
Cypress.Commands.add('UserNameVisibility', () => {
    cy.get('li a i.fa.fa-user + b').should('be.visible').contains('Hamza')
})
Cypress.Commands.add('UserSignUp', (User_Name, Email) => {
    cy.get('.signup-form h2').should('have.text', 'New User Signup!')
    cy.get('[data-qa="signup-name"]').type(User_Name)
    cy.get('[data-qa="signup-email"]').type(Email)
    cy.get('[data-qa="signup-button"]').click()
})
Cypress.Commands.add('ProductPageVisit', () => {
    cy.visit(Cypress.env('baseUrl'));
    cy.contains('a', 'Products').click();
    cy.get('.title').should('have.text', 'All Products')
    cy.get('.features_items').should('be.visible')
})
Cypress.Commands.add('SubscribeEmail', () => {
    cy.ScrollingDown()
    cy.get('#susbscribe_email').type((Cypress.env('email')));
    cy.get('#subscribe').click()
    cy.get('.alert-success').should('be.visible')
})
Cypress.Commands.add('AddProductsInCart', () => {
    cy.get('.productinfo.text-center').eq(0).trigger('mouseover').find('.add-to-cart').click({ multiple: true })
    cy.get('.modal-footer > .btn').should('be.visible').click()
    cy.get('.productinfo.text-center').eq(1).trigger('mouseover').find('.add-to-cart').click({ multiple: true })
    cy.contains('a', 'View Cart').click();
    cy.get('#product-1 > .cart_product > a > .product_image').should('be.visible')
    cy.get('#product-2 > .cart_product > a > .product_image').should('be.visible')
})
Cypress.Commands.add('NewUserRegistration', () => {
    cy.get('.login-form').should('be.visible').contains('Enter Account Information');
    cy.get('#uniform-id_gender1').click()
    cy.get('#password').type(Cypress.env('password'));
    cy.get('#days').select('23');
    cy.get('#months').select('January')
    cy.get('#years').select('1994')
    cy.get('#newsletter').click()
    cy.get('[data-qa="first_name"]').type('Hamza')
    cy.get('[data-qa="last_name"]').type('Younas')
    cy.get('#address1').type(Cypress.env('CustomerAddress'))
    cy.get('#country').select('United States')
    cy.get('[data-qa="state"]').type('Massachusetts (MA)')
    cy.get('[data-qa="city"]').type('Boston')
    cy.get('#zipcode').type('05544')
    cy.get('#mobile_number').type('+12030233')
    cy.get('[data-qa="create-account"]').click()
    cy.get('div.col-sm-9.col-sm-offset-1 h2[data-qa="account-created"]').should('be.visible').and('have.text', 'Account Created!')
    cy.get('[data-qa="continue-button"]').click()
})
Cypress.Commands.add('ScrollingDown', () => {
    cy.get('.footer-bottom > .container > .row').scrollIntoView()
    cy.get('.single-widget > h2').should('have.text', 'Subscription')
})
Cypress.Commands.add('PlaceAnOrder', () => {
    cy.get('.col-sm-6 > .btn').click()
    cy.get('.step-one').eq(0).should('be.visible')
    cy.get('.step-one').eq(1).should('be.visible')
    cy.get('.form-control').type('testing')
    cy.contains('Place Order').click()
    cy.get('[data-qa="name-on-card"]').type('Test')
    cy.get('[data-qa="card-number"]').type('121312')
    cy.get('[data-qa="cvc"]').type(12)
    cy.get('[data-qa="expiry-month"]').type('01')
    cy.get('[data-qa="expiry-year"]').type('2024')
    cy.get('[data-qa="pay-button"]').click()
    //cy.get('#cart_items > .container').should('be.visible').and('contain', 'Your order has been placed successfully!')
})
Cypress.Commands.add('SearchProduct', () => {
    cy.get('#search_product').type('Men Tshirt')
    cy.get('#submit_search').click()
    cy.get('.title').should('have.text', 'Searched Products')
    cy.get('.features_items').should('be.visible')
})


