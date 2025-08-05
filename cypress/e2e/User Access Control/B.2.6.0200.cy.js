import DashboardPage from '../../support/pages/DashboardPage';
import UserRightsPage from '../../support/pages/UserRightsPage';
import ProjectCreationPage from '../../support/pages/ProjectCreationPage';
import ProjectSetupPage from '../../support/pages/ProjectSetupPage';
import ProjectPage from '../../support/pages/ProjectPage';
import LoggingPage from '../../support/pages/LoggingPage.cy';
import MyProjectsPage from '../../support/pages/MyProjectsPage';
import AddEditRecordsPage from '../../support/pages/AddEditRecordsPage';
import SurveyPage from '../../support/pages/SurveyPage';

describe('B.2.6.0200 - The system shall allow data entry form user access to be (No Access / Read Only / View & Edit / Edit survey responses)', () => {
  it('should allow assigning different levels of data entry access to a user for a form', () => {
    cy.loginAdmin();

    DashboardPage.clickNewProject();
    ProjectCreationPage.enterProjectTitle('B.2.6.0200.100');
    ProjectCreationPage.selectProjectPurpose('Practice / Just for fun');
    ProjectCreationPage.uploadProjectXml('Project_1.xml');
    ProjectCreationPage.clickCreateProject();

    ProjectSetupPage.openProjectSetup();
    ProjectSetupPage.moveToProduction();
    ProjectSetupPage.keepExistingData();
    ProjectSetupPage.confirmMove();
    ProjectSetupPage.verifySuccessMessage();
    ProjectSetupPage.openUserRights();

    UserRightsPage.openUploadUsersDropdown();
    UserRightsPage.clickUploadUsersCsv();
    UserRightsPage.uploadUserCsv('user_list_for project_1.csv');
    UserRightsPage.confirmUserCsvUploadCsvForProject1();

    UserRightsPage.checkTableRow('—', 'test_admin');

    const userNum = [1, 2, 3, 4];
    const roleKeys = [
      '1_FullRights',
      '2_Edit_RemoveID',
      '3_ReadOnly_Deidentified',
      '4_NoAccess_Noexport',
    ];

    for (let i = 0; i < 4; i++) {
      UserRightsPage.checkTableRow('—', 'test_user' + userNum[i]);
      UserRightsPage.checkTableRow(roleKeys[i], '[No users assigned]');
    }

    UserRightsPage.editUserPriveleges('test_user1');
    cy.get('input[type=radio][name=form-text_validation][value=0]').check();
    UserRightsPage.saveUserChanges();

    ProjectPage.openLoggingTab();
    LoggingPage.verifyLoggingTableHeaders();
    LoggingPage.verifyLoggingEntryByContent('test_admin', 'Add user', "user = 'test_user1");
    LoggingPage.filterByUsername('test_admin');
    LoggingPage.verifyLoggingEntryByContent('test_admin', 'Update user', "user = 'test_user1");

    cy.contains('Log out').click();

    // Log in as test user
    cy.loginTestUserImp();
    DashboardPage.goToMyProjects();
    MyProjectsPage.openProjectByName('B.2.6.0200.100');
    ProjectPage.openRecordStatusDashboard();

    cy.get('#record_status_table').within(() => {
      cy.contains('Text Validation').should('not.exist');
    });

    // Change access to View & Edit
    cy.contains('a', 'User Rights').click();
    UserRightsPage.editUserPriveleges('test_user1');
    cy.get('input[type=radio][name=form-text_validation][value=2]').check();
    UserRightsPage.saveUserChanges();

    ProjectSetupPage.openAddEditRecords();
    AddEditRecordsPage.selectRecord(1);
    cy.contains('Record Home Page');
    AddEditRecordsPage.addRecordTextValidationEvent1();
    cy.contains('Text Validation').should('be.visible');
    cy.contains('button', 'Save & Exit Form').should('not.exist');

    // Change access to Edit Survey Responses
    cy.contains('a', 'User Rights').click();
    UserRightsPage.editUserPriveleges('test_user1');
    cy.get('input[type=radio][name=form-text_validation][value=1]').check();
    UserRightsPage.saveUserChanges();

    ProjectSetupPage.openAddEditRecords();
    AddEditRecordsPage.selectRecord(1);
    cy.contains('Record Home Page');
    AddEditRecordsPage.addSurveyEvent3();

    SurveyPage.openSurveyOptions();

    cy.url().then((previousUrl) => {
      cy.get('#surveyoption-openSurvey')
        .should('have.attr', 'onclick')
        .then((onclick) => {
          const urlMatch = onclick.match(/surveyOpen\('([^']+)'/);
          const surveyUrl = urlMatch ? urlMatch[1] : null;

          if (surveyUrl) {
            cy.visit(surveyUrl);

            cy.contains('strong', 'Please complete the survey below.').should('be.visible');
            cy.contains('Submit').click();
            cy.contains('strong', 'Thank you for taking the survey.');
            cy.contains('Close survey').click();

            cy.visit(previousUrl);
          } else {
            throw new Error('Survey URL could not be parsed.');
          }
        });
    });
    cy.contains('Log out').click({force:true});
    cy.loginTestUserImp()
    DashboardPage.goToMyProjects();
    MyProjectsPage.openProjectByName('B.2.6.0200.100');
    ProjectSetupPage.openAddEditRecords()
    AddEditRecordsPage.selectRecord(1);
    cy.contains('Record Home Page');
    AddEditRecordsPage.addSurveyEvent3()
    cy.contains('Survey response is editable')
    SurveyPage.editSurveyResponse()
    SurveyPage.editSurveyName('Edited Name')
    SurveyPage.openSubmitDropdown()
    SurveyPage.clickSaveAndStay()
    cy.contains('successfully edited')
    cy.contains('a', 'User Rights').click()
    UserRightsPage.editUserPriveleges('test_user1');
    cy.get('input[type=radio][name=form-survey][value=2]').check();
    UserRightsPage.saveUserChanges();

    ProjectSetupPage.openAddEditRecords()
    AddEditRecordsPage.selectRecord(1);
    cy.contains('Record Home Page');
    AddEditRecordsPage.addSurveyEvent3();
    cy.contains('Survey response is read-only').should('be.visible')
    cy.contains('button', 'Save').should('not.exist')

    
  });
});
