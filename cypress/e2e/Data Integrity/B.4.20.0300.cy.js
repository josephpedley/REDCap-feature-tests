import DashboardPage from "../../support/pages/DashboardPage";
import ControlCenterPage from "../../support/pages/ControlCenterPage";
import UserSettingsPage from "../../support/pages/UserSettingsPage";
import ProjectCreationPage from "../../support/pages/ProjectCreationPage"; 
import ProjectSetupPage from "../../support/pages/ProjectSetupPage";       
import DesignerPage from "../../support/pages/DesignerPage";
import ProjectPage from "../../support/pages/ProjectPage";

describe('Draft Mode functionality in REDCap', () => {
  it('requires changes to data collection instruments in production projects to be made only in Draft Mode and applies changes only after draft submission acceptance', () => {
    cy.loginAdmin();
    DashboardPage.goToControlCenter();
    ControlCenterPage.openUserSettings();
    cy.contains('System-level User Settings').should('be.visible');
    UserSettingsPage.selectMoveToProductionOption('Yes, normal users can move projects to production');
    UserSettingsPage.clickSaveChanges();
    UserSettingsPage.verifySuccessMessage();
    cy.contains('Log out').click();

    cy.loginTestUser();
    DashboardPage.clickNewProject();
    ProjectCreationPage.enterProjectTitle('B.4.20.0300.100');
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
    DesignerPage.clickEditRadioManualField();
    DesignerPage.typeChoiceLine('102, Choice102');

    ProjectPage.openRecordStatusDashboard();
    cy.get('#record_status_table')
      .find('td.rc-rsd-id-cell a')
      .contains(/^1$/)
      .parents('tr')
      .within(() => {
        cy.wait(1000);
        cy.get('td').eq(5)
          .find('a')
          .click({ force: true });
        cy.wait(1000);
      });

    cy.get('table.compact.dataTable.no-footer')
      .contains('td', '1')
      .parent()
      .find('a')
      .click();

    cy.contains('Choice102').should('not.exist');

    ProjectPage.openDesignerTab();
    cy.contains('Leave without saving changes').click();

    DesignerPage.viewDraftSummary();
    cy.get('table#tableChanges thead tr, table#tableChanges tbody tr').first().within(() => {
      cy.contains('Variable Name').should('be.visible');
      cy.contains('Section Header').should('be.visible');
      cy.contains('Field Type').should('be.visible');
      cy.contains('Field Label').should('be.visible');
      cy.contains('Choices or Calculations').should('be.visible');
    });
    cy.get('table#tableChanges tbody tr').eq(1).within(() => {
      cy.contains('radio_button_manual').should('be.visible');
      cy.contains('radio').should('be.visible');
      cy.contains('Radio Button Manual').should('be.visible');
      cy.contains('102, Choice102').should('be.visible');
    });

    cy.contains('button', 'RETURN TO PREVIOUS PAGE').click();
    DesignerPage.submitChangesForReview();

    ProjectPage.openLoggingTab();

    cy.get('table.form_border').within(() => {
      cy.get('tr').first().within(() => {
        cy.contains('td', 'Username').should('exist');
        cy.contains('td', 'Action').should('exist');
        cy.contains('td', /List of Data Changes/i).should('exist');
      });

      cy.get('tr').not(':first').should('contain.text', 'test_joe')
        .and('contain.text', 'Manage/Design')
        .and('contain.text', 'Approve production project modifications (automatic)');
    });

    ProjectPage.openRecordStatusDashboard();
    cy.get('#record_status_table')
      .contains('td', '1')
      .parent()
      .find('a')
      .eq(5)
      .click();

      cy.get('table.compact.dataTable.no-footer') // ANOMALY - In LTS V15.0.9 LTS, no instance selection was required
      .contains('td', '1')
      .parent()
      .find('a')
      .click();


    cy.contains('Choice102').should('be.visible');
  });
});
