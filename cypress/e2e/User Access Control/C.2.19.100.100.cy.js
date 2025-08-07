import CustomiseEsignaturePage from "../../support/pages/CustomiseEsignaturePage";
import ProjectPage from "../../support/pages/ProjectPage";
import LoggingPage from "../../support/pages/LoggingPage.cy";
import RecordStatusDashboardPage from "../../support/pages/RecordStatusDashboardPage";

describe('C.2.19.100.100 - E-signature and Locking Management UI', () => {
  it('Scenario: C.2.19.100.100 – should display empty locked and e-signed status for all records when no actions have been taken', () => {
    cy.loginAdmin();
    cy.createProject('C.2.19.100.100', 'Project_1.xml');
    cy.moveToProduction();
    ProjectPage.openCustomiseEsignatures();

    CustomiseEsignaturePage.assertTableRowContent('text_validation', { checkboxChecked: true, nameText: 'Text Validation', textareaValue: '', saveButtonExists: true });
    CustomiseEsignaturePage.assertTableRowContent('data_types', { checkboxChecked: true, nameText: 'Data Types', textareaValue: '', saveButtonExists: true });
    CustomiseEsignaturePage.assertTableRowContent('survey', { checkboxChecked: true, nameText: 'Survey', textareaValue: '', saveButtonExists: true });
    CustomiseEsignaturePage.assertTableRowContent('consent', { checkboxChecked: true, nameText: 'Consent', textareaValue: '', saveButtonExists: true });

    CustomiseEsignaturePage.enterCustomTextInRow('Test custom text', 'row-text_validation');
    cy.wait(500);

    CustomiseEsignaturePage.assertTableRowContent('text_validation', { checkboxChecked: true, nameText: 'Text Validation', textareaValue: 'Test custom text', saveButtonExists: false });
    CustomiseEsignaturePage.assertTableRowContent('data_types', { checkboxChecked: true, nameText: 'Data Types', textareaValue: '', saveButtonExists: true });
    CustomiseEsignaturePage.assertTableRowContent('survey', { checkboxChecked: true, nameText: 'Survey', textareaValue: '', saveButtonExists: true });
    CustomiseEsignaturePage.assertTableRowContent('consent', { checkboxChecked: true, nameText: 'Consent', textareaValue: '', saveButtonExists: true });

    CustomiseEsignaturePage.enterCustomTextInRow('Test custom text', 'row-data_types');
    cy.wait(500);

    CustomiseEsignaturePage.assertTableRowContent('text_validation', { checkboxChecked: true, nameText: 'Text Validation', textareaValue: 'Test custom text', saveButtonExists: false });
    CustomiseEsignaturePage.assertTableRowContent('data_types', { checkboxChecked: true, nameText: 'Data Types', textareaValue: 'Test custom text', saveButtonExists: false });
    CustomiseEsignaturePage.assertTableRowContent('survey', { checkboxChecked: true, nameText: 'Survey', textareaValue: '', saveButtonExists: true });
    CustomiseEsignaturePage.assertTableRowContent('consent', { checkboxChecked: true, nameText: 'Consent', textareaValue: '', saveButtonExists: true });

    ProjectPage.openLoggingTab();
    LoggingPage.verifyLoggingEntry(1, 'test_admin', 'Manage/Design', 'Customize record locking');
    LoggingPage.verifyLoggingEntry(2, 'test_admin', 'Manage/Design', 'Customize record locking');

    ProjectPage.openRecordStatusDashboard();
    RecordStatusDashboardPage.clickBubbleByIndex(1, 'text_validation');
    cy.contains('Text Validation').should('be.visible');
    cy.contains('Test custom text').should('be.visible');

    RecordStatusDashboardPage.changeBubbleByLink('Data Types');
    cy.contains('Data Types').should('be.visible');
    cy.contains('Test custom text').should('be.visible');

    ProjectPage.openCustomiseEsignatures();
    CustomiseEsignaturePage.editInstrumentById('text_validation', 'New custom text');

    CustomiseEsignaturePage.assertTableRowContent('text_validation', { checkboxChecked: true, nameText: 'Text Validation', textareaValue: 'New custom text', saveButtonExists: false });
    CustomiseEsignaturePage.assertTableRowContent('data_types', { checkboxChecked: true, nameText: 'Data Types', textareaValue: 'Test custom text', saveButtonExists: false });
    CustomiseEsignaturePage.assertTableRowContent('survey', { checkboxChecked: true, nameText: 'Survey', textareaValue: '', saveButtonExists: true });
    CustomiseEsignaturePage.assertTableRowContent('consent', { checkboxChecked: true, nameText: 'Consent', textareaValue: '', saveButtonExists: true });

    CustomiseEsignaturePage.deleteInstrumentById('data_types');

    CustomiseEsignaturePage.assertTableRowContent('text_validation', { checkboxChecked: true, nameText: 'Text Validation', textareaValue: 'New custom text', saveButtonExists: false });
    CustomiseEsignaturePage.assertTableRowContent('data_types', { checkboxChecked: true, nameText: 'Data Types', textareaValue: '', saveButtonExists: true });
    CustomiseEsignaturePage.assertTableRowContent('survey', { checkboxChecked: true, nameText: 'Survey', textareaValue: '', saveButtonExists: true });
    CustomiseEsignaturePage.assertTableRowContent('consent', { checkboxChecked: true, nameText: 'Consent', textareaValue: '', saveButtonExists: true });

    ProjectPage.openLoggingTab();
    for (let i = 1; i < 5; i++) {
      LoggingPage.verifyLoggingEntry(i, 'test_admin', 'Manage/Design', 'Customize record locking');
    }

    ProjectPage.openRecordStatusDashboard();
    RecordStatusDashboardPage.clickBubbleByIndex(1, 'text_validation');
    cy.contains('Text Validation').should('be.visible');
    cy.contains('New custom text').should('be.visible');

    RecordStatusDashboardPage.changeBubbleByLink('Data Types');
    cy.contains('Data Types').should('be.visible');
    cy.contains('Lock this instrument?').should('be.visible');
  });
});
