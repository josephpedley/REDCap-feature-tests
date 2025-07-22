class ProjectPage{
    openLoggingTab() {
  cy.contains('a', 'Logging').click();
}
  openDesignerTab(){
    cy.contains('a', 'Designer').click();
  }
  openRecordStatusDashboard(){
    cy.contains('span', 'Record Status Dashboard').click();
  }
  openProjectHome(){
    cy.contains('a', 'Project Home').click();
  }
  openProjectRevisionHistory(){
    cy.contains('a', 'Project Revision History').click();
  }
}
export default new ProjectPage();