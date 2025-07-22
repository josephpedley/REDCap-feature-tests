import DashboardPage from "../../support/pages/DashboardPage";
import ControlCenterPage from "../../support/pages/ControlCenterPage";
import ProjectCreationPage from "../../support/pages/ProjectCreationPage";
import UserSettingsPage from "../../support/pages/UserSettingsPage";
import ProjectSetupPage from "../../support/pages/ProjectSetupPage";
import DesignerPage from "../../support/pages/DesignerPage";
import ProjectPage from "../../support/pages/ProjectPage";


describe('User Interface: Draft Mode Data Dictionary Versioning', () => {
  it('should record all versions of the data dictionary post-production with date time stamp, requestor, and approver', () => {
     // Admin enables move-to-production setting
        cy.loginAdmin();
        DashboardPage.goToControlCenter();
        ControlCenterPage.openUserSettings();
        cy.contains('System-level User Settings').should('be.visible');
        UserSettingsPage.selectMoveToProductionOption('Yes, normal users can move projects to production');
        UserSettingsPage.clickSaveChanges();
        UserSettingsPage.verifySuccessMessage();
        cy.contains('Log out').click();
    
        // Test user creates project and enters draft mode
        cy.loginTestUser();
        DashboardPage.clickNewProject();
        ProjectCreationPage.enterProjectTitle('B.4.20.0900.100');
        ProjectCreationPage.selectProjectPurpose('Practice / Just for fun');
        ProjectCreationPage.uploadProjectXml('Project_1.xml');
        ProjectCreationPage.clickCreateProject();
    
        ProjectSetupPage.openProjectSetup();
        ProjectSetupPage.moveToProduction();
        ProjectSetupPage.keepExistingData();
        ProjectSetupPage.confirmMove();
        ProjectSetupPage.verifySuccessMessage();
    
        ProjectPage.openDesignerTab();
        DesignerPage.clickEnterDraftModeButton();
        DesignerPage.openDataTypes();
        DesignerPage.addFieldRadioButtonManual('Notes Box (Paragraph Text)', 'DD History', 'dd_history');
        DesignerPage.submitChangesForReview();
        ProjectPage.openProjectHome();
        ProjectPage.openProjectRevisionHistory();

        cy.get('#table-prodrevisions tbody tr').should('have.length', 3);

        cy.get('#table-prodrevisions tbody tr').eq(1).within(() => {
        cy.get('td').eq(1).should('contain.text', 'Moved to production');
        cy.get('td').eq(2).invoke('text').should('match', /\d{2}-\d{2}-\d{4} \d{2}:\d{2}/);
        cy.get('td').eq(3).should('contain.text', 'Download data dictionary');
        cy.get('td').eq(4).should('contain.text', 'test_joe (test test)');
        });
        
        cy.get('#table-prodrevisions tbody tr').eq(2).within(() => {
        cy.get('td').eq(1).should('contain.text', 'Production revision #1 (current)');
        cy.get('td').eq(2).invoke('text').should('match', /\d{2}-\d{2}-\d{4} \d{2}:\d{2}/);
        cy.get('td').eq(3).should('contain.text', 'Download data dictionary');
        cy.get('td').eq(4).should('contain.text', 'test_joe (test test)').and('contain.text', 'Approved automatically');
});



  });
});
