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
  openDAGPage(){
    cy.contains('a', 'DAG').click();
  }
  openUserRightsFromProject(){
    cy.contains('a', 'User Rights').click()
  }
  openDataExportsReportsStats(){
    cy.contains('a', 'Data Exports, Reports, and Stats').click();
  }
  openCustomiseEsignatures(){
    cy.contains('a', 'Customize & Manage Locking/E-signatures').click()
  }
  openFileRepository(){
    cy.contains('a', 'File Repository').click()
    cy.get('.ItemListBreadcrumb-link').contains('All Files').should('be.visible');
  }
}
export default new ProjectPage();