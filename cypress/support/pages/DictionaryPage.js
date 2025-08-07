class DicitonaryPage{
    downloadDictionary() {
    cy.contains('button', 'Download Data Dictionary').click();
  }
    uploadDictionary(dictionaryFile){
          cy.get('input[name="uploadedfile"]').attachFile(dictionaryFile);
          cy.wait(500)
          cy.get('button#submit').click({force:true});
          cy.wait(500)
          cy.contains('Your document was uploaded successfully and awaits your confirmation below.').should('be.visible')
          cy.contains('button', 'Commit Changes').click();
          cy.contains('Changes Made Successfully!').should('be.visible');

    }
    uploadBadDicitionary(dictionaryFile){
      cy.get('input[name="uploadedfile"]').attachFile(dictionaryFile);
          cy.wait(500)
          cy.get('button#submit').click({force:true});
          cy.contains('Errors found in your Data Dictionary').should('be.visible')
          cy.get('span[data-rc-lang="config_functions_40"]').first().click();
          cy.contains('STEP 1').should('be.visible');
          cy.contains('STEP 2').should('be.visible');
          cy.contains('STEP 3').should('be.visible');


    }
}
export default new DicitonaryPage();