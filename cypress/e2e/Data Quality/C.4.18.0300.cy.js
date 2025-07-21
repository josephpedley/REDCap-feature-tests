import DashboardPage from "../../support/pages/DashboardPage";
import ProjectCreationPage from "../../support/pages/ProjectCreationPage";
import ProjectSetupPage from "../../support/pages/ProjectSetupPage";

describe('User Interface: Data Quality Module rule execution', () => {
  it('verifies that the Data Quality Module executes rules as expected', () => {
    cy.loginAdmin();
    DashboardPage.clickNewProject();
    ProjectCreationPage.enterProjectTitle('C.4.18.0300.100');
    ProjectCreationPage.selectProjectPurpose('Practice / Just for fun');
    ProjectCreationPage.uploadProjectXml('Project418.xml');
    ProjectCreationPage.clickCreateProject();

    ProjectSetupPage.openProjectSetup();
    ProjectSetupPage.moveToProduction();
    ProjectSetupPage.keepExistingData();
    ProjectSetupPage.confirmMove();
    ProjectSetupPage.openDataQuality();

    cy.wait(2000);

    cy.get('table tr').each(($row) => {
      const ruleNum = $row.find('td').eq(1).text().trim();
      if (ruleNum === '1') {
        cy.wrap($row).within(() => {
          cy.contains('button, a', 'Execute').click({ force: true });
          cy.get('td').eq(2).should('contain.text', '[radio]=9.9');
          cy.get('td').eq(3).invoke('text').then(t => expect(t.trim()).to.eq("[radio]='9..9'"));
          cy.get('td').eq(5).should('contain.text', '1');
        });
      }
    }).then(() => {
      ProjectSetupPage.openDataQuality();
      cy.wait(2000);
      cy.contains('button.execRuleBtn', 'All').click();
    });
  });
});
