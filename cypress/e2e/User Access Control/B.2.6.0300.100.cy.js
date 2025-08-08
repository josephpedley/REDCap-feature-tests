import ProjectSetupPage from "../../support/pages/ProjectSetupPage";
import UserRightsPage from "../../support/pages/UserRightsPage";
import DashboardPage from "../../support/pages/DashboardPage";
import MyProjectsPage from "../../support/pages/MyProjectsPage";
import ProjectPage from "../../support/pages/ProjectPage";
import DataExportsReportsAndStatsPage from "../../support/pages/DataExportsReportsAndStatsPage";
import LoggingPage from "../../support/pages/LoggingPage";

describe('B.2.6.0300.100 - Data Export Rights Functionality', () => {
  it('Scenario: B.2.6.0300.100 – should allow instrument-level data export rights to be configured as No Access, De-Identified, Remove All Identifier Fields, or Full Data Set', () => {
    cy.loginAdmin();
    cy.createProject('B.2.6.0300.100', 'Project_1.xml');

    ProjectSetupPage.openUserRights();

    UserRightsPage.openUploadUsersDropdown();
    UserRightsPage.clickUploadUsersCsv();
    UserRightsPage.uploadUserCsv('user_list_for project_1.csv');
    UserRightsPage.confirmUserCsvUploadCsvForProject1();

    UserRightsPage.checkTableRow('—', 'test_admin');

    const userNum = [1, 2, 3, 4];
    const roleKeys = [
      '1_FullRights',
      '2_Edit_RemoveID',
      '3_ReadOnly_Deidentified',
      '4_NoAccess_Noexport',
    ];

    for (let i = 0; i < 4; i++) {
      UserRightsPage.checkTableRow('—', 'test_user' + userNum[i]);
      UserRightsPage.checkTableRow(roleKeys[i], '[No users assigned]');
    }

    UserRightsPage.assignUserToRole('test_user1', '1_FullRights');
    cy.wait(1000);
    UserRightsPage.checkTableRow('1_FullRights', 'test_user1');

    UserRightsPage.assignUserToRole('test_user2', '2_Edit_RemoveID');
    cy.wait(1000);
    UserRightsPage.checkTableRow('2_Edit_RemoveID', 'test_user2');

    UserRightsPage.assignUserToRole('test_user3', '3_ReadOnly_Deidentified');
    cy.wait(1000);
    UserRightsPage.checkTableRow('3_ReadOnly_Deidentified', 'test_user3');

    UserRightsPage.assignUserToRole('test_user4', '4_NoAccess_Noexport');
    cy.wait(1000);
    UserRightsPage.checkTableRow('4_NoAccess_Noexport', 'test_user4');

    cy.contains('Log out').click();

    // Test user 1
    cy.loginTestUserImp(1);
    DashboardPage.goToMyProjects();
    MyProjectsPage.openProjectByName('B.2.6.0300.100');
    ProjectPage.openDataExportsReportsStats();
    cy.contains('All data (all records and fields)').should('be.visible');
    DataExportsReportsAndStatsPage.exportReportCSVByRowNumber(1, 'csvraw');

    const expectedHeaders = [
      "record_id", "redcap_event_name", "redcap_repeat_instrument", "redcap_repeat_instance", "redcap_data_access_group", "redcap_survey_identifier",
      "name", "email", "ptname", "text_validation_complete", "textbox", "text2", "notesbox",
      "radio", "radio_button_manual", "multiple_radio_auto", "multiple_dropdown_manual", "multiple_dropdown_auto",
      "checkbox___1", "checkbox___2", "checkbox___3",
      "calc_test", "calculated_field", "required", "identifier", "identifier_2", "edit_field",
      "date_ymd", "date_mdy", "date_dmy",
      "time_hhmmss", "time_hhmm", "time_mmss",
      "datetime_ymd_hmss", "datetime_ymd_hm", "datetime_mdy_hmss", "datetime_dmy_hmss",
      "integer", "number", "number_1_period", "number_1_comma",
      "letters", "mrn_10_digits", "mrn", "ssn",
      "phone_north_america", "phone_australia", "phone_uk",
      "zipcode_us", "postal_5", "postal_code_australia", "postal_code_canada",
      "signature", "signature_consent",
      "file_upload", "dob",
      "survey_timestamp", "name_survey", "email_survey", "survey_complete",
      "name_consent", "email_consent", "consent_complete",
      "data_types_complete"
    ];

    DataExportsReportsAndStatsPage.assertCSVHeaders(expectedHeaders);
    cy.reload();
    ProjectPage.openLoggingTab();
    LoggingPage.verifyLoggingEntryByContent('test_user1', 'Data export', 'Download exported data file (CSV raw)');
    cy.contains('Log out').click();

    // Test user 2
    cy.loginTestUserImp(2);
    DashboardPage.goToMyProjects();
    MyProjectsPage.openProjectByName('B.2.6.0300.100');
    ProjectPage.openDataExportsReportsStats();
    cy.contains('All data (all records and fields)').should('be.visible');
    DataExportsReportsAndStatsPage.exportReportCSVByRowNumber(1, 'csvraw');

    const expectedHeaders2 = [
      "record_id", "redcap_event_name", "redcap_repeat_instrument", "redcap_repeat_instance", "redcap_data_access_group",
      "name", "email", "text_validation_complete", "ptname", "textbox", "text2", "radio", "notesbox",
      "multiple_dropdown_manual", "multiple_dropdown_auto", "multiple_radio_auto", "radio_button_manual",
      "checkbox___1", "checkbox___2", "checkbox___3", "calc_test", "calculated_field", "signature", "file_upload",
      "required", "edit_field", "date_ymd", "date_mdy", "date_dmy", "time_hhmmss", "time_hhmm", "time_mmss",
      "datetime_ymd_hmss", "datetime_ymd_hm", "datetime_mdy_hmss", "datetime_dmy_hmss", "integer", "number",
      "number_1_period", "number_1_comma", "letters", "mrn_10_digits", "mrn", "ssn", "phone_north_america",
      "phone_australia", "phone_uk", "zipcode_us", "postal_5", "postal_code_australia", "postal_code_canada",
      "data_types_complete", "survey_timestamp", "name_survey", "email_survey", "survey_complete",
      "name_consent", "email_consent", "dob", "signature_consent", "consent_complete"
    ];

    DataExportsReportsAndStatsPage.assertCSVHeaders(expectedHeaders2);
    cy.reload();
    cy.contains('Log out').click();

    // Test user 3
    cy.loginTestUserImp(3);
    DashboardPage.goToMyProjects();
    MyProjectsPage.openProjectByName('B.2.6.0300.100');
    ProjectPage.openDataExportsReportsStats();
    cy.contains('All data (all records and fields)').should('be.visible');
    DataExportsReportsAndStatsPage.exportReportCSVByRowNumber(1, 'csvraw');

    const expectedHeaders3 = [
      "record_id", "redcap_event_name", "redcap_repeat_instrument", "redcap_repeat_instance", "redcap_data_access_group",
      "email", "text_validation_complete", "radio", "multiple_dropdown_manual", "multiple_dropdown_auto",
      "multiple_radio_auto", "radio_button_manual", "checkbox___1", "checkbox___2", "checkbox___3",
      "calc_test", "calculated_field", "signature", "file_upload",
      "date_ymd", "date_mdy", "date_dmy", "time_hhmmss", "time_hhmm", "time_mmss",
      "datetime_ymd_hmss", "datetime_ymd_hm", "datetime_mdy_hmss", "datetime_dmy_hmss",
      "integer", "number", "number_1_period", "number_1_comma", "letters",
      "mrn_10_digits", "mrn", "ssn", "phone_north_america", "phone_australia", "phone_uk",
      "zipcode_us", "postal_5", "postal_code_australia", "postal_code_canada",
      "data_types_complete", "survey_timestamp", "email_survey", "survey_complete",
      "email_consent", "dob", "signature_consent", "consent_complete"
    ];

    DataExportsReportsAndStatsPage.assertCSVHeaders(expectedHeaders3);
    cy.reload();
    cy.contains('Log out').click();

    // Test user 4
    cy.loginTestUserImp(4);
    DashboardPage.goToMyProjects();
    MyProjectsPage.openProjectByName('B.2.6.0300.100');
    ProjectPage.openDataExportsReportsStats();

    cy.contains('button', ' View Report').should('be.visible');
    cy.contains('button', 'Export Data').should('not.exist');
  });
});
