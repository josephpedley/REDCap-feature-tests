class SurveyPage{
    openSubmitDropdown() {
    cy.get('#submit-btn-dropdown').click();
  }

  clickSaveAndStay() {
    cy.contains('Save & Stay').click();
  }

  openSurveyOptions() {
    cy.contains('Survey options').click();
  }
}
export default new SurveyPage();