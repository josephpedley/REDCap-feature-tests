import DashboardPage from "../../support/pages/DashboardPage";
import ControlCenterPage from "../../support/pages/ControlCenterPage";
import ProjectCreationPage from "../../support/pages/ProjectCreationPage";
import UserSettingsPage from "../../support/pages/UserSettingsPage";
import ProjectSetupPage from "../../support/pages/ProjectSetupPage";
import DesignerPage from "../../support/pages/DesignerPage";
import ProjectPage from "../../support/pages/ProjectPage";
import ReviewDraftedChangesPage from "../../support/pages/ReviewDraftedChangesPage";

describe('User Interface: Draft Mode Functionality', () => {
  it('should allow REDCap end users to verify that Draft mode is functioning as expected', () => {
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
    ProjectCreationPage.enterProjectTitle('B.4.20.0800.100');
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
    ProjectPage.openLoggingTab();

    // Verify logging table header
    cy.get('table.form_border tr').first().within(() => {
      cy.contains('Username');
      cy.contains('Action');
      cy.contains('List of Data Changes');
    });

    // Verify log entry for entering draft mode
    cy.get('table.form_border')
      .contains('tr', 'Enter draft mode')
      .within(() => {
        cy.get('td').eq(1).should('contain.text', 'test_joe');
        cy.get('td').eq(2).should('contain.text', 'Manage/Design');
        cy.get('td').eq(3).should('contain.text', 'Enter draft mode');
      });

       ProjectPage.openDesignerTab();
  DesignerPage.openDataTypes();
  DesignerPage.clickEditRadioManualField();
  cy.get('textarea#element_enum')
  .clear()
  .type('9..9, Choice99{enter}101, Choice100', { delay: 0 });
  cy.contains('button', 'Save').click();

  cy.get('#design-radio_button_manual')  // container table by ID
  .find('input[type="radio"][name="radio_button_manual___radio"]')
  .should('have.length', 2)             // verify there are exactly 2 radios
  .then(($radios) => {
    // Assert first radio and label
    cy.wrap($radios[0])
      .should('have.value', '9..9')
      .next('label')
      .should('have.text', 'Choice99');

    // Assert second radio and label
    cy.wrap($radios[1])
      .should('have.value', '101')
      .next('label')
      .should('have.text', 'Choice100');
  });

  DesignerPage.viewDraftSummary();
  cy.get('table#tableChanges thead tr, table#tableChanges tbody tr').first().within(() => {
      cy.contains('Variable Name').should('be.visible');
      cy.contains('Choices or Calculations').should('be.visible');
    });
  cy.get('table#tableChanges tbody tr')
  .contains('td', 'radio_button_manual')
  .parent('tr')
  .within(() => {
    cy.get('td').eq(4) // Choices or Calculations column
      .should('contain.text', '*Possible label mismatch because of label changes. Check if okay.')
      .and('contain.text', '*Data MIGHT be lost due to deleted choice(s)');
  });
  ReviewDraftedChangesPage.clickCompareButton();
  // Check header
cy.get('table.table-bordered thead tr').within(() => {
  cy.contains('Existing Value').should('be.visible');
  cy.contains('Status').should('be.visible');
  cy.contains('Number of records having this value').should('be.visible');
});

// Check first row
cy.get('table.table-bordered tbody tr').eq(0).within(() => {
  cy.contains('100').should('be.visible');
  cy.contains('Removed').should('be.visible');
  cy.contains('8').should('be.visible');
});

// Check second row
cy.get('table.table-bordered tbody tr').eq(1).within(() => {
  cy.contains('101').should('be.visible');
  cy.contains('Altered').should('be.visible');
  cy.contains('0').should('be.visible');
});



  

});

});
