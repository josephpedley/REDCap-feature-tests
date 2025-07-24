import AddEditRecordsPage from "../../support/pages/AddEditRecordsPage";
import ControlCenterPage from "../../support/pages/ControlCenterPage";
import DashboardPage from "../../support/pages/DashboardPage";
import ProjectPage from "../../support/pages/ProjectPage";
import ProjectSetupPage from "../../support/pages/ProjectSetupPage";
import UserSettingsPage from "../../support/pages/UserSettingsPage";
import LoggingPage from "../../support/pages/LoggingPage.cy";
import MyProjectsPage from "../../support/pages/MyProjectsPage";
import UserRightsPage from "../../support/pages/UserRightsPage";

describe('Feature: Saving Data - Navigation Prompt on Unsaved Changes', () => {
  it('Scenario: Prompt user when navigating away from data entry page with unsaved changes', () => {
    // Admin sets project settings
    cy.loginAdmin();
    DashboardPage.goToControlCenter();
    ControlCenterPage.openUserSettings();
    UserSettingsPage.selectMoveToProductionOption('Yes, normal users can move projects to production');
    UserSettingsPage.clickSaveChanges();
    UserSettingsPage.verifySuccessMessage();
    cy.contains('Log out').click();

    // Test user creates project and adds admin to disable module to work around bug
    cy.loginTestUser();
    DashboardPage.clickNewProject();
    cy.createProject('B.3.14.500.100', 'Project_3.14.xml');
    ProjectSetupPage.openProjectSetup();
    ProjectSetupPage.disableAutoIncrementRecords();

    cy.contains('a', 'User Rights')
      .then($link => {
        const href = $link.attr('href');
        cy.visit('https://redcap-test.imperial.ac.uk' + href);
      });

    UserRightsPage.addUser('test_admin');
    cy.contains('Log out').click();

    // Admin disables external module
    cy.loginAdmin();
    MyProjectsPage.openProjectByName('B.3.14.500.100');

    cy.get('div.x-panel-header.x-panel-header-leftmenu')
      .contains('a', 'Manage')
      .then($link => {
        const href = $link.attr('href');
        cy.visit('https://redcap-test.imperial.ac.uk' + href);
      });

    cy.get('tr[data-module="custom_record_naming"]')
      .find('button.external-modules-disable-button')
      .click();

    cy.contains('button', 'Disable module').click();
    cy.contains('Log out').click();

    // Test user works with records
    cy.loginTestUser();
    MyProjectsPage.openProjectByName('B.3.14.500.100');
    cy.moveToProduction();
    ProjectSetupPage.openAddEditRecords();

    // Scenario 1: Leave without saving
    AddEditRecordsPage.addRecord(7);
    cy.get('body').click(0, 0);
    cy.wait(1000);
    AddEditRecordsPage.addRecordDataTypesEvent1();
    cy.contains('Adding new Record ID 7.').should('be.visible');
    cy.contains('Setup').click();
    AddEditRecordsPage.verifySaveChangesOnLeave();
    AddEditRecordsPage.leaveWithoutSavingChanges();
    cy.contains('span', 'Main project settings');
    ProjectPage.openLoggingTab();
    cy.contains('Create record').should('not.exist');

    // Scenario 2: Save before leaving
    ProjectSetupPage.openAddEditRecords();
    AddEditRecordsPage.addRecord(7);
    cy.get('body').click(0, 0);
    cy.wait(1000);
    AddEditRecordsPage.addRecordDataTypesEvent1();
    cy.contains('Adding new Record ID 7.').should('be.visible');
    cy.contains('Setup').click();
    AddEditRecordsPage.verifySaveChangesOnLeave();
    AddEditRecordsPage.leaveWithSavingChanges();
    cy.contains('span', 'Main project settings');
    ProjectPage.openLoggingTab();
    LoggingPage.verifyLoggingTableHeaders();
    LoggingPage.verifyLoggingEntry(1, 'test_joe', 'Create record7', '');

    // Scenario 3: Stay on page
    ProjectSetupPage.openAddEditRecords();
    AddEditRecordsPage.addRecord(8);
    cy.get('body').click(0, 0);
    cy.wait(1000);
    AddEditRecordsPage.addRecordDataTypesEvent1();
    cy.contains('Setup').click();
    AddEditRecordsPage.verifySaveChangesOnLeave();
    AddEditRecordsPage.stayOnPage();
    cy.contains('Adding new Record ID 8.').should('be.visible');
  });
});
