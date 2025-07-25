class OpenFieldValidationPage {
  
  disableValidationByLabel(labelText) {
    cy.get('tbody tr').contains('td > b', labelText)
      .parents('tr')
      .within(() => {
        cy.contains('button', 'Disable').click();
      });
  }
    verifyDisabledIconByLabel(label) {
  cy.contains('td', label)
    .parent('tr')
    .find('img[src*="delete.png"]')
    .should('be.visible');
}
     enableValidationByLabel(labelText) {
    cy.get('tbody tr').contains('td > b', labelText)
      .parents('tr')
      .within(() => {
        cy.contains('button', 'Enable').click();
      });
  }
    verifyEnabledIconByLabel(label) {
  cy.contains('td', label)
    .parent('tr')
    .find('img[src*="tick.png"]')
    .should('be.visible');
}

}

export default new OpenFieldValidationPage();
