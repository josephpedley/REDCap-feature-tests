import DashboardPage from "../../support/pages/DashboardPage";
import DictionaryPage from "../../support/pages/DictionaryPage";
import ProjectCreationPage from "../../support/pages/ProjectCreationPage";
import ProjectPage from "../../support/pages/ProjectPage";
import ProjectSetupPage from "../../support/pages/ProjectSetupPage";
import LoggingPage from "../../support/pages/LoggingPage.cy";

describe('B.6.7.0100.100 Data dictionary export/import function', () => {
  it('allows users to export and import the data dictionary to support form creation', () => {
    cy.loginAdmin();

    DashboardPage.clickNewProject();
    ProjectCreationPage.enterProjectTitle('B.6.7.0100.100');
    ProjectCreationPage.selectProjectPurpose('Practice / Just for fun');
    ProjectCreationPage.clickCreateProject();

    ProjectSetupPage.openDictionary();
    DictionaryPage.downloadDictionary();

    cy.task('getLatestCsv').then(filePath => {
      cy.readFile(filePath).then(csv => {
        expect(csv).to.include('"Variable / Field Name","Form Name","Section Header","Field Type","Field Label"');
        expect(csv).to.include('record_id,form_1,,text,"Record ID"');
      });
    });

    ProjectSetupPage.openDictionary();
    DictionaryPage.uploadDictionary('Project1xml_DataDictionary.csv');

    ProjectPage.openDesignerTab();
    cy.contains('span', 'Text Validation').should('exist');
    cy.contains('Consent').should('exist');

    ProjectPage.openLoggingTab();
    LoggingPage.verifyLoggingEntryByContent('test_admin', 'Manage/Design', 'Upload data dictionary');

    ProjectSetupPage.openDictionary();
    DictionaryPage.uploadDictionary('Data Dictionary File 2.csv');

    cy.contains('span', 'Text Validation').should('exist');
    cy.contains('Consent').should('not.exist');

    ProjectPage.openLoggingTab();
    LoggingPage.verifyLoggingEntryByContent('test_admin', 'Manage/Design', 'Upload data dictionary');

    ProjectSetupPage.openDictionary();
    DictionaryPage.uploadBadDicitionary('Data Dictionary File 3.csv');

    ProjectPage.openLoggingTab();
    LoggingPage.verifyLoggingEntryByContent('test_admin', 'Manage/Design', 'Upload data dictionary');
  });
});
