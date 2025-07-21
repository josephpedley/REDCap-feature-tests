 class TextValidationPage{
    clickSaveAndExit() {
    cy.contains('Save & Exit').click();
  }

 }
 export default new TextValidationPage();
 