class DesignerPage{
    clickEnterDraftModeButton() {
    cy.get('button.btn-defaultrc').contains('Enter Draft Mode').click();
    cy.contains('The project is now in Draft Mode').should('be.visible');
  }
  openDataTypes() {
    cy.get('#formlabel-data_types').click();
  }
   clickEditRadioManualField() {
    cy.get('a.field-action-link[onclick*="openAddQuesForm(\'radio_button_manual\'"]')
      .click();
  }
    typeChoiceLine(choiceLine) {
    cy.get('textarea#element_enum')
      .should('be.visible')
      .type('{enter}' + choiceLine, { delay: 0 });
      cy.contains('button', 'Save').click();
  }
  viewDraftSummary(){
    cy.contains('a', 'View detailed summary of all drafted changes').click();
    cy.contains('Review Drafted Changes').should('be.visible');
  }
  submitChangesForReview(){
    cy.get('input[type="button"][value="Submit Changes for Review"]').click();
    cy.get('button.ui-button.ui-corner-all.ui-widget').contains('Submit').click();
    cy.get('span.ui-dialog-title').should('contain.text', 'Changes Were Made Automatically');
    cy.contains('button', 'Close').click();

  }
  addFieldRadioButtonManual(fieldType, fieldLabel, fieldName){
    cy.get('input#btn-radio_button_manual-f').click();
    cy.get('select#field_type').select(fieldType);
    cy.get('#field_label').type(fieldLabel)
    cy.get('#field_name').type(fieldName);
    cy.wait(1000)
    cy.contains('button', 'Save').click();
    cy.wait(1000)
    cy.contains(fieldLabel).should('be.visible');



  }


}

export default new DesignerPage();