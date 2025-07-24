import 'cypress-file-upload';
import 'cypress-downloadfile/lib/downloadFileCommand';
import ProjectCreationPage from './pages/ProjectCreationPage';
import ProjectSetupPage from './pages/ProjectSetupPage';


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
 Cypress.Commands.add('createProject', (projectName, projectFile) => {
   ProjectCreationPage.enterProjectTitle(projectName);
   ProjectCreationPage.selectProjectPurpose('Practice / Just for fun');
   ProjectCreationPage.uploadProjectXml(projectFile);
   ProjectCreationPage.clickCreateProject();
 })
 Cypress.Commands.add('moveToProduction', () => {
    ProjectSetupPage.openProjectSetup();
    ProjectSetupPage.moveToProduction();
    ProjectSetupPage.keepExistingData();
    ProjectSetupPage.confirmMove();
    ProjectSetupPage.verifySuccessMessage();
 })
