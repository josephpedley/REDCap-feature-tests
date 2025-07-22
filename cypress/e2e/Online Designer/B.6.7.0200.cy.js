import DashboardPage from "../../support/pages/DashboardPage";
import DesignerPage from "../../support/pages/DesignerPage";
import MyProjectsPage from "../../support/pages/MyProjectsPage";
import ProjectCreationPage from "../../support/pages/ProjectCreationPage";
import ProjectPage from "../../support/pages/ProjectPage";
import ProjectSetupPage from "../../support/pages/ProjectSetupPage";

describe('Feature: Design forms Using Data Dictionary and Online Designer', () => {
  it('Form Creation: The system shall support the creation of new data collection instruments via the Online Designer', () => {
    cy.loginAdmin();

    DashboardPage.clickNewProject();
    ProjectCreationPage.enterProjectTitle('B.6.7.0200');
    ProjectCreationPage.selectProjectPurpose('Practice / Just for fun');
    ProjectCreationPage.uploadProjectXml('Project_1.xml');
    ProjectCreationPage.clickCreateProject();

    DashboardPage.goToMyProjects();
    MyProjectsPage.openProjectByName('B.6.7.0200');
    ProjectSetupPage.openProjectSetup();
    ProjectSetupPage.openOnlineDesigner();

    cy.contains('Data Collection Instruments').should('be.visible');
    DesignerPage.createForm('New Form');

    cy.get('#table-forms_surveys > tbody > tr').each(($row, index) => {
      if (index === 0) {
        cy.wrap($row).find('td').eq(1).invoke('text').should('include', 'Text Validation');
        cy.wrap($row).find('td').eq(2).invoke('text').should('include', '3');
      } else if (index === 1) {
        cy.wrap($row).find('td').eq(1).invoke('text').should('include', 'Data Types');
        cy.wrap($row).find('td').eq(2).invoke('text').should('include', '45');
      } else if (index === 2) {
        cy.wrap($row).find('td').eq(1).invoke('text').should('include', 'Survey');
        cy.wrap($row).find('td').eq(2).invoke('text').should('include', '2');
      } else if (index === 3) {
        cy.wrap($row).find('td').eq(1).invoke('text').should('include', 'Consent');
        cy.wrap($row).find('td').eq(2).invoke('text').should('include', '4');
      } else if (index === 4) {
        cy.wrap($row).find('td').eq(1).invoke('text').should('include', 'New Form');
        cy.wrap($row).find('td').eq(2).invoke('text').should('include', '0');
      }
    });

    ProjectPage.openLoggingTab();

    cy.get('table.form_border tr').then((rows) => {
      // Check header row
      cy.wrap(rows[0]).within(() => {
        cy.get('td').eq(0).should('have.text', 'Time / Date');
        cy.get('td').eq(1).should('have.text', 'Username');
        cy.get('td').eq(2).should('have.text', 'Action');
        cy.get('td').eq(3).should('contain.text', 'List of Data ChangesOR Fields Exported');
      });

      cy.wrap(rows[1]).within(() => {
        cy.get('td').eq(0).invoke('text').then(text => {
          expect(text.trim()).to.match(/\d{2}-\d{2}-\d{4} \d{2}:\d{2}/);
        });
        cy.get('td').eq(1).invoke('text').then(text => {
          expect(text.trim()).to.equal('test_admin');
        });
        cy.get('td').eq(2).invoke('text').then(text => {
          expect(text).to.contain('Manage/Design');
        });
        cy.get('td').eq(3).invoke('text').then(text => {
          expect(text).to.contain('Create data collection instrument');
        });
      });
    });
  });
});
