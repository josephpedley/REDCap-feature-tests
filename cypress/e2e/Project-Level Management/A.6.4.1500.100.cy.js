import ControlCenterPage from "../../support/pages/ControlCenterPage";
import DashboardPage from "../../support/pages/DashboardPage";
import ModulesServicesConfigPage from "../../support/pages/ModulesServicesConfigPage";
import MyProjectsPage from "../../support/pages/MyProjectsPage";
import ProjectCreationPage from "../../support/pages/ProjectCreationPage";
import ProjectPage from "../../support/pages/ProjectPage";

describe('Feature: Survey Feature Control', () => {
  it('As a REDCap end user, I want to see that the survey feature can be enabled or disabled and functions as expected', () => {
    cy.loginAdmin();

    // Create a new project
    DashboardPage.clickNewProject();
    ProjectCreationPage.enterProjectTitle('A.6.4.1500.100');
    ProjectCreationPage.selectProjectPurpose('Practice / Just for fun');
    ProjectCreationPage.uploadProjectXml('Project_1.xml');
    ProjectCreationPage.clickCreateProject();

    // Disable surveys in the Control Center
    DashboardPage.goToControlCenter();
    ControlCenterPage.openModulesServicesConfig();
    ModulesServicesConfigPage.DisableSurveys();

    // Open project and confirm surveys are unavailable
    DashboardPage.goToMyProjects();
    MyProjectsPage.openProjectByName('A.6.4.1500.100');
    cy.contains('Use surveys in this project').should('not.exist');

    // Re-enable surveys
    DashboardPage.goToControlCenter();
    ControlCenterPage.openModulesServicesConfig();
    ModulesServicesConfigPage.EnableSurveys();

    // Open project again and disable surveys within the project
    DashboardPage.goToMyProjects();
    MyProjectsPage.openProjectByName('A.6.4.1500.100');
    cy.get('#setupEnableSurveysBtn')
      .should('be.visible')
      .and('contain', 'Disable')
      .click();

    cy.get('button.ok-button.ui-button')
      .contains('Disable')
      .click();

    cy.get('#setupEnableSurveysBtn')
      .should('be.visible')
      .and('contain', 'Enable');

    // Open Logging tab and assert expected entries
    ProjectPage.openLoggingTab();

    cy.get('table.form_border tr').first().within(() => {
      cy.get('td').eq(1).should('contain.text', 'Username');
      cy.get('td').eq(2).should('contain.text', 'Action');
      cy.get('td').eq(3).should('contain.text', 'List of Data Changes');
    });

    cy.get('table.form_border tr').eq(1).within(() => {
      cy.get('td').eq(1).should('contain.text', 'test_admin');
      cy.get('td').eq(2).should('contain.text', 'Manage/Design');
      cy.get('td').eq(3).should('contain.text', 'Modify project settings');
    });
  });
});
