// support/pages/recordPage.js

class AddEditRecordPage {
  
  selectRecord(recordNumber) {
    cy.get('select#record').select(recordNumber.toString());
  }
  addRecord(recordNumber){
    cy.get('#inputString')
  .clear()
  .type(recordNumber);
  cy.get('body').click(0, 0);
  cy.wait(500)

  }
  addRecordDataTypesEvent1(){
    // Get the index of the "Event 1" column header
cy.get('td.nowrap a[href*="page=data_types"]').first().click();

  }
  verifySaveChangesOnLeave(){
    cy.contains('Save your changes?').should('be.visible');
    cy.contains('button', 'Save changes and leave');
    cy.contains('button', 'Leave without saving changes');
    cy.contains('button', 'Stay on page') 
  }
  leaveWithoutSavingChanges(){
    cy.contains('button', 'Leave without saving changes').click();

  }
    leaveWithSavingChanges(){
    cy.contains('button', 'Save changes and leave').click();
    
  }
   stayOnPage(){
    cy.contains('button', 'Stay on page').click();
    
  }
  TypeInteger(value) {
  cy.get('input[name="integer"]')
    .type(value.toString());
}
saveAndExitForm(){
  cy.contains('span', 'Save & Exit Form').click();
}

 
}

export default new AddEditRecordPage();
