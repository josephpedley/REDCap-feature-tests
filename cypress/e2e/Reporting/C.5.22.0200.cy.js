import DataExportsReportsAndStatsPage from "../../support/pages/DataExportsReportsAndStatsPage";
import ProjectPage from "../../support/pages/ProjectPage";

describe('Reporting functionality', () => {
  it('should allow the user to create, modify, copy, and delete reports', () => {
    // Setup and login
    cy.loginAdmin();
    cy.createProject('C.5.22.0200.100', 'Project_1.xml');
    cy.moveToProduction();

    // Navigate to reports
    ProjectPage.openDataExportsReportsStats();

    // Create a new report
    DataExportsReportsAndStatsPage.createNewReport('C.5.22.0200.100 REPORT');
    DataExportsReportsAndStatsPage.clickViewReportButton();
    cy.contains('C.5.22.0200.100 REPORT');

    // Edit report name to REPORT_EDIT
    DataExportsReportsAndStatsPage.clickEditReportButton();
    cy.contains('C.5.22.0200.100 REPORT');
    DataExportsReportsAndStatsPage.editReportName('C.5.22.0200.100 REPORT_EDIT');
    DataExportsReportsAndStatsPage.clickViewReportButton();
    cy.contains('C.5.22.0200.100 REPORT_EDIT');

    // Edit again to REPORT_EDIT2
    DataExportsReportsAndStatsPage.clickEditReportButton();
    cy.contains('C.5.22.0200.100 REPORT_EDIT');
    DataExportsReportsAndStatsPage.editReportName('C.5.22.0200.100 REPORT_EDIT2');
    DataExportsReportsAndStatsPage.clickViewReportButton();
    cy.contains('C.5.22.0200.100 REPORT_EDIT2');

    // Go back to reports list and verify rows
    DataExportsReportsAndStatsPage.goToMyReports();
    DataExportsReportsAndStatsPage.assertReportRowTitle(4, 'C.5.22.0200.100 REPORT_EDIT2');

    // Copy the report and verify copy appears
    DataExportsReportsAndStatsPage.copyReportByRowNumber(2);
    DataExportsReportsAndStatsPage.assertReportRowTitle(4, 'C.5.22.0200.100 REPORT_EDIT2');
    DataExportsReportsAndStatsPage.assertReportRowTitle(5, 'C.5.22.0200.100 REPORT_EDIT2 (copy)');

    // Delete the original and verify the copy moved up
    DataExportsReportsAndStatsPage.deleteReportByRowNumber(2);
    DataExportsReportsAndStatsPage.assertReportRowTitle(4, 'C.5.22.0200.100 REPORT_EDIT2 (copy)');
  });
});
