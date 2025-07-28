import DashboardPage from "../../support/pages/DashboardPage";
import DataImportToolPage from "../../support/pages/DataImportToolPage";
import ProjectCreationPage from "../../support/pages/ProjectCreationPage";
import ProjectPage from "../../support/pages/ProjectPage";
import ProjectSetupPage from "../../support/pages/ProjectSetupPage";

describe('Data Import Template Downloads', () => {
  it('should allow the user to download both row-based and column-based CSV templates', () => {
    // Login and project creation
    cy.loginAdmin();
    DashboardPage.clickNewProject();
    ProjectCreationPage.enterProjectTitle('B.3.16.0100.100');
    ProjectCreationPage.selectProjectPurpose('Practice / Just for fun');
    ProjectCreationPage.uploadProjectXml('Project_3.16.xml');
    ProjectCreationPage.clickCreateProject();

    // Move project to production
    ProjectSetupPage.openProjectSetup();
    ProjectSetupPage.moveToProduction();
    ProjectSetupPage.keepExistingData();
    ProjectSetupPage.confirmMove();
    ProjectSetupPage.verifySuccessMessage();

    // =============================
    // Row-Based CSV Template
    // =============================
    ProjectPage.openDataImportTool();
    DataImportToolPage.downloadDataImportTemplate();

    cy.wait(1000); // Wait for file to finish downloading

    const expectedRowHeaders = [
      'record_id', 'name', 'email', 'text_validation_complete', 'ptname', 'bdate', 'role',
      'notesbox', 'multiple_dropdown_auto', 'multiple_dropdown_manual', 'multiple_radio_auto',
      'radio_button_manual', 'checkbox___1', 'checkbox___2', 'checkbox___3', 'required',
      'identifier_ssn', 'identifier_phone', 'slider', 'date_time_hh_mm', 'date_time_hh_mm_ss',
      'data_types_complete', 'data_dictionary_form_complete', 'phone', 'demo_branching_complete', ''
    ];

    cy.task('getLatestCsv').then((filePath) => {
      expect(filePath, 'Downloaded file path').to.not.be.null;

      const fileName = filePath.split(/[\\/]/).pop();
      cy.log(`Checking filename: ${fileName}`);
      expect(fileName).to.match(/^B3160100100_ImportTemplate.*\.csv$/);

      cy.readFile(filePath).then((csvContent) => {
        const lines = csvContent.split('\n');
        const actualHeaders = lines[0]
          .split(',')
          .map(h => h.trim().replace(/^"|"$/g, ''));

        expect(actualHeaders.slice(0, expectedRowHeaders.length)).to.deep.equal(expectedRowHeaders);
      });
    });

    // =============================
    // Column-Based CSV Template
    // =============================
    DataImportToolPage.downloadColumnFormat();

    const expectedColumnHeaders = [
      'Variable / Field Name',
      'record_id',
      'name',
      'email',
      'text_validation_complete',
      'ptname',
      'bdate',
      'role',
      'notesbox',
      'multiple_dropdown_auto',
      'multiple_dropdown_manual',
      'multiple_radio_auto',
      'radio_button_manual',
      'checkbox___1',
      'checkbox___2',
      'checkbox___3',
      'required',
      'identifier_ssn',
      'identifier_phone',
      'slider',
      'date_time_hh_mm',
      'date_time_hh_mm_ss',
      'data_types_complete',
      'data_dictionary_form_complete',
      'phone',
      'demo_branching_complete'
    ];

    cy.task('getLatestCsv').then((filePath) => {
      expect(filePath, 'Downloaded file path').to.not.be.null;

      const fileName = filePath.split(/[\\/]/).pop();
      expect(fileName).to.match(/^B3160100100_ImportTemplate.*\.csv$/);

      cy.readFile(filePath, { timeout: 10000 }).then((csvContent) => {
        const lines = csvContent
          .split('\n')
          .map(l => l.replace(/\r/g, '').trim())
          .filter(Boolean); 

        const firstColumnValues = lines.map(line => {
          const [firstCol] = line.split(',');
          return firstCol?.replace(/^"|"$/g, '').trim();
        });

        expect(firstColumnValues).to.deep.equal(expectedColumnHeaders);
      });
    });
  });
});
