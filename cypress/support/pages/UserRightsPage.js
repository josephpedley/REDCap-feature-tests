class UserRightsPage {
    addUser(username) {
    cy.get('#new_username')
    .clear()
    .type(username, {force: true});
    cy.get('#addUserBtn').click()
    cy.wait(500)
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
  cy.get('#assignUserBtn').click();
  cy.get('#user_role').select(role);
  cy.get('#assignDagRoleBtn').click();



}


}
export default new UserRightsPage();