import DashboardPage from '../../support/pages/DashboardPage';
import ControlCenterPage from '../../support/pages/ControlCenterPage';
import UserSettingsPage from '../../support/pages/UserSettingsPage';
import ProjectPage from '../../support/pages/ProjectPage';
import ProjectSetupPage from '../../support/pages/ProjectSetupPage';
import RecordStatusDashboardPage from '../../support/pages/RecordStatusDashboardPage';
import LoggingPage from '../../support/pages/LoggingPage.cy';

describe('B.4.27.0300.100 Change project longitudinal status', () => {
  it('allows enabling and disabling of longitudinal data collection in Project Setup', () => {
    // Admin setup: allow normal users to move projects to production
    cy.loginAdmin();
    DashboardPage.goToControlCenter();
    ControlCenterPage.openUserSettings();
    UserSettingsPage.selectMoveToProductionOption('Yes, normal users can move projects to production');
    UserSettingsPage.clickSaveChanges();
    UserSettingsPage.verifySuccessMessage();
    cy.contains('Log out').click();

    // Test user creates project
    cy.loginTestUser();
    cy.createProject('B.4.27.0300.100', 'Project_1.xml');
    ProjectPage.openRecordStatusDashboard();

    const longitudinalHeaders = ['Record ID', 'Event 1', 'Event 2', 'Event Three'];
    RecordStatusDashboardPage.assertTableHeaders(longitudinalHeaders);

    // Disable longitudinal setting
    cy.contains('a', 'Setup').click();
    ProjectSetupPage.disableLongitudinal();
    ProjectPage.openRecordStatusDashboard();

    const classicHeaders = ['Record ID', 'Text Validation', 'Data Types', 'Survey', 'Consent'];
    RecordStatusDashboardPage.assertTableHeaders(classicHeaders);

    // Verify logging for disabling longitudinal
    ProjectPage.openLoggingTab();
    LoggingPage.verifyLoggingEntryByContent('test_joe', 'Manage/Design', 'Modify project settings');

    // Re-enable longitudinal setting
    cy.contains('a', 'Setup').click();
    ProjectSetupPage.enableLongitudinal();
    ProjectPage.openRecordStatusDashboard();
    RecordStatusDashboardPage.assertTableHeaders(longitudinalHeaders);

    // Verify logging for enabling longitudinal
    ProjectPage.openLoggingTab();
    LoggingPage.verifyLoggingEntryByContent('test_joe', 'Manage/Design', 'Modify project settings');

    // Move project to production
    cy.contains('a', 'Setup').click();
    cy.moveToProduction();
    ProjectSetupPage.openProjectSetup();
    cy.get('#setupLongiBtn').should('contain.text', 'Disable');

    // Admin disables longitudinal again post-production
    cy.contains('Log out').click();
    cy.loginAdmin();
    DashboardPage.goToControlCenter();
    ControlCenterPage.goToBrowseProjects();
    ControlCenterPage.browseProjectByName('B.4.27.0300.100');

    cy.contains('a', 'Setup').click();
    ProjectSetupPage.disableLongitudinal();
    ProjectPage.openRecordStatusDashboard();

    // Confirm "Event 1" no longer visible and headers updated
    cy.contains('Event 1').should('not.exist');
    RecordStatusDashboardPage.assertTableHeaders(classicHeaders);

    // Final logging check
    ProjectPage.openLoggingTab();
    LoggingPage.verifyLoggingEntryByContent('test_joe', 'Manage/Design', 'Modify project settings');
  });
});
