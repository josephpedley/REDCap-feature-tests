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
  createForm(formName){
    cy.get('div.fs12').find('button').contains('Create').click();
    cy.get('td#new-consent').find('button').click();
    cy.contains('span', 'New instrument name:')
    cy.get('#new_form-consent').type(formName);
    cy.get('#new-consent input[type="button"][value="Create"]').click();
    cy.contains('span', 'SUCCESS!').should('be.visible')
    cy.contains('button', 'Close').click();

  }
  clickButtonSaveAndVerifySuccess(rowNumber = 1, buttonLabel) {
  // Click the button on the instrument row
  cy.get(`#row_${rowNumber}`).contains('button', buttonLabel).click();
  
  // Click Save Changes button
  cy.contains('button', 'Save Changes').click();
  
  // Verify the success message appears
  cy.get('#saveSurveyMsg')
    .contains('Your survey settings were successfully saved!')
    .should('be.visible');
}
clickDeleteSurveySettings(rowNumber) {
  cy.get(`#row_${rowNumber}`).contains('button', 'Survey settings').click();
  cy.contains('button', 'Delete Survey Settings').click();
  cy.get('button.ok-button').contains('Delete Survey Settings').click();
  cy.get('button.close-button').click();
}
assertDropdown(expectedOptions){
  cy.get('input[type="button"][value="Add Field"]').first().click();
  cy.get('select#field_type').select("Text Box (Short Text, Number, Date/Time, ...)");
   cy.get('select#val_type')
    .should('be.visible')
    .find('option')
    .then($options => {
      const actualOptions = [...$options].map(opt => opt.textContent.trim());
      expect(actualOptions).to.deep.equal(expectedOptions);
    });
    cy.get('button.ui-button.ui-corner-all.ui-widget').contains('Cancel').click();



}



}

export default new DesignerPage();