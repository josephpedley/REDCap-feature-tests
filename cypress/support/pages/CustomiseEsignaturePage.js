class openCustomiseEsignaturePage {
 assertTableRowContent(rowId, expected) {

  cy.get(`#row-${rowId}`).within(() => {
    if (expected.checkboxChecked !== undefined) {
      cy.get(`input[type="checkbox"]`).should(expected.checkboxChecked ? 'be.checked' : 'not.be.checked');
    }
    if (expected.nameText) {
      cy.get(`[id^="name-"]`).should('contain.text', expected.nameText);
    }
    if (expected.textareaValue !== undefined) {
      cy.get(`#cell-${rowId}`).should('contain.text', expected.textareaValue);
    }
    if (expected.saveButtonExists !== undefined) {
      cy.get('input[type="button"][value="Save"]').should(expected.saveButtonExists ? 'exist' : 'not.exist');
    }
  });
}
enterCustomTextInRow(customText, rowId){
    cy.get(`#${rowId}`).within(() => {
        cy.get('textarea').clear().type(customText)
        cy.get('input[type="button"][value="Save"]').click()
    })
}
editInstrumentById(rowId, customText){
  cy.get(`#row-${rowId} a[onclick*="editLockLabel"]`).click();
  cy.get(`#row-${rowId}`).within(() => {
        cy.get('textarea').clear().type(customText)
        cy.get('input[type="button"][value="Save"]').click()
    })

}
deleteInstrumentById(rowId){
  cy.get(`#row-${rowId} a[onclick*="delLabel"]`).click();
}

}

export default new openCustomiseEsignaturePage();