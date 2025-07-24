class LoggingPage {
  verifyLoggingTableHeaders() {
    cy.get('table.form_border tr').first().within(() => {
      cy.get('td').eq(1).should('contain.text', 'Username');
      cy.get('td').eq(2).should('contain.text', 'Action');
      cy.get('td').eq(3).should('contain.text', 'List of Data Changes');
    });
  }

  verifyLoggingEntry(rowNumber = 1, username, action, dataChangeIncludes) {
    cy.get('table.form_border tr').eq(rowNumber).within(() => {
      cy.get('td').eq(1).should('contain.text', username);
      cy.get('td').eq(2).should('contain.text', action);
      if (dataChangeIncludes) {
        cy.get('td').eq(3).invoke('text').should(text => {
          expect(text.trim().toLowerCase()).to.include(dataChangeIncludes.toLowerCase());
        });
      }
    });
  }
}

export default new LoggingPage;
