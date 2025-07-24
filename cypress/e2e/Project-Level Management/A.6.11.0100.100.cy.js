import DashboardPage from "../../support/pages/DashboardPage";
import ProjectSetupPage from "../../support/pages/ProjectSetupPage";
import UserRightsPage from "../../support/pages/UserRightsPage";
import ControlCenterPage from "../../support/pages/ControlCenterPage";
import UserSettingsPage from "../../support/pages/UserSettingsPage";
import MyProjectsPage from "../../support/pages/MyProjectsPage";
import ProjectPage from "../../support/pages/ProjectPage";
import LoggingPage from "../../support/pages/LoggingPage.cy";

describe('Feature: A.6.11.0100 - Control Center: Restricting Move to Production Access', () => {
  it('Scenario: A.6.11.0100.100 - Production status setting in control center', () => {
    cy.loginAdmin();

    DashboardPage.clickNewProject();
    cy.createProject('A.6.11.0100.100', 'Project_1.xml');

    ProjectSetupPage.openUserRights();
    UserRightsPage.assignUserToRole('test_joe', '1_FullRights');

    cy.get('.userSaveMsg')
      .should('be.visible')
      .and('contain.text', 'test_joe')
      .and('contain.text', '1_FullRights');

    DashboardPage.goToControlCenter();
    ControlCenterPage.openUserSettings();

    UserSettingsPage.selectMoveToProductionOption('No, only Administrators can move projects to production');
    UserSettingsPage.clickSaveChanges();
    UserSettingsPage.verifySuccessMessage();

    cy.contains('Log out').click();

    cy.loginTestUser();

    DashboardPage.goToMyProjects();
    MyProjectsPage.openProjectByName('A.6.11.0100.100');

    ProjectSetupPage.openProjectSetup();
    ProjectSetupPage.moveToProduction();
    ProjectSetupPage.keepExistingData();
    ProjectSetupPage.requestMoveToProduction();
    ProjectSetupPage.verifyRequestSuccessMsg();

    ProjectPage.openLoggingTab();
    LoggingPage.verifyLoggingTableHeaders();
    LoggingPage.verifyLoggingEntry(
      1,
      'test_joe',
      'Manage/Design',
      'Send request to move project to production status'
    );

    cy.contains('span', 'Setup').click();
    ProjectSetupPage.cancelRequest();

    cy.contains('Log out').click();

    cy.loginAdmin();

    DashboardPage.goToControlCenter();
    ControlCenterPage.openUserSettings();

    UserSettingsPage.selectMoveToProductionOption('Yes, normal users can move projects to production');
    UserSettingsPage.clickSaveChanges();
    UserSettingsPage.verifySuccessMessage();

    cy.contains('Log out').click();

    cy.loginTestUser();

    DashboardPage.goToMyProjects();
    MyProjectsPage.openProjectByName('A.6.11.0100.100');

    cy.moveToProduction();

    ProjectPage.openLoggingTab();
    LoggingPage.verifyLoggingTableHeaders();
    LoggingPage.verifyLoggingEntry(1, 'test_joe', 'Manage/Design', 'Move project to Production status');
  });
});
