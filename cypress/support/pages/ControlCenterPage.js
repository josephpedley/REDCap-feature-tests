class ControlCenterPage {
  
  openUserSettings() {
    cy.get('a[href="/redcap_v15.4.2/ControlCenter/user_settings.php"]')
      .should('be.visible')
      .click();
      cy.contains('System-level User Settings').should('be.visible')
  }

  openAdmininstratorPrivileges() {
    cy.get('a[href="/redcap_v15.4.2/ControlCenter/superusers.php"]')
    .click()
  }
  openModulesServicesConfig(){
    cy.contains('a', 'Modules/Services Configuration').click();

  }
  openFieldValidationPage(){
    cy.contains('a', 'Field Validation Types').click();
  }
  openFileUploadSettings(){
    cy.contains('a', 'File Upload Settings').click();
    cy.contains('Configuration Options for Various Types of Stored Files').should('be.visible');
  }
  toggleFileSharingViaPublicLink(choice){
    cy.get('select[name="file_repository_allow_public_link"]').select(choice);
  }
  goToBrowseProjects(){
    cy.contains('a', 'Browse Projects').click();
    cy.contains('Viewing projects accessible by user:').should('be.visible')
  }
  browseProjectByName(name){
    cy.get('#project_search').type(name)
    cy.get('#project_search_btn').click()
    cy.contains(name).should('be.visible')
    cy.contains('a', name).click()
    cy.contains('Project Home').should('be.visible')
  }

  
}

export default new ControlCenterPage();
