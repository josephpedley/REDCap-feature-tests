import DashboardPage from "../../support/pages/DashboardPage";

describe('B.6.13.0100.100 - My Project dashboard', () => {
  it('displays the My Projects table with correct headers and empty state when user has no access', () => {
    cy.loginAdmin()
    DashboardPage.goToMyProjects();
    cy.get('[data-rc-lang="home_30"]').should('be.visible'); // Project Title
    cy.get('[data-rc-lang="home_65"]').should('be.visible'); // PID
    cy.get('[data-rc-lang="home_31"]').should('be.visible'); // Records
    cy.get('[data-rc-lang="home_32"]').should('be.visible'); // Fields
    cy.get('[data-rc-lang="global_110"]').should('be.visible'); // Instruments
    cy.get('[data-rc-lang="home_39"]').should('be.visible'); // Type
    cy.get('[data-rc-lang="home_33"]').should('be.visible'); // Status


  });
});
