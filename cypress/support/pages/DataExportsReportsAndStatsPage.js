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
 assertReportRowTitle(rowNumber, expectedTitle, expectedCharacter) {
  cy.get('#table-report_list tr')
    .filter((index, el) => el.id.startsWith('reprow_')) // Keep all report rows including "ALL", "SELECTED", etc.
    .eq(rowNumber - 1)
    .within(() => {
      cy.get('td').eq(1).should('contain', expectedCharacter)
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

   exportReportCSVByRowNumber(rowNumber, format) {
    cy.get('#table-report_list tr')
      .filter((index, el) => el.id.startsWith('reprow_'))
      .eq(rowNumber - 1)
      .within(() => {
        cy.contains('button', ' Export Data').click();
      });

    cy.get(`input[name="export_format"][value="${format}"]`).check({force:true});
    cy.wait(500)
    cy.get('.ui-dialog-buttonset').within(()=> {
        cy.get('button.ui-button.ui-corner-all.ui-widget').contains('Export Data').click({force:true});
    })
    cy.contains('Data export was successful!')
    if(format == 'spss'){
      return cy.get(`a[href*="FileRepositoryController:download"] img[src*="spss"]`).first().click();
    }
    cy.get('a[href*="FileRepositoryController:download"]').first().click();
  }
    assertCSVHeaders(expectedHeaders) {
  cy.task('getLatestCsv').then(filePath => {
    cy.readFile(filePath, 'utf8').then(csv => {
      const headers = csv.split('\n')[0];
      expectedHeaders.forEach(header => {
        expect(headers).to.include(header);
      });
    });
  });
    }
  }

export default new DataExportsReportsAndStatsPage();
