import DashboardPage from "../../support/pages/DashboardPage";
import DesignerPage from "../../support/pages/DesignerPage";
import LoggingPage from "../../support/pages/LoggingPage.cy";
import ProjectCreationPage from "../../support/pages/ProjectCreationPage";
import ProjectPage from "../../support/pages/ProjectPage";
import ProjectSetupPage from "../../support/pages/ProjectSetupPage";

describe('Feature: Survey Project Settings', () => {
  it('As a REDCap end user, I want to verify that survey functionality can be enabled or disabled at the project level and that managing project user access works as expected', () => {

    // Log in as admin
    cy.loginAdmin();

    // Create a new project
    DashboardPage.clickNewProject();
    ProjectCreationPage.enterProjectTitle('B.6.4.1300.100');
    ProjectCreationPage.selectProjectPurpose('Practice / Just for fun');
    ProjectCreationPage.uploadProjectXml('Project_1.xml');
    ProjectCreationPage.clickCreateProject();

    // Verify instrument row includes survey column
    ProjectPage.openDesignerTab();
    cy.get('table tbody tr').first().invoke('text').then(text => {
      let normalizedText = text.replace(/\s+/g, ' ').trim();
      normalizedText = normalizedText.replace('assurvey', 'as survey');
      expect(normalizedText).to.equal(
        'Instrument name Fields PDF Enabled as survey Instrument actions Survey related options'
      );
    });

    // Disable surveys from project setup
    ProjectPage.openProjectSetup();
    ProjectSetupPage.clickSetupEnableSurveysBtn('Disable');
    ProjectSetupPage.confirmEnableDisableSurvey('Disable');
    cy.get('#setupEnableSurveysBtn').should('be.visible').and('contain', 'Enable');

    // Verify survey column is removed from instrument row
    ProjectPage.openDesignerTab();
    cy.get('table tbody tr').first().invoke('text').then(text => {
      let normalizedText = text.replace(/\s+/g, ' ').trim();
      normalizedText = normalizedText.replace('assurvey', 'as survey');
      expect(normalizedText).to.equal('Instrument name Fields PDF Instrument actions');
    });

    // Verify log entry for disabling surveys
    ProjectPage.openLoggingTab();
    LoggingPage.verifyLoggingTableHeaders();
    LoggingPage.verifyLoggingEntry(1, 'test_admin', 'Manage/Design', 'Modify project settings');

    // Re-enable surveys
    cy.contains('a', 'Setup').click();
    ProjectSetupPage.clickSetupEnableSurveysBtn('Enable');
    cy.contains('Saved').should('be.visible');
    cy.get('#setupEnableSurveysBtn').should('be.visible').and('contain', 'Disable');

    // Enable instrument as a survey and verify success message
    ProjectPage.openDesignerTab();
    DesignerPage.clickButtonSaveAndVerifySuccess(1, 'Enable');

    // Verify log entry for setting up survey
    ProjectPage.openLoggingTab();
    LoggingPage.verifyLoggingTableHeaders();
    LoggingPage.verifyLoggingEntry(1, 'test_admin', 'Manage/Design', 'set up survey');

    // Delete survey settings
    ProjectPage.openDesignerTab();
    DesignerPage.clickDeleteSurveySettings(1);

    // Verify instrument row allows re-enabling survey
    cy.get('#row_1').contains('button', 'Enable').should('be.visible');

    // Verify log entry for deleting survey settings
    ProjectPage.openLoggingTab();
    LoggingPage.verifyLoggingTableHeaders();
    LoggingPage.verifyLoggingEntry(1, 'test_admin', 'Manage/Design', 'delete survey');
  });
});
