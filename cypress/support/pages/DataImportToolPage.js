class DataImportToolPage {
  downloadDataImportTemplate() {
    cy.contains('a', 'Download your Data Import Template')
      .should('have.attr', 'href')
      .then(href => {
        const url = `${Cypress.config('baseUrl')}${href}`;
        const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        const filename = `B3160100100_ImportTemplate_${date}.csv`;
        cy.downloadFile(url, 'cypress/downloads', filename);
      });
  }
  uploadCsvFile(file){
    cy.get('#uploadedfile').attachFile(file);
    cy.wait(1000)
    cy.contains('button', 'Upload File').click();
    cy.wait(1000)
    


  }
}

export default new DataImportToolPage();
