import DashboardPage from '../../support/pages/DashboardPage';
import ControlCenterPage from '../../support/pages/ControlCenterPage';
import UserSettingsPage from '../../support/pages/UserSettingsPage';
import MyProjectsPage from '../../support/pages/MyProjectsPage';
import ProjectCreationPage from '../../support/pages/ProjectCreationPage';
import ProjectSetupPage from '../../support/pages/ProjectSetupPage';
import AddEditRecordsPage from '../../support/pages/AddEditRecordsPage';
import RecordHomePage from '../../support/pages/RecordHomePage';
import SurveyPage from '../../support/pages/SurveyPage';
import ProjectPage from '../../support/pages/ProjectPage';


describe('Direct data entry through the survey feature: User Interface: Survey Distribution', () => {
  it('The system shall provide a survey to be generated from within a participant record using these survey options: (Log out + Open survey | Open Survey link)', () => {
    cy.loginAdmin();

    DashboardPage.goToControlCenter();
    ControlCenterPage.openUserSettings();

    UserSettingsPage.selectMoveToProductionOption('Yes, normal users can move projects to production');
    UserSettingsPage.clickSaveChanges();
    UserSettingsPage.verifySuccessMessage();

    cy.contains('Log out').click();

    cy.loginTestUser();

    DashboardPage.clickNewProject();

    ProjectCreationPage.enterProjectTitle('B.3.15.400');
    ProjectCreationPage.selectProjectPurpose('Practice / Just for fun');
    ProjectCreationPage.uploadProjectXml('Project_1.xml');
    ProjectCreationPage.clickCreateProject();

    ProjectSetupPage.openProjectSetup();
    ProjectSetupPage.moveToProduction();
    ProjectSetupPage.keepExistingData();
    ProjectSetupPage.confirmMove();

    cy.reload();

    ProjectSetupPage.verifySuccessMessage();

    ProjectSetupPage.openAddEditRecords();
    AddEditRecordsPage.selectRecord(3);
    RecordHomePage.openSurveyPage();
    SurveyPage.openSubmitDropdown();
    SurveyPage.clickSaveAndStay();
    SurveyPage.openSurveyOptions();

    cy.url().then((previousUrl) => {
      cy.get('#surveyoption-openSurvey').should('have.attr', 'onclick').then((onclick) => {
        const urlMatch = onclick.match(/surveyOpen\('([^']+)'/);
        const surveyUrl = urlMatch[1];

        cy.visit(surveyUrl);

        cy.contains('strong', 'Please complete the survey below.').should('be.visible');
        cy.contains('Submit').click();
        cy.contains('strong', 'Thank you for taking the survey.');
        cy.contains('Close survey').click();

        cy.visit(previousUrl);

        ProjectSetupPage.openAddEditRecords();
        AddEditRecordsPage.selectRecord(2);
        RecordHomePage.openSurveyPage();
        SurveyPage.openSubmitDropdown();
        SurveyPage.clickSaveAndStay();
        SurveyPage.openSurveyOptions();

        cy.get('a#surveyoption-openSurvey:has(span[data-rc-lang="bottom_02"])')
          .contains('Log out')
          .click();

        cy.url().then((previousUrl2) => {
          cy.get('#surveyoption-openSurvey').should('have.attr', 'onclick').then((onclick2) => {
            const urlMatch2 = onclick2.match(/surveyOpen\('([^']+)'/);
            const surveyUrl2 = urlMatch2[1];

            cy.visit(surveyUrl2);

            cy.contains('strong', 'Please complete the survey below.').should('be.visible');
            cy.contains('Submit').click();
            cy.contains('strong', 'Thank you for taking the survey.');
            cy.contains('Close survey').click();

            cy.visit(previousUrl2);

            cy.loginTestUser();
            DashboardPage.goToMyProjects();
            MyProjectsPage.openProjectByName('B.3.15.400');
            ProjectPage.openLoggingTab();

            cy.get('td.logt').filter(':contains("[survey respondent]")').should('have.length', 4);
            cy.get('td.logt').filter(':contains("survey_complete = \'2\'")').should('have.length', 2);
          });
        });
      });
    });
  });
});
