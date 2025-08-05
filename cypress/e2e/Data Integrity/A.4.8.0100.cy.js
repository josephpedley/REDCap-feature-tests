import ControlCenterPage from "../../support/pages/ControlCenterPage";
import DashboardPage from "../../support/pages/DashboardPage";
import DesignerPage from "../../support/pages/DesignerPage";
import FieldValidationPage from "../../support/pages/FieldValidationPage";
import MyProjectsPage from "../../support/pages/MyProjectsPage";
import ProjectPage from "../../support/pages/ProjectPage"

describe('A.4.8.0100.100 - Field Validation Types', () => {
  it('should support enabling and disabling of various field validation types including Date, Datetime, Email, Integer, Number, and Time', () => {
    cy.loginAdmin();
    cy.createProject('A.4.8.0100.100', 'Project_1.xml');
    cy.moveToProduction();
    DashboardPage.goToControlCenter();
    ControlCenterPage.openFieldValidationPage();
    
const labels = [
  'Date (D-M-Y)',
  'Datetime (M-D-Y H:M)',
  'Datetime w/ seconds (Y-M-D H:M:S)',
  'Email',
  'Integer',
  'Number',
  'Number (1 decimal place - comma as decimal)', // only verify
  'Time (HH:MM)'
];

labels.forEach(label => {
  if (label === 'Number (1 decimal place - comma as decimal)') {
    FieldValidationPage.verifyDisabledIconByLabel(label);
  } else {
    FieldValidationPage.disableValidationByLabel(label);
    cy.wait(100)
    FieldValidationPage.verifyDisabledIconByLabel(label);
  }
});

DashboardPage.goToMyProjects();
MyProjectsPage.openProjectByName('A.4.8.0100.100');
ProjectPage.openDesignerTab()
DesignerPage.clickEnterDraftModeButton();
DesignerPage.openDataTypes();
const expectedValidationOptions = [
  '---- None ----',
  'Date (M-D-Y)',
  'Date (Y-M-D)',
  'Datetime (D-M-Y H:M)',
  'Datetime (Y-M-D H:M)',
  'Datetime w/ seconds (D-M-Y H:M:S)',
  'Datetime w/ seconds (M-D-Y H:M:S)',
  'Phone (North America)',
  'Time (HH:MM:SS)',
  'Zipcode (U.S.)'
];
DesignerPage.assertDropdown(expectedValidationOptions);
DashboardPage.goToControlCenter();
ControlCenterPage.openFieldValidationPage();

labels.forEach(label => {
    FieldValidationPage.enableValidationByLabel(label);
    cy.wait(100)
    FieldValidationPage.verifyEnabledIconByLabel(label);
  
});
DashboardPage.goToMyProjects();
MyProjectsPage.openProjectByName('A.4.8.0100.100');
ProjectPage.openDesignerTab()
DesignerPage.openDataTypes();

const expectedValidationOptions2 = [
  '---- None ----',
  'Date (D-M-Y)',
  'Date (M-D-Y)',
  'Date (Y-M-D)',
  'Datetime (D-M-Y H:M)',
  'Datetime (M-D-Y H:M)',
  'Datetime (Y-M-D H:M)',
  'Datetime w/ seconds (D-M-Y H:M:S)',
  'Datetime w/ seconds (M-D-Y H:M:S)',
  'Datetime w/ seconds (Y-M-D H:M:S)',
  'Email',
  'Integer',
  'Number',
  'Number (1 decimal place - comma as decimal)',
  'Phone (North America)',
  'Time (HH:MM:SS)',
  'Time (HH:MM)',
  'Zipcode (U.S.)'
];
DesignerPage.assertDropdown(expectedValidationOptions2); //Note you must enable number 1 after first run
DashboardPage.goToControlCenter();
ControlCenterPage.openFieldValidationPage();
FieldValidationPage.disableValidationByLabel('Number (1 decimal place - comma as decimal)')








  });
});
