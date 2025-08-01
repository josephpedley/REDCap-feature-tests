import DashboardPage from "../support/pages/DashboardPage";

describe('Deletes all projects with name', () => {
  beforeEach(() => {
    cy.loginAdmin();
    DashboardPage.goToMyProjects();
  });

  function deleteFirstProjectIfExists() {
    // Check for the "no access" message
    cy.get('body').then($body => {
      if ($body.text().includes("You do not have access to any projects")) {
        cy.log("✅ No projects available – nothing to delete");
        return; // Ends the test early (pass)
      }

      // Proceed to check for first project
      if ($body.find('#table-proj_table tbody tr').length) {
        cy.get('#table-proj_table tbody tr')
          .first()
          .find('a').first()
          .then($link => {
            if ($link.length) {
              cy.wrap($link).click();

              cy.contains('a', 'Other Functionality').click();

              cy.get('.btn-danger').contains('Delete the project').click();

              cy.get('#delete_project_confirm').type('DELETE');
              cy.get('button.ui-button.ui-corner-all.ui-widget')
                .contains('Delete the project')
                .click();

              cy.contains('button', 'Yes').click();
              cy.get('button.close-button.ui-button.ui-corner-all.ui-widget').click();

              DashboardPage.goToMyProjects();

              // Recursive call
              deleteFirstProjectIfExists();
            }
          });
      } else {
        cy.log('✅ No projects found in table – finished deleting');
      }
    });
  }

  it('Deletes all projects', () => {
    deleteFirstProjectIfExists();
  });
});
