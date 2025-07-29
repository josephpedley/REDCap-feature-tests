class DataImportToolPage {
 
  uploadCsvFile(file){
    cy.get('#uploadedfile').attachFile(file);
    cy.wait(1000)
    cy.contains('button', 'Upload File').click();
    cy.wait(1000)
  }
  downloadDataImportTemplate(){
    cy.contains('a', 'Download your Data Import Template').click()
  }
  downloadColumnFormat(){
    cy.contains('a', 'column format').should('be.visible').click()
  }
  cancelUpload(){
    cy.contains('a', 'Cancel').click();
  }
  importCsv(){
    cy.contains('button', 'Import Data').click();
    cy.contains('Import Successful!')
  }
  selectFormat(format){ //Cols or rows
    cy.get('select[name="format"]').select(format); 


  }

}

export default new DataImportToolPage();
