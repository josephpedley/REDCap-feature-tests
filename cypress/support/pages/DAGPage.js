class DAGPage {
  tableHeaderSelector = '#dags_table .hDivBox table tbody tr th';
  tableRowsSelector = '#dags_table .bDiv table tbody tr';

  createNewDAG(groupName) {
    cy.get('#new_group').clear().type(groupName);
    cy.get('#new_group_button').click();
  }

  verifyGroups(groupNames) {
    // Verify header first
    cy.get(this.tableHeaderSelector).first().should('contain.text', 'Data Access Groups');

    // For each expected group name, find a row containing that text
    groupNames.forEach(name => {
      cy.get(this.tableRowsSelector)
        .contains('tr', name)
        .should('exist');
    });
  }

  editGroupName(oldName, newName) {
    cy.contains('span.editText', oldName)
      .click()
      .clear()
      .type(newName + '{enter}');
  }

  assignUser(userName, group) {
    cy.get('#group_users').wait(500).select(userName, { force: true });
    cy.get('#groups').wait(500).select(group, { force: true });
    cy.get('#user_group_button').click();
  }

  assertRow(groupName, userName) {
    cy.get(this.tableRowsSelector)
      .contains('td', groupName)
      .parent('tr')
      .within(() => {
        cy.get('td').eq(1).should('contain.text', userName);
      });
  }

  deleteForGroup(groupName) {
    cy.get(this.tableRowsSelector)
      .contains('td', groupName)
      .parent('tr')
      .within(() => {
        cy.get('td')
          .last()
          .find('img')
          .click();
      });

    // Confirm delete modal/dialog
    cy.contains('span', 'Delete group?').should('be.visible');
    cy.contains('button', 'Delete').click();
  }
}

export default new DAGPage();
