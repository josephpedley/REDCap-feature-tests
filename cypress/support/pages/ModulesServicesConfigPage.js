class ModulesServicesConfigPage {
  setSurveySystemStatus(enable = true) {
    const value = enable ? '1' : '0';
    cy.get('select[name="enable_projecttype_singlesurveyforms"]').select(value);
    cy.get('input[type="submit"][value="Save Changes"]').click();
    cy.contains('Your system configuration values have now been changed!').should('be.visible');
  }

  enableSurveys() {
    this.setSurveySystemStatus(true);
  }

  disableSurveys() {
    this.setSurveySystemStatus(false);
  }
}

export default new ModulesServicesConfigPage();
