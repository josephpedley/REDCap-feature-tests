import DashboardPage from "../../support/pages/DashboardPage";
import MyProjectsPage from "../../support/pages/MyProjectsPage";
import ProjectCreationPage from "../../support/pages/ProjectCreationPage";
import ProjectPage from "../../support/pages/ProjectPage";
import ProjectSetupPage from "../../support/pages/ProjectSetupPage";


describe('Logging Module - End User Verification', () => {
  it('should verify that the Logging Module functions correctly from the end user perspective', () => {
    cy.loginAdmin();
    DashboardPage.clickNewProject()
    ProjectCreationPage.enterProjectTitle('B.2.23.0100');
    ProjectCreationPage.selectProjectPurpose('Practice / Just for fun');
    ProjectCreationPage.uploadProjectXml('Project_1.xml');
    ProjectCreationPage.clickCreateProject();

   
        
    ProjectSetupPage.openProjectSetup();
    ProjectSetupPage.moveToProduction();
    ProjectSetupPage.keepExistingData();
    ProjectSetupPage.confirmMove();
    ProjectSetupPage.verifySuccessMessage();
    ProjectSetupPage.openUserRights();
    
    ProjectPage.openLoggingTab();
    // Assert table headers
    cy.get('table.form_border tr').first().within(() => {
    cy.get('td').eq(0).should('contain.text', 'Time / Date');
    cy.get('td').eq(1).should('contain.text', 'Username');
    cy.get('td').eq(2).should('contain.text', 'Action');
    cy.get('td').eq(3).should('contain.text', 'List of Data Changes');
    });

    // Assert one of the rows contains expected values
    cy.get('table.form_border tr').eq(1).within(() => {
    cy.get('td').eq(1).should('contain.text', 'test_admin');
    cy.get('td').eq(2).should('contain.text', 'Manage/Design');
    cy.get('td').eq(3).should('contain.text', 'Move project to Production status');
    });



  });
});
