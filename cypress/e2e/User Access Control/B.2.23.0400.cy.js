import DashboardPage from "../../support/pages/DashboardPage";
import ProjectCreationPage from "../../support/pages/ProjectCreationPage";
import ProjectSetupPage from "../../support/pages/ProjectSetupPage";
import UserRightsPage from "../../support/pages/UserRightsPage";
import ProjectPage from "../../support/pages/ProjectPage";
import MyProjectsPage from "../../support/pages/MyProjectsPage";


describe('Logging Module - Security and Integrity Verification', () => {
  it('should ensure that the logging module is secure, tamper-proof, and not susceptible to unauthorized modifications', () => {
    cy.loginAdmin();
    DashboardPage.clickNewProject();
    ProjectCreationPage.enterProjectTitle('B.2.23.0400.100');
    ProjectCreationPage.selectProjectPurpose('Practice / Just for fun');
    ProjectCreationPage.uploadProjectXml('Project_1.xml');
    ProjectCreationPage.clickCreateProject();
        
    ProjectSetupPage.openProjectSetup();
    ProjectSetupPage.moveToProduction();
    ProjectSetupPage.keepExistingData();
    ProjectSetupPage.confirmMove();
    ProjectSetupPage.verifySuccessMessage();
    ProjectSetupPage.openUserRights();
    UserRightsPage.addUser('test_joe')
    ProjectPage.openLoggingTab();

    cy.get('#center').should('not.contain', 'Edit');
    cy.contains('Modify').should('not.exist')
    cy.contains('Upload').should('not.exist')
    cy.contains('Log out').click();

    cy.loginTestUser();
    DashboardPage.goToMyProjects();
    MyProjectsPage.openProjectByName('B.2.23.0400.100');
    cy.contains('Logging').should('not.exist');




    
  });
});
