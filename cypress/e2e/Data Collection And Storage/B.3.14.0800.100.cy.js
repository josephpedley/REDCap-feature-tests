import DashboardPage from "../../support/pages/DashboardPage";
import MyProjectsPage from "../../support/pages/MyProjectsPage";
import ProjectPage from "../../support/pages/ProjectPage";

describe('Feature: B.3.14.0800 - Record Status Dashboard Display', () => {
  it('Scenario: B.3.14.0800.100 - Record status dashboard should list all records and show instrument completion statuses', () => {
    cy.loginTestUser();
    DashboardPage.clickNewProject()
    cy.createProject('B.3.14.0800.100', 'Project_3.14.xml');
    DashboardPage.goToMyProjects();
    MyProjectsPage.openProjectByName('B.3.14.0800.100');
    ProjectPage.openRecordStatusDashboard();

    cy.contains('Default dashboard').should('be.visible');

    cy.get('tr.odd').first().within(() => {
      cy.get('td.rc-rsd-id-cell a')
        .should('have.text', '1')
        .and('have.attr', 'href')
        .and('include', 'record_home.php');

      cy.get('td.rc-rsd-cell.rsd-left img')
        .should('have.attr', 'src')
        .and('include', 'circle_red.png');
    });

    cy.get('a').filter(':contains("Arm 2:")').should('contain.text', 'Arm Two');

  });
});
