import { closeModal, getMessages, getModal } from '../support/app.po';

describe('vending-machine', () => {
  beforeEach(() => cy.visit('/'));

  it('should all user to purchase a can', () => {
      // Action 1: Purchase 1 can with $2
      cy.deposit(2.0);
      cy.purchase('can');

      getModal().contains('Product Dispensed');
      getModal().contains('1 X can');
      getModal().contains('Change returned: $0.80');

      closeModal();

      // Action 2: Purchase 1 can with $1
      cy.deposit(1.0);
      cy.purchase('can');
      getMessages().contains('Insufficient money');

      // Action 3: Purchase 1 can with $1.50
      cy.deposit(1.5);
      cy.purchase('can');
      getMessages().contains('Out of stock');

      // Action 4: Resupply with 10 cans
      cy.addStock('can', 10);

      getMessages().contains('can 10');
      getMessages().contains('Resupplied with 10 can(s)');

      // Action 5: Purchase 3 can with $5
      cy.deposit(5.0);

      // Assumption: purchasing 3 cans would be clicking on can button while
      // the can is still being dispensed
      cy.purchase('can');
      cy.purchase('can');
      cy.purchase('can');

      getModal().contains('Product Dispensed');
      getModal().contains('1 X can');
      getModal().contains('Change returned: $3.80');

      closeModal();
  });
});
