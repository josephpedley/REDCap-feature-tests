import LoggingPage from "../../support/pages/LoggingPage.cy";
import ProjectPage from "../../support/pages/ProjectPage";

describe('User Interface: Logging module audit trail export', () => {
  it('should allow the user to download and verify the logging audit trail CSV', () => {
    // Log in and set up the project
    cy.loginAdmin();
    cy.createProject('B.2.23.0200.100', 'Project_1.xml');
    cy.moveToProduction();

    // Navigate to the Logging tab and trigger the CSV download
    ProjectPage.openLoggingTab();
    LoggingPage.downloadAllLogging();

    // Wait to ensure the file is downloaded (adjust as needed)
    cy.wait(1000);

    // Get the most recently downloaded CSV file and verify its headers
    cy.task('getLatestCsv').then((filePath) => {
      expect(filePath, 'File path should not be null').to.not.be.null;

      cy.readFile(filePath, { log: false }).then((csv) => {
        const headers = csv
          .split('\n')[0]                         // First row (header)
          .split(',')                             // Split by comma
          .map(h => h.trim().replace(/^"|"$/g, '')); // Remove quotes and trim

        expect(headers).to.include.members([
          'Time / Date',
          'Username',
          'Action',
          'List of Data Changes OR Fields Exported',
          'Record'
        ]);
      });
    });
  });
});
