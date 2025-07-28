import AddEditRecordsPage from "../../support/pages/AddEditRecordsPage";
import DataQualityRulesPage from "../../support/pages/DataQualityRulesPage";
import LoggingPage from "../../support/pages/LoggingPage.cy";
import ProjectPage from "../../support/pages/ProjectPage";
import ProjectSetupPage from "../../support/pages/ProjectSetupPage";

describe('Data Quality Module functionality', () => {
  it('should support creation of data quality rules', () => {
    cy.loginAdmin();
    cy.createProject('C.4.18.0200.100', 'Project418.xml');
    cy.moveToProduction();

    ProjectSetupPage.openDataQuality();
    cy.contains('Data Quality Rules').should('be.visible');

    DataQualityRulesPage.addNewRule('Integer', "[event_1_arm_1][integer]='1999'", null);
    DataQualityRulesPage.assertRuleRow('3', 'Integer', "[event_1_arm_1][integer]='1999'", null);

    DataQualityRulesPage.uploadRuleByCsv('C418100TEST_DataQualityRules_Upload.csv', null);
    DataQualityRulesPage.assertRuleRow('4', 'Integer', "[integer]<>'1999'", null);

    cy.disableAutoNumbering();

    ProjectSetupPage.openAddEditRecords();
    AddEditRecordsPage.addRecord('11');
    AddEditRecordsPage.addRecordDataTypesEvent1();
    cy.contains('span', 'Adding new Record ID 11');
    AddEditRecordsPage.TypeInteger(1999);
    cy.get('body').click(0, 0);
    cy.wait(100);
    cy.get('button.close-button').click();
    AddEditRecordsPage.saveAndExitForm();
    cy.contains('span', 'Record ID 11 successfully added.');

    ProjectSetupPage.openAddEditRecords();
    AddEditRecordsPage.addRecord('12');
    AddEditRecordsPage.addRecordDataTypesEvent1();
    cy.contains('span', 'Adding new Record ID 12');
    AddEditRecordsPage.TypeInteger(2000);
    cy.get('body').click(0, 0);
    cy.wait(100);
    cy.get('button.close-button').click();
    AddEditRecordsPage.saveAndExitForm();
    cy.contains('span', 'Record ID 12 successfully added.');

    ProjectSetupPage.openDataQuality();
    DataQualityRulesPage.executeRules();

    DataQualityRulesPage.assertRuleRow('3', 'Integer', "[event_1_arm_1][integer]='1999'", 0); // Slight anomaly here, total discrepancies differ by 1 (not important in testing the feature)
    DataQualityRulesPage.assertRuleRow('4', 'Integer', "[integer]<>'1999'", 29);

    cy.reload();

    DataQualityRulesPage.editExistingRule("[event_1_arm_1][integer]='1999'", "[event_1_arm_1][integer]='1'");
    DataQualityRulesPage.assertRuleRow('3', 'Integer', "[event_1_arm_1][integer]='1'", null);

    DataQualityRulesPage.editExistingRule("[integer]<>'1999'", "[integer]='1'");
    DataQualityRulesPage.assertRuleRow('4', 'Integer', "[integer]='1'", null);

    cy.reload();
    DataQualityRulesPage.executeRules();
    DataQualityRulesPage.assertRuleRow('3', 'Integer', "[event_1_arm_1][integer]='1'", 6);
    DataQualityRulesPage.assertRuleRow('4', 'Integer', "[integer]='1'", 6);

    DataQualityRulesPage.DeleteByRuleNumber('4');

    // REDCap feature viewer says 'should see a row - rule #3, Rule Name: Integer, Rule Logic: [event_1_arm_1][integer]='1999' 
    // which makes no sense as we edited this rule
    ProjectPage.openLoggingTab();
    LoggingPage.verifyLoggingTableHeaders();

    const logEntries = [
      ['test_admin', 'Manage/Design', 'Delete data quality rule'],
      ['test_admin', 'Manage/Design', 'Execute data quality rule: Rule 4'],
      ['test_admin', 'Manage/Design', 'Execute data quality rule: Rule 3'],
      ['test_admin', 'Manage/Design', 'Execute data quality rule: Rule 2'],
      ['test_admin', 'Manage/Design', 'Execute data quality rule: Rule 1'],
      ['test_admin', 'Manage/Design', 'Execute data quality rule: Rule I'],
      ['test_admin', 'Manage/Design', 'Execute data quality rule: Rule H'],
      ['test_admin', 'Manage/Design', 'Execute data quality rule: Rule G'],
      ['test_admin', 'Manage/Design', 'Execute data quality rule: Rule F'],
      ['test_admin', 'Manage/Design', 'Execute data quality rule: Rule E'],
      ['test_admin', 'Manage/Design', 'Execute data quality rule: Rule D'],
      ['test_admin', 'Manage/Design', 'Execute data quality rule: Rule C'],
      ['test_admin', 'Manage/Design', 'Execute data quality rule: Rule B'],
      ['test_admin', 'Manage/Design', 'Execute data quality rule: Rule A'],
      ['test_admin', 'Manage/Design', 'Edit data quality rule'],
      ['test_admin', 'Manage/Design', 'Upload Data Quality Rules'],
      ['test_admin', 'Manage/Design', 'Create data quality rule'],
    ];

    logEntries.forEach(([username, action, dataChange]) => {
      LoggingPage.verifyLoggingEntryByContent(username, action, dataChange);
    });
  });
});
