class UserRightsPage {
    addUserWithoutChecking(username) {
    cy.get('#new_username')
    .clear()
    .type(username, {force: true});
    cy.get('#addUserBtn').click()
    cy.wait(500)
    cy.contains('Adding new user').should('be.visible')
    cy.get('input[name="record_create').uncheck()
    cy.get('input[name="data_logging"]').check();
    cy.contains('button', 'Add user').click({ force: true });

}
 addUserWithLogging(username) {
    cy.get('#new_username')
    .clear()
    .type(username, {force: true});
    cy.get('#addUserBtn').click()
    cy.wait(500)
    cy.contains('Adding new user').should('be.visible')
    cy.get('input[name="data_logging"]').check();
    cy.contains('button', 'Add user').click({ force: true });
 }

 addUser(username) {
    cy.get('#new_username')
    .clear()
    .type(username, {force: true});
    cy.get('#addUserBtn').click()
    cy.wait(500)
    cy.contains('Adding new user').should('be.visible')
    cy.contains('button', 'Add user').click({ force: true });

}

clickAddUserButton() {
  cy.contains('button.ui-button', 'Add user').click();
}
openUploadUsersDropdown() {
  cy.contains('button', 'Upload or download users, roles, and assignments').click();
}
clickUploadUsersCsv() {
  cy.contains('a', 'Upload users (CSV)').should('be.visible').click();
  cy.get('span.ui-dialog-title').should('have.text', 'Upload users (CSV)');
}
uploadUserCsv(filename) {
  cy.get('#importUserForm input[type="file"][name="file"]').attachFile(filename);
  cy.get('.ui-widget-overlay').should('not.be.visible');
  cy.contains('button.ok-button', 'Upload').click({force:true});
}
confirmUserCsvUploadCsvForProject1(){
  cy.get('span.ui-dialog-title').should('have.text', 'Upload users (CSV) - Confirm');
  cy.get('div.ui-dialog:visible table tbody tr td:first-child')
  .should('have.length.at.least', 4) // at least the four users
  .then(($cells) => {
    const usernames = Cypress._.map($cells, 'innerText').map(text => text.trim());
    expect(usernames).to.include.members([
      'test_user1',
      'test_user2',
      'test_user3',
      'test_user4',
    ]);
  });
  
cy.get('button.ok-button.ui-button.ui-corner-all.ui-widget')
  .contains('Upload')
  .click();
  cy.get('span.ui-dialog-title').should('have.text', 'SUCCESS!');
  cy.contains('button', 'Close').click();

}
assignUserToRole(user,role){
  cy.get('#new_username_assign')
  .clear() 
  .type(user);
  cy.wait(500)
  cy.get('#assignUserBtn').click();
  cy.get('#user_role').select(role);
  cy.wait(500)
  cy.get('#assignDagRoleBtn').click();
}
 checkTableRow(roleName, username) {
  const expectedRole = roleName === '—' ? '—' : roleName;

  cy.get('#table-user_rights_roles_table tbody tr').then($rows => {
    const matchedRow = [...$rows].find(row => {
      const cells = row.querySelectorAll('td');
      const roleText = cells[0]?.textContent.replace(/\s| |&nbsp;/g, '').trim();
      const userText = cells[1]?.textContent.trim();
      return roleText === expectedRole && userText.includes(username);
    });

    expect(matchedRow, `Row for role "${expectedRole}" and user "${username}"`).to.exist;

    const cells = matchedRow.querySelectorAll('td');
    const actualRole = cells[0].textContent.replace(/\s| |&nbsp;/g, '').trim();
    const actualUser = cells[1].textContent.trim();

    expect(actualRole).to.eq(expectedRole);
    expect(actualUser).to.include(username);
  });
}
editUserPriveleges(user){
  cy.get(`a.userLinkInTable[userid="${user}"]`).click();
  cy.contains('span', 'Edit user privileges').click()
  cy.contains('Editing existing user').should('be.visible');
}
saveUserChanges(){
  cy.contains('button', 'Save Changes').click()
}




}
export default new UserRightsPage();