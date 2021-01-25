// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
        deposit(money: number): void;
        purchase(product: string): void;
        addStock(product: string, quantity: number): void;
    }
}
//

Cypress.Commands.add('deposit', (money) => {
    cy.get(`#deposited-cash`).clear(money);
    cy.get(`#deposited-cash`).type(money);
});

Cypress.Commands.add('purchase', (product) => {
    cy.get(`#product-${product}`).click();
});

Cypress.Commands.add('addStock', (product, quantity) => {
    cy.get(`#toggle-stock`).click();
    cy.get(`#add-${product} input`).type(quantity);
    cy.get(`#add-${product} button`).click();
    cy.get(`#toggle-stock`).click();
});
