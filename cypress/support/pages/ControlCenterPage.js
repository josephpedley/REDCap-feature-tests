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
  

  
}

export default new ControlCenterPage();
