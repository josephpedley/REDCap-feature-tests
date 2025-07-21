// support/pages/projectSetupPage.js

class ProjectSetupPage {
  openProjectSetup() {
    cy.contains('Project Setup').click();
  }

  moveToProduction() {
    cy.get('button.btn-defaultrc')
      .contains('Move project to production')
      .click({ force: true });
  }

  keepExistingData() {
    cy.get('#keep_data').check({ force: true });
  }

  confirmMove() {
    cy.contains('button', 'YES, Move').should('be.visible').click();
  }

  verifySuccessMessage() {
    cy.get('#actionMsg')
      .should('be.visible')
      .and('contain.text', 'Success! The project is now in production.');
  }
  
  openAddEditRecords() {
  cy.contains('Add / Edit Records').click();
}
  openUserRights() {
  cy.get('button.btn.btn-defaultrc.btn-xs.fs13')
    .contains('User Rights')
    .click();
}
  openDataQuality(){
    cy.contains('a', 'Data Quality').click();
  }

}

export default new ProjectSetupPage();
