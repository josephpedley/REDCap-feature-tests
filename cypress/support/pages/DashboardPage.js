// support/pages/dashboardPage.js

class DashboardPage {
  goToControlCenter() {
    cy.get('a[href="/redcap_v15.4.2/ControlCenter/index.php"]')
      .should('be.visible')
      .click();
  }

  goToMyProjects() {
    cy.contains('My Projects').click();
  }

  clickNewProject() {
    cy.contains('New Project').click();
  }

  openProjectByName(projectName) {
    cy.contains('a', projectName).click();
  }

}

export default new DashboardPage();
