import DataExportsReportsAndStatsPage from "../../support/pages/DataExportsReportsAndStatsPage";
import ProjectPage from "../../support/pages/ProjectPage";

describe('B.5.21.0200.100 Export Data Format Options', () => {
  it('verifies that all supported export formats (CSV, SPSS, SAS, R, STATA, CDISC ODM) are visible and selectable in the user interface', () => {
    cy.loginTestUser();
    cy.createProject('B.5.21.0200', 'Project_1.xml');

    // Step 1: Open export page and assert report title
    ProjectPage.openDataExportsReportsStats();
    DataExportsReportsAndStatsPage.assertReportRowTitle(1, 'All data (all records and fields', 'A');

    // Step 2: Export raw CSV
    DataExportsReportsAndStatsPage.exportReportCSVByRowNumber(1, 'csvraw');
    cy.task('getLatestCsv').then(filePath => {
      expect(filePath).to.not.be.null;
      expect(filePath.split(/[\\/]/).pop()).to.match(/^B5210200_DATA_\d{4}-\d{2}-\d{2}_\d{4}\.csv$/);
    });
    cy.reload();

    // Step 3: Export labeled CSV and verify headers
    DataExportsReportsAndStatsPage.exportReportCSVByRowNumber(1, 'csvlabels');
    const expectedHeaders = [
      "Record ID", "Event Name", "Repeat Instrument", "Repeat Instance", "Data Access Group", "Survey Identifier",
      "Name", "Email", "Complete?", "Name", "Text box", "Text2", "radio", "Notes box",
      "Multiple Choice Dropdown Manual", "Multiple Choice dropdown Auto", "Radio Button Auto", "Radio Button Manual",
      "Checkbox (choice=Checkbox1)", "Checkbox (choice=Checkbox2)", "Checkbox (choice=Checkbox3)",
      "Calc Test", "Calculated Field", "Signature", "File Upload", "Required", "Identifier", "Identifier",
      "Edit Field", "date YMD", "date MDY", "date DMY", "time HH:MM:SS", "time HH:M", "time MM:SS",
      "datetime YMD HMSS", "datetime YMD HM", "datetime MDY HMSS", "datetime DMY HMSS",
      "Integer ", "Numbers", "Numbers 1 decimal place - period as decimal ",
      "Numbers 1 decimal place - comma as decimal ", "Letters only", "MRN (10 Digits)",
      "MRN (generic)", "Social Security Number (US)", "Phone (North America)", "Phone (Australia)", "Phone (UK)",
      "Zipcode (US)", "Postal code 5 (France)", "Postal Code (Australia)", "Postal Code (Canada)",
      "Complete?", "Survey Timestamp", "Name", "Email", "Complete?", "Survey Timestamp",
      "Name", "Email", "DOB", "Signature ", "Complete?"
    ];
    DataExportsReportsAndStatsPage.assertCSVHeaders(expectedHeaders);
    cy.reload();

    // Step 4: Export SPSS
    DataExportsReportsAndStatsPage.exportReportCSVByRowNumber(3, 'spss');
    cy.task('getLatestCsv').then(filePath => {
      expect(filePath).to.not.be.null;
      expect(filePath.split(/[\\/]/).pop()).to.match(/^B5210200-TestReport_SPSS_\d{4}-\d{2}-\d{2}_\d{4}\.sps$/);
    });
    cy.reload();

    // Step 5: Export SAS
    DataExportsReportsAndStatsPage.exportReportCSVByRowNumber(3, 'sas');
    cy.task('getLatestCsv').then(filePath => {
      expect(filePath).to.not.be.null;
      expect(filePath.split(/[\\/]/).pop()).to.match(/^B5210200-TestReport_SAS_\d{4}-\d{2}-\d{2}_\d{4}\.sas$/);
    });
    cy.reload();

    // Step 6: Export R
    DataExportsReportsAndStatsPage.exportReportCSVByRowNumber(1, 'r');
    cy.task('getLatestCsv').then(filePath => {
      expect(filePath).to.not.be.null;
      expect(filePath.split(/[\\/]/).pop()).to.match(/^B5210200_R_\d{4}-\d{2}-\d{2}_\d{4}\.r$/);
    });
    cy.reload();

    // Step 7: Export STATA
    DataExportsReportsAndStatsPage.exportReportCSVByRowNumber(3, 'stata');
    cy.task('getLatestCsv').then(filePath => {
      expect(filePath).to.not.be.null;
      expect(filePath.split(/[\\/]/).pop()).to.match(/^B5210200-TestReport_STATA_\d{4}-\d{2}-\d{2}_\d{4}\.do$/);
    });
    cy.reload();

    // Step 8: Export CDISC ODM (XML)
    DataExportsReportsAndStatsPage.exportReportCSVByRowNumber(1, 'odm');
    cy.task('getLatestCsv').then(filePath => {
      expect(filePath).to.not.be.null;
      expect(filePath.split(/[\\/]/).pop()).to.match(/^B5210200_CDISC_ODM_\d{4}-\d{2}-\d{2}_\d{4}\.xml$/);
    });
    cy.reload();
  });
});
