import DashboardPage from "../support/pages/DashboardPage";
import MyProjectsPage from "../support/pages/MyProjectsPage";

describe('Deletes all projects with name', () => {
  const projectName = 'B.2.10.0100';

  beforeEach(() => {
    cy.loginAdmin();
    DashboardPage.goToMyProjects();
  });

  function deleteFirstProjectIfExists() {
  cy.get('#table-proj_table tbody tr')
    .first()
    .find('a').first()
    .then($link => {
      if ($link.length) {
        cy.wrap($link).click();

        // Go to Other Functionality
        cy.contains('a', 'Other Functionality').click();

        // Click Delete the project
        cy.get('.btn-danger').contains('Delete the project').click();

        // Confirm deletion
        cy.get('#delete_project_confirm').type('DELETE');
        cy.get('button.ui-button.ui-corner-all.ui-widget')
          .contains('Delete the project')
          .click();

        // Confirm final Yes
        cy.contains('button', 'Yes').click();

        // Close confirmation dialog
        cy.get('button.close-button.ui-button.ui-corner-all.ui-widget').click();

        // Go back to My Projects
        DashboardPage.goToMyProjects();

        // Recursively delete next project
        deleteFirstProjectIfExists();
      } else {
        cy.log('✅ No more projects to delete');
      }
    });
}

  it('Deletes all projects named C.4.18.0300.100', () => {
    deleteFirstProjectIfExists();
  });
});
