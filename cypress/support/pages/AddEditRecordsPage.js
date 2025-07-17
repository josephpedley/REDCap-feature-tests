// support/pages/recordPage.js

class AddEditRecordPage {
  
  selectRecord(recordNumber) {
    cy.get('select#record').select(recordNumber.toString());
  }

 
}

export default new AddEditRecordPage();
