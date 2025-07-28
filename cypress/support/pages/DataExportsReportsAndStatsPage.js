class DataExportsReportsAndStatsPage {
  createNewReport(reportName) {
    cy.contains('button', ' Create New Report').click();
    cy.get('input[name="__TITLE__"]').type(reportName);
    cy.get('#save-report-btn').click();
    cy.contains('span', 'Your report has been saved!');
  }

  clickViewReportButton() {
    cy.contains('button', 'View report').click();
  }

  clickEditReportButton() {
    cy.contains('button', 'Edit Report').click();
    cy.contains('Edit Existing Report');
  }

  editReportName(reportName) {
    cy.get('input[name="__TITLE__"]').clear().type(reportName);
    cy.get('#save-report-btn').click();
    cy.contains('span', 'Your report has been saved!');
  }

  goToMyReports() {
    cy.contains('span', 'My Reports & Exports').click();
  }

  /**
   * Assert the title of a report row by 1-based row number.
   */
  assertReportRowTitle(rowNumber, expectedTitle) {
    cy.get('#table-report_list tr')
      .not('[id="reprow_ALL"]')
      .not('[id="reprow_SELECTED"]')
      .not('[id="reprow_"]') // Skip special/empty rows
      .filter((index, el) => el.id.startsWith('reprow_'))
      .eq(rowNumber - 1)
      .within(() => {
        cy.get('td').eq(2).should('contain.text', expectedTitle);
      });
  }

  /**
   * Click the "Copy" button for a report by row number, then confirm.
   */
  copyReportByRowNumber(rowNumber) {
    cy.get('#table-report_list tr')
      .not('[id="reprow_ALL"]')
      .not('[id="reprow_SELECTED"]')
      .not('[id="reprow_"]')
      .filter((index, el) => el.id.startsWith('reprow_'))
      .eq(rowNumber - 1)
      .within(() => {
        cy.contains('button', 'Copy').click();
      });

    cy.contains('span', 'COPY REPORT?').should('be.visible');
    cy.contains('button.ok-button', 'Copy').click();
  }

  /**
   * Click the "Delete" button for a report by row number, then confirm.
   */
  deleteReportByRowNumber(rowNumber) {
    cy.get('#table-report_list tr')
      .not('[id="reprow_ALL"]')
      .not('[id="reprow_SELECTED"]')
      .not('[id="reprow_"]')
      .filter((index, el) => el.id.startsWith('reprow_'))
      .eq(rowNumber - 1)
      .within(() => {
        cy.contains('button', 'Delete').click();
      });

    cy.contains('span', 'DELETE REPORT?').should('be.visible');
    cy.contains('button.ok-button', 'Delete').click();
  }
}

export default new DataExportsReportsAndStatsPage();
