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
  editSurveyResponse(){
    cy.contains('span', 'Edit response').click()
    cy.contains('now editing').should('be.visible')
  }
  editSurveyName(name){
    cy.get('input[autocomplete="new-password"][Value = "Name "]').clear().type(name);

}}
export default new SurveyPage();