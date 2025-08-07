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
    cy.wait(2000)
  }

  requestMoveToProduction(){
    cy.contains('button', 'Yes, Request Admin to Move to Production Status').click({force:true});

  }
  verifyRequestSuccessMsg(){
     cy.get('#actionMsg')
      .should('be.visible')
      .and('contain.text', 'Your request to move the project to production status has been sent to a REDCap administrator.')
  }
  cancelRequest(){
    cy.contains('button', 'Cancel request').click();
    cy.get('button.ui-button.ui-corner-all.ui-widget').contains('Submit').click();
    cy.get('span')
  .should('contain.text', 'Project status:')
  .and('contain.text', 'Development');

  }

  confirmMove() {
    cy.contains('button', 'YES, Move').should('be.visible').click({force:true});
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
  openOnlineDesigner(){
    cy.contains('button', 'Online Designer').click();
  }
  openDictionary(){
    cy.contains('a', 'Dictionary').click();
  }
  clickSetupEnableSurveysBtn(expectedText) {
    cy.get('#setupEnableSurveysBtn')
      .should('be.visible')
      .and('contain', expectedText)
      .click();
  }
   confirmEnableDisableSurvey(actionText) {
    cy.get('button.ok-button.ui-button')
      .contains(actionText)
      .click();
    cy.contains('Saved!').should('be.visible');
  }
  disableAutoIncrementRecords(){
    cy.get('button[onclick*="auto_inc_set"]')
  .should('contain.text', 'Disable')
  .click();
  }
  disableLongitudinal(){
    cy.get('#setupLongiBtn').click();
    cy.get('button.ok-button.ui-button.ui-corner-all.ui-widget').click();
    cy.get('#setupLongiBtn').should('contain.text', 'Enable')
  }
   enableLongitudinal(){
    cy.get('#setupLongiBtn').click();
    cy.get('#setupLongiBtn').should('contain.text', 'Disable')
  }

}

export default new ProjectSetupPage();
