import ControlCenterPage from "../../support/pages/ControlCenterPage";
import DashboardPage from "../../support/pages/DashboardPage";
import ModulesServicesConfigPage from "../../support/pages/ModulesServicesConfigPage";
import MyProjectsPage from "../../support/pages/MyProjectsPage";
import ProjectCreationPage from "../../support/pages/ProjectCreationPage";
import ProjectPage from "../../support/pages/ProjectPage";
import LoggingPage from "../../support/pages/LoggingPage.cy";
import ProjectSetupPage from "../../support/pages/ProjectSetupPage";

describe('Feature: Survey Feature Control', () => {
  it('As a REDCap end user, I want to see that the survey feature can be enabled or disabled and functions as expected', () => {
    cy.loginAdmin();

    // Step 1: Create a new project
    DashboardPage.clickNewProject();
    ProjectCreationPage.enterProjectTitle('A.6.4.1500.100');
    ProjectCreationPage.selectProjectPurpose('Practice / Just for fun');
    ProjectCreationPage.uploadProjectXml('Project_1.xml');
    ProjectCreationPage.clickCreateProject();

    // Step 2: Disable surveys in the Control Center
    DashboardPage.goToControlCenter();
    ControlCenterPage.openModulesServicesConfig();
    ModulesServicesConfigPage.disableSurveys();

    // Step 3: Open project and confirm survey feature is unavailable
    DashboardPage.goToMyProjects();
    MyProjectsPage.openProjectByName('A.6.4.1500.100');
    cy.contains('Use surveys in this project').should('not.exist');

    // Step 4: Re-enable surveys in the Control Center
    DashboardPage.goToControlCenter();
    ControlCenterPage.openModulesServicesConfig();
    ModulesServicesConfigPage.enableSurveys();

    // Step 5: Open project again and disable surveys from within project setup
    DashboardPage.goToMyProjects();
    MyProjectsPage.openProjectByName('A.6.4.1500.100');
    ProjectPage.openProjectSetup();

    ProjectSetupPage.clickSetupEnableSurveysBtn('Disable');
    ProjectSetupPage.confirmEnableDisableSurvey('Disable');

    cy.get('#setupEnableSurveysBtn')
      .should('be.visible')
      .and('contain', 'Enable');

    // Step 6: Open Logging tab and verify recent log entry
    ProjectPage.openLoggingTab();
    LoggingPage.verifyLoggingTableHeaders();
    LoggingPage.verifyLoggingEntry(1, 'test_admin', 'Manage/Design', 'Modify project settings');
  });
});
