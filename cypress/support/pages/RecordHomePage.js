class RecordHomePage{
     openSurveyPage() {
    cy.get('a[href*="page=survey"]').click();
  }

}

export default new RecordHomePage();