import DashboardPage from "../../support/pages/DashboardPage";
import ControlCenterPage from "../../support/pages/ControlCenterPage";
import UserSettingsPage from "../../support/pages/UserSettingsPage";
import ProjectCreationPage from "../../support/pages/ProjectCreationPage";
import ProjectSetupPage from "../../support/pages/ProjectSetupPage";
import DesignerPage from "../../support/pages/DesignerPage";
import ProjectPage from "../../support/pages/ProjectPage";

describe('User Interface: Draft Mode Functionality', () => {
  it('should provide a detailed summary of all drafted changes', () => {
    // Admin config
    cy.loginAdmin();
    DashboardPage.goToControlCenter();
    ControlCenterPage.openUserSettings();
    cy.contains('System-level User Settings').should('be.visible');
    UserSettingsPage.selectMoveToProductionOption('Yes, normal users can move projects to production');
    UserSettingsPage.clickSaveChanges();
    UserSettingsPage.verifySuccessMessage();
    cy.contains('Log out').click();

    // Test user creates and configures project
    cy.loginTestUser();
    DashboardPage.clickNewProject();
    ProjectCreationPage.enterProjectTitle('B.4.20.0400.100');
    ProjectCreationPage.selectProjectPurpose('Practice / Just for fun');
    ProjectCreationPage.uploadProjectXml('Project_1.xml');
    ProjectCreationPage.clickCreateProject();

    ProjectSetupPage.openProjectSetup();
    ProjectSetupPage.moveToProduction();
    ProjectSetupPage.keepExistingData();
    ProjectSetupPage.confirmMove();
    ProjectSetupPage.verifySuccessMessage();

    // Enter draft mode and make changes
    ProjectPage.openDesignerTab();
    DesignerPage.clickEnterDraftModeButton();
    DesignerPage.openDataTypes();
    DesignerPage.clickEditRadioManualField();
    DesignerPage.typeChoiceLine('102, Choice102');
    DesignerPage.addFieldRadioButtonManual('Notes Box (Paragraph Text)', 'Notes Box', 'notesbox4');
    DesignerPage.viewDraftSummary();

    // Verify Draft Summary Table
    cy.get('#tableChanges thead tr, #tableChanges tr:first').within(() => {
      cy.contains('Variable Name');
      cy.contains('Section Header');
      cy.contains('Field Type');
      cy.contains('Field Label');
      cy.contains('Choices or Calculations');
    });

    cy.get('#tableChanges').within(() => {
      cy.contains('tr', 'radio_button_manual').within(() => {
        cy.get('td').eq(0).should('have.text', 'radio_button_manual');
        cy.get('td').eq(2).should('have.text', 'radio');
        cy.get('td').eq(3).should('have.text', 'Radio Button Manual');
        cy.get('td').eq(4).should('contain.text', '102, Choice102');
      });

      cy.contains('tr', 'notesbox4').within(() => {
        cy.get('td').eq(0).should('have.text', 'notesbox4');
        cy.get('td').eq(2).should('have.text', 'notes');
        cy.get('td').eq(3).should('have.text', 'Notes Box');
        cy.get('td').eq(4).should('have.text', '');
      });
    });

    // Verify Logging Table
    ProjectPage.openLoggingTab();

    cy.get('table.form_border tr').first().within(() => {
      cy.contains('Username');
      cy.contains('Action');
      cy.contains('List of Data Changes');
    });

    cy.get('table.form_border')
      .contains('tr', 'Create project field')
      .within(() => {
        cy.get('td').eq(1).should('contain.text', 'test_joe');
        cy.get('td').eq(2).should('contain.text', 'Manage/Design');
        cy.get('td').eq(3).should('contain.text', 'Create project field');
      });

    cy.get('table.form_border')
      .contains('tr', 'Edit project field')
      .within(() => {
        cy.get('td').eq(1).should('contain.text', 'test_joe');
        cy.get('td').eq(2).should('contain.text', 'Manage/Design');
        cy.get('td').eq(3).should('contain.text', 'Edit project field');
      });
  });
});
