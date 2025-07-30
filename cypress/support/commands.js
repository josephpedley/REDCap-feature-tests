import 'cypress-file-upload';
import 'cypress-downloadfile/lib/downloadFileCommand';
import ProjectCreationPage from './pages/ProjectCreationPage';
import ProjectSetupPage from './pages/ProjectSetupPage';
import DashboardPage from './pages/DashboardPage';


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

Cypress.Commands.add('loginTestUser2', () => {
  cy.visit(Cypress.env('BASE_URL'));
  cy.get('#username').type(Cypress.env('TESTUSER_USERNAME') + '2');
  cy.get('#password').type(Cypress.env('TESTUSER_PASSWORD'));
  cy.contains('button', 'Log In').click();
});
 Cypress.Commands.add('createProject', (projectName, projectFile) => {
   DashboardPage.clickNewProject();
   ProjectCreationPage.enterProjectTitle(projectName);
   ProjectCreationPage.selectProjectPurpose('Practice / Just for fun');
   ProjectCreationPage.uploadProjectXml(projectFile);
   ProjectCreationPage.clickCreateProject();
 })
 Cypress.Commands.add('moveToProduction', () => {
    ProjectSetupPage.openProjectSetup();
    ProjectSetupPage.moveToProduction();
    cy.wait(500)
    ProjectSetupPage.keepExistingData();
    cy.wait(500)
    ProjectSetupPage.confirmMove();
    cy.wait(500)
    ProjectSetupPage.verifySuccessMessage();
 })
 Cypress.Commands.add('disableAutoNumbering', () => {
   cy.contains('span', 'Setup').click();
    cy.contains('div', 'Auto-numbering for records')
  .find('button')
  .should('contain', 'Disable')
  .click();
cy.get('.x-panel-header')
  .contains('External Modules')
  .parents('.x-panel-header')
  .find('a')
  .contains('Manage')
  .invoke('attr', 'href')
  .then((href) => {
    cy.visit('https://redcap-test.imperial.ac.uk/' + href);
  });

cy.get('button.external-modules-disable-button').first().click();
cy.get('#external-modules-disable-button-confirmed').click();
 })
