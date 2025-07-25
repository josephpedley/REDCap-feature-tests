import ControlCenterPage from "../../support/pages/ControlCenterPage";
import DashboardPage from "../../support/pages/DashboardPage";
import ProjectPage from "../../support/pages/ProjectPage";
import ProjectSetupPage from "../../support/pages/ProjectSetupPage";
import RecordStatusDashboardPage from "../../support/pages/RecordStatusDashboardPage";
import UserRightsPage from "../../support/pages/UserRightsPage";
import UserSettingsPage from "../../support/pages/UserSettingsPage";


describe('Feature: B.3.14.1000 - The system shall allow users to delete all data on the current form of a given record from the Record Home Page', () => {
  it('Scenario: B.3.14.1000.100 - Delete all data in a form for a record', () => {
    cy.loginAdmin();
    DashboardPage.goToControlCenter();
    ControlCenterPage.openUserSettings();
    UserSettingsPage.selectMoveToProductionOption('Yes, normal users can move projects to production');
    UserSettingsPage.clickSaveChanges();
    UserSettingsPage.verifySuccessMessage();
    cy.contains('Log out').click();

    cy.loginTestUser();
    DashboardPage.clickNewProject();
    cy.createProject('B.3.14.1000.100', 'Project_3.14.xml')
    cy.moveToProduction();

    ProjectSetupPage.openUserRights();
    UserRightsPage.assignUserToRole('test_joe', '1_FullRights')
    cy.wait(1000)
    cy.get('tr').contains('td', '1_FullRights')
  .parent('tr') // get the full row
  .within(() => {
    cy.get('.userNameLinkDiv')
      .should('contain.text', 'test_joe'); // or 'Test User1' if that's the visible name

    // Open menu if needed
    

    // Wait for the link to appear and click it directly
    cy.get('#rsd-men-link', { timeout: 10000 }).should('exist').click()

    RecordStatusDashboardPage.clickBubbleByIndex(2, 'Text Validation', 0)
    

  });




  });
});
