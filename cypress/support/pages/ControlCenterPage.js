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
  

  
}

export default new ControlCenterPage();
