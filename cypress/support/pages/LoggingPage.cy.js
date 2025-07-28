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
  verifyLoggingEntryByContent(username, action, dataChangeIncludes) {
  cy.get('table.form_border tr').filter(':has(td)').then($rows => {
    const matchedRow = [...$rows].find(row => {
      const cells = row.querySelectorAll('td');
      if (!cells || cells.length < 4) return false;
      const rowUsername = cells[1].innerText.trim().toLowerCase();
      const rowAction = cells[2].innerText.trim().toLowerCase();
      const rowDataChange = cells[3].innerText.trim().toLowerCase();
      return (
        rowUsername.includes(username.toLowerCase()) &&
        rowAction.includes(action.toLowerCase()) &&
        (!dataChangeIncludes || rowDataChange.includes(dataChangeIncludes.toLowerCase()))
      );
    });

    expect(matchedRow, `Log entry for "${dataChangeIncludes}"`).to.not.be.undefined;
  });
}

}

export default new LoggingPage;
