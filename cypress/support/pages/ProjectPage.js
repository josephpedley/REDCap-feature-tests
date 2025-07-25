class ProjectPage{
    openLoggingTab() {
  cy.contains('a', 'Logging').click();
}
  openDesignerTab(){
    cy.contains('a', 'Designer').click();
  }
  openRecordStatusDashboard(){
    cy.contains('span', 'Record Status Dashboard')
      .should('be.visible')
      .click();
  }
  openProjectHome(){
    cy.contains('a', 'Project Home').click();
  }
  openProjectRevisionHistory(){
    cy.contains('a', 'Project Revision History').click();
  }
  openDataImportTool(){
    cy.contains('a', 'Data Import Tool').click();
    cy.contains('Download your Data Import Template').should('be.visible');
  }
  openProjectSetup(){
    cy.contains('a', 'Project Setup').click();
  }
  openRecordStatusDashboard2(){
    cy.get('#rsd-men-link').click();
  }
}
export default new ProjectPage();