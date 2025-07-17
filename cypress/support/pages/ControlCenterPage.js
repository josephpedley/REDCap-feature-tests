class ControlCenterPage {
  
  openUserSettings() {
    cy.get('a[href="/redcap_v15.4.2/ControlCenter/user_settings.php"]')
      .should('be.visible')
      .click();
  }

  
}

export default new ControlCenterPage();
