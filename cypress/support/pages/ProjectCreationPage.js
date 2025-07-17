

class ProjectCreationPage {
  enterProjectTitle(title) {
    cy.get('input#app_title').clear().type(title);
  }

  selectProjectPurpose(purpose) {
    cy.get('select[name="purpose"]').select(purpose);
  }

  uploadProjectXml(filename) {
    cy.contains('Upload a REDCap project XML file (CDISC ODM format)').click();
    cy.get('input[type="file"]').attachFile(filename);
  }

  clickCreateProject() {
    cy.get('button.btn-primaryrc')
      .contains('Create Project')
      .click({ force: true });
  }
}

export default new ProjectCreationPage();
