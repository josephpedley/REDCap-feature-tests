import DataExportsReportsAndStatsPage from "../../support/pages/DataExportsReportsAndStatsPage";
import ProjectPage from "../../support/pages/ProjectPage";
import UserRightsPage from "../../support/pages/UserRightsPage";

describe('B.5.21.0600.100 Restrict users from exporting data', () => {
  it('should restrict users from exporting data as expected', () => {
    // Step 1: Login and create project
    cy.loginTestUser();
    cy.createProject('B.5.21.0600.100', 'Project_5.21.xml');

    // Step 2: Open Export page and check report title
    ProjectPage.openDataExportsReportsStats();
    DataExportsReportsAndStatsPage.assertReportRowTitle(1, 'All data (all records and fields', 'A');

    // Step 3: Export data and check headers
    DataExportsReportsAndStatsPage.exportReportCSVByRowNumber(1);
    const expectedHeaders = [
      'record_id', 'redcap_repeat_instrument', 'redcap_repeat_instance',
      'redcap_data_access_group', 'redcap_survey_identifier', 'data_types_timestamp',
      'ptname', 'textbox', 'radio', 'notesbox', 'identifier', 'identifier_2',
      'date_ymd', 'datetime_ymd_hmss', 'data_types_complete'
    ];
    DataExportsReportsAndStatsPage.assertCSVHeaders(expectedHeaders);

    // Step 4: Assign user role that restricts export access
    cy.reload();
    ProjectPage.openUserRightsFromProject();
    UserRightsPage.assignUserToRole('test_joe', '4_NoAccess_Noexport');
    cy.wait(500);
    UserRightsPage.checkTableRow('4_NoAccess_Noexport', 'test_joe');

    // Step 5: Confirm export button is no longer visible
    ProjectPage.openDataExportsReportsStats();
    DataExportsReportsAndStatsPage.assertReportRowTitle(1, 'All data (all records and fields', 'A');
    cy.contains('button', 'Export Data').should('not.exist');
  });
});
