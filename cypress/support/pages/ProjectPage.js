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
}
export default new ProjectPage();