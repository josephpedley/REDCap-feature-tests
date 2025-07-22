import DashboardPage from "../../support/pages/DashboardPage";
import ProjectCreationPage from "../../support/pages/ProjectCreationPage";
import ProjectSetupPage from "../../support/pages/ProjectSetupPage";

describe('Data Quality Module - Default Rules', () => {
  it('should function as expected with default rules after installation', () => {
    cy.loginAdmin();
    DashboardPage.clickNewProject();
    ProjectCreationPage.enterProjectTitle('C.4.18.0100.100');
    ProjectCreationPage.selectProjectPurpose('Practice / Just for fun');
    ProjectCreationPage.uploadProjectXml('Project418.xml');
    ProjectCreationPage.clickCreateProject();

    ProjectSetupPage.openProjectSetup();
    ProjectSetupPage.moveToProduction();
    ProjectSetupPage.keepExistingData();
    ProjectSetupPage.confirmMove();
    ProjectSetupPage.verifySuccessMessage();

    ProjectSetupPage.openDataQuality();
    cy.contains('Data Quality Rules').should('be.visible');

    const rules = [
      ['A', 'Blank values*', '-'],
      ['B', 'Blank values* (required fields only)', '-'],
      ['C', 'Field validation errors (incorrect data type)', '-'],
      ['D', 'Field validation errors (out of range)', '-'],
      ['E', 'Outliers for numerical fields(numbers, integers, sliders, calc fields)**', '-'],
      ['F', 'Hidden fields that contain values***', '-'],
      ['G', 'Multiple choice fields with invalid values', '-'],
      ['H', 'Incorrect values for calculated fields', '-'],
      ['I', 'Fields containing "missing data codes"', '-'],
      ['1', '[radio]=9.9', "[radio]='9..9'"],
      ['2', '[ptname]<>[name]', '[ptname]<>[name]']
    ];

    cy.get('table tr').each($row => {
      const num = $row.find('td').eq(1).text().trim();
      const r = rules.find(x => x[0] === num);
      if (r) {
        cy.wrap($row).within(() => {
          cy.get('td').eq(2).invoke('text').then(t =>
            expect(t.replace(/\s+/g, ' ').trim()).to.eq(r[1])
          );
          cy.get('td').eq(3).invoke('text').then(t =>
            expect(t.replace(/\s+/g, ' ').trim()).to.eq(r[2])
          );
        });
      }
    });
  });
});
