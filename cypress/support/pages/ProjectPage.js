class ProjectPage{
    openLoggingTab() {
  cy.contains('a', 'Logging').click();
}

}
export default new ProjectPage();