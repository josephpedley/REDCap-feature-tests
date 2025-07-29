 class TextValidationPage{
    clickSaveAndExit() {
    cy.contains('Save & Exit').click();
  }
  typeInName(name){
    cy.get('input[name="name"]').clear().type(name);
  }

 }
 export default new TextValidationPage();
 