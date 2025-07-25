import DAGPage from "../../support/pages/DAGPage";
import DashboardPage from "../../support/pages/DashboardPage";
import LoggingPage from "../../support/pages/LoggingPage.cy";
import MyProjectsPage from "../../support/pages/MyProjectsPage";
import ProjectPage from "../../support/pages/ProjectPage";
import UserRightsPage from "../../support/pages/UserRightsPage";

describe('Feature: B.2.10.0100 - Data Access Groups (DAG) Management', () => {
  it('allows creation of a DAG and deletion only if no users or records are assigned', () => {
    cy.loginAdmin();

    DashboardPage.clickNewProject();
    cy.createProject('B.2.10.0100.100', 'Project_1.xml');

    DashboardPage.goToMyProjects();
    MyProjectsPage.openProjectByName('B.2.10.0100.100');
    ProjectPage.openDAGPage();

    cy.contains('Assign user to a group').should('be.visible');

    DAGPage.createNewDAG('TestGroup3');
    DAGPage.verifyGroups(['TestGroup1', 'TestGroup2', 'TestGroup3']);

    DAGPage.editGroupName('TestGroup3', 'RenameGroup3');
    DAGPage.verifyGroups(['TestGroup1', 'TestGroup2', 'RenameGroup3']);

    ProjectPage.openUserRightsFromProject();
    UserRightsPage.addUser('test_joe');

    ProjectPage.openDAGPage();
    DAGPage.assignUser('test_joe', 'RenameGroup3');
    DAGPage.verifyGroups(['TestGroup1', 'TestGroup2', 'RenameGroup3']);
    DAGPage.assertRow('RenameGroup3', 'test_joe');

    DAGPage.deleteForGroup('RenameGroup3');

    cy.wait(500);

    cy.get('.red.dagMsg')
      .should('contain.text', 'The group could not be deleted because users or roles are still assigned to it');

    DAGPage.verifyGroups(['TestGroup1', 'TestGroup2', 'RenameGroup3']);
    DAGPage.assertRow('RenameGroup3', 'test_joe');

    DAGPage.assignUser('test_joe', '[No Assignment]');
    DAGPage.assertRow('RenameGroup3', '');

    DAGPage.deleteForGroup('RenameGroup3');
    DAGPage.verifyGroups(['TestGroup1', 'TestGroup2']);

    cy.wait(500);
    cy.get('#dags_table').contains('RenameGroup3').should('not.exist');

    ProjectPage.openLoggingTab();

    LoggingPage.verifyLoggingEntry(1, 'test_admin', 'Manage/Design', 'Delete data access group');
    LoggingPage.verifyLoggingEntry(5, 'test_admin', 'Manage/Design', 'Rename data access group');
    LoggingPage.verifyLoggingEntry(6, 'test_admin', 'Manage/Design', 'Create data access group');
  });
});
