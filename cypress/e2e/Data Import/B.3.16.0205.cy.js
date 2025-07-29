import DashboardPage from "../../support/pages/DashboardPage";
import DataImportToolPage from "../../support/pages/DataImportToolPage";
import LoggingPage from "../../support/pages/LoggingPage.cy";
import ProjectCreationPage from "../../support/pages/ProjectCreationPage";
import ProjectPage from "../../support/pages/ProjectPage";
import ProjectSetupPage from "../../support/pages/ProjectSetupPage";

describe('Feature: Data Import Upload Functionality', () => {
  it('As a REDCap end user, I want to see that data import is functioning as expected by allowing data to be uploaded in real-time using the CSV template to create and modify records', () => {
    cy.loginAdmin();

    DashboardPage.clickNewProject();
    ProjectCreationPage.enterProjectTitle('B.3.16.0100.100');
    ProjectCreationPage.selectProjectPurpose('Practice / Just for fun');
    ProjectCreationPage.uploadProjectXml('Project_3.16.xml');
    ProjectCreationPage.clickCreateProject();

    ProjectSetupPage.openProjectSetup();
    ProjectSetupPage.moveToProduction();
    ProjectSetupPage.keepExistingData();
    ProjectSetupPage.confirmMove();
    ProjectSetupPage.verifySuccessMessage();

    ProjectPage.openRecordStatusDashboard();
    cy.contains('No records exist yet').should('be.visible')
   

    ProjectPage.openDataImportTool();
    DataImportToolPage.uploadCsvFile('B.3.16.400_DataImport_Rows Corrected.csv');
    cy.contains('DATA DISPLAY TABLE').should('be.visible');
    DataImportToolPage.cancelUpload();
    cy.contains('Data Import Tool').should('be.visible');
    ProjectPage.openRecordStatusDashboard();
    cy.contains('No records exist yet').should('be.visible');
    ProjectPage.openLoggingTab();
    cy.contains('Create record').should('not.exist')
    ProjectPage.openDataImportTool()
    DataImportToolPage.uploadCsvFile('B.3.16.400_DataImport_Rows Corrected.csv');
    cy.contains('DATA DISPLAY TABLE').should('be.visible');
    DataImportToolPage.importCsv();

    ProjectPage.openDataImportTool();
    DataImportToolPage.selectFormat('cols');
    DataImportToolPage.uploadCsvFile('B316200100_ImportTemplate_ImportRecord_Column.csv')
    cy.contains('DATA DISPLAY TABLE').should('be.visible');
    DataImportToolPage.importCsv()

    ProjectPage.openRecordStatusDashboard()
    cy.contains('a', '1').should('be.visible') //Verify columns import
    cy.contains('a', '2').should('be.visible')
    cy.contains('a', '100').should('be.visible') //Verify rows import

    ProjectPage.openLoggingTab()

    LoggingPage.verifyLoggingTableHeaders()
    LoggingPage.verifyLoggingEntry(3, 'test_admin', 'Create record (import)2')
    LoggingPage.verifyLoggingEntry(4, 'test_admin', 'Create record (import)1') //Verify columns import

    LoggingPage.verifyLoggingEntry(5, 'test_admin', 'Update record (import)(Auto calculation)300') //Verify rows import

 

   


  
    




  
  });
});
