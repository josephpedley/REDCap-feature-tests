class DicitonaryPage{
    downloadDictionary() {
    cy.contains('button', 'Download Data Dictionary').click();
  }
    uploadDictionary(dictionaryFile){
          cy.get('input[name="uploadedfile"]').attachFile(dictionaryFile);
          cy.get('button#submit').click();
          cy.contains('Your document was uploaded successfully and awaits your confirmation below.').should('be.visible')
          cy.contains('button', 'Commit Changes').click();
          cy.contains('Changes Made Successfully!').should('be.visible');

    }
}
export default new DicitonaryPage();