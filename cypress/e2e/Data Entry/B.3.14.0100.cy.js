import DashboardPage from '../../support/pages/DashboardPage';
import ProjectCreationPage from '../../support/pages/ProjectCreationPage';
import ProjectSetupPage from '../../support/pages/ProjectSetupPage';
import UserRightsPage from '../../support/pages/UserRightsPage';
import MyProjectsPage from '../../support/pages/MyProjectsPage';
import AddEditRecordsPage from '../../support/pages/AddEditRecordsPage';
import TextValidationPage from '../../support/pages/TextValidationPage';
import ProjectPage from '../../support/pages/ProjectPage';
import LoggingPage from '../../support/pages/LoggingPage.cy';
import DataExportsReportsAndStatsPage from '../../support/pages/DataExportsReportsAndStatsPage';

describe('Direct data entry with data collection instrument', () => {
  it('Creating a Record and Entering Data: The system shall support the ability to create a record', () => {
    // Admin Login and Project Creation
    cy.loginAdmin();
    DashboardPage.clickNewProject();
    ProjectCreationPage.enterProjectTitle('B.3.14.0100');
    ProjectCreationPage.selectProjectPurpose('Practice / Just for fun');
    ProjectCreationPage.uploadProjectXml('Project_3.14.xml');
    ProjectCreationPage.clickCreateProject();

    // Move Project to Production
    ProjectSetupPage.openProjectSetup();
    ProjectSetupPage.moveToProduction();
    ProjectSetupPage.keepExistingData();
    ProjectSetupPage.confirmMove();
    ProjectSetupPage.verifySuccessMessage();
    cy.disableAutoNumbering();

    // Add Users
    ProjectPage.openUserRightsFromProject();
    UserRightsPage.addUserWithLogging('test_joe');
    cy.contains('test_joe');
    cy.wait(500);
    UserRightsPage.addUserWithoutChecking('test_joe2');
    cy.contains('test_joe2');
    cy.contains('Log out').click();

    // test_joe: Add Record
    cy.loginTestUser();
    DashboardPage.goToMyProjects();
    MyProjectsPage.openProjectByName('B.3.14.0100');
    ProjectSetupPage.openAddEditRecords();
    AddEditRecordsPage.addRecord(7);
    AddEditRecordsPage.addRecordTextValidationEvent1();
    AddEditRecordsPage.saveAndExitForm();
    cy.contains('Record ID 7 successfully added');

    // Verify Logging for Record Creation
    ProjectPage.openLoggingTab();
    LoggingPage.verifyLoggingTableHeaders();
    LoggingPage.verifyLoggingEntry(2, 'test_joe', 'Create record7', "record_id = '7'");

    // Open Record and View Report
    ProjectPage.openRecordStatusDashboard();
    AddEditRecordsPage.openRecord(7);
    cy.contains('Record ID 7').should('be.visible');
    ProjectPage.openDataExportsReportsStats();
    DataExportsReportsAndStatsPage.assertReportRowTitle('1', 'All data (all records and fields');
    cy.get('#table-report_list').contains('button', 'View Report').first().click();
    cy.get('td.dtfc-fixed-left a')
      .filter((_, el) => el.textContent.trim() === '7')
      .should('have.length.at.least', 1);

    // test_joe: Edit Record 1
    ProjectSetupPage.openAddEditRecords();
    AddEditRecordsPage.selectRecord(1);
    AddEditRecordsPage.addRecordTextValidationEvent1();
    TextValidationPage.typeInName('EDIT1');
    TextValidationPage.clickSaveAndExit();
    cy.contains('Record ID 1 successfully edited');
    cy.contains('Log out').click();

    // test_joe2: Edit Record 1
    cy.loginTestUser2();
    DashboardPage.goToMyProjects();
    MyProjectsPage.openProjectByName('B.3.14.0100');
    cy.contains('a', 'View / Edit Records').click();
    cy.contains('Add new record').should('not.exist');
    AddEditRecordsPage.selectRecord(1);
    AddEditRecordsPage.addRecordTextValidationEvent1();
    TextValidationPage.typeInName('EDIT2');
    TextValidationPage.clickSaveAndExit();
    cy.contains('Record ID 1 successfully edited');

    // Verify Logging for Edits
    ProjectPage.openLoggingTab();
    LoggingPage.verifyLoggingTableHeaders();
    LoggingPage.verifyLoggingEntry(1, 'test_joe2', 'Update record1', "name = 'EDIT2'");
    LoggingPage.verifyLoggingEntry(2, 'test_joe', 'Update record1', "name = 'EDIT1'");
  });
});
