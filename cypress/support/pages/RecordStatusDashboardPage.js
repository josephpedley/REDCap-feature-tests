class RecordStatusDashboardPage {

  clickBubbleByIndex(recordId, formName, index = 0) {
    cy.get('table#record_status_table tbody tr')
      .filter(`:has(td.rc-rsd-id-cell a:contains("${recordId}"))`)
      .first()
      .within(() => {
        cy.get('a[href*="' + formName + '"]').then($links => {
          const count = $links.length;
          expect(count, `Found ${count} bubbles for form "${formName}"`).to.be.greaterThan(index);
          cy.wrap($links.eq(index)).click();
        });
      });
  }
  deleteDataForForm(){
    cy.contains('span', 'Delete data for THIS FORM only').click();
    cy.get('.ok-button').contains('Delete data for THIS FORM only').click();
  }
   assertFirstBubbleIsIncomplete(recordId, formName) {
    cy.get('table#record_status_table tbody tr')
      .contains('td.rc-rsd-id-cell a', recordId)
      .parents('tr')
      .within(() => {
        cy.get(`a[href*="page=${formName}"]`).first()
          .find('img.rc-form-menu-icon')
          .should('have.attr', 'src')
          .and('include', 'circle_gray.png');
      });
  }
  assertTableHeaders(expectedHeaders) {
  cy.get('#record_status_table').within(() => {
    expectedHeaders.forEach((header) => {
      cy.contains('th', header).should('be.visible');
    });
  });
}
changeBubbleByLink(bubbleName){
  cy.contains('a', bubbleName).click()
}


}

export default new RecordStatusDashboardPage;
