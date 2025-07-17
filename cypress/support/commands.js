import 'cypress-file-upload';

Cypress.Commands.add('loginAdmin', () => {
  cy.visit(Cypress.env('BASE_URL'));
  cy.get('#username').type(Cypress.env('ADMIN_USERNAME'));
  cy.get('#password').type(Cypress.env('ADMIN_PASSWORD'));
  cy.contains('button', 'Log In').click();
});

Cypress.Commands.add('loginTestUser', () => {
  cy.visit(Cypress.env('BASE_URL'));
  cy.get('#username').type(Cypress.env('TESTUSER_USERNAME'));
  cy.get('#password').type(Cypress.env('TESTUSER_PASSWORD'));
  cy.contains('button', 'Log In').click();
});
