export const getMessages = () => cy.get('.message-display');
export const getModal = () => cy.get('.mat-dialog-container');
export const closeModal = () => cy.get('.cdk-overlay-backdrop').first().click(-50, -50, { force: true });

