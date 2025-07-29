import ControlCenterPage from "../../support/pages/ControlCenterPage";
import DashboardPage from "../../support/pages/DashboardPage";
import FileRepositoryPage from "../../support/pages/FileRepositoryPage";
import MyProjectsPage from "../../support/pages/MyProjectsPage";
import ProjectPage from "../../support/pages/ProjectPage";

describe('Control Center - Public Link File Sharing', () => {
  it('should allow enabling and disabling file sharing via public link in the File Repository settings', () => {
    // Setup: Log in and create project
    cy.loginAdmin();
    cy.createProject('A.3.26.0100.100', 'Project_1.xml');
    cy.moveToProduction();

    // Upload file to File Repository
    ProjectPage.openFileRepository();
    cy.wait(500); // Consider replacing with a more reliable wait
    FileRepositoryPage.uploadFile('testusers_bulkupload.csv');

    // Verify file upload
    ProjectPage.openFileRepository();
    FileRepositoryPage.assertFileUpload('testusers_bulkupload.csv');

    // Disable public link sharing
    DashboardPage.goToControlCenter();
    ControlCenterPage.openFileUploadSettings();
    ControlCenterPage.toggleFileSharingViaPublicLink('Disabled');
    cy.get('input[type="submit"]').click();
    cy.contains('Your system configuration values have now been changed!');

    // Verify that "public link" is not shown
    DashboardPage.goToMyProjects();
    MyProjectsPage.openProjectByName('A.3.26.0100.100');
    ProjectPage.openFileRepository();
    FileRepositoryPage.clickShareIcon('testusers_bulkupload.csv');
    cy.contains('Send the file securely using Send-It').should('be.visible');
    cy.contains('Share a public link to view the file').should('not.exist');
    cy.get('.close-button').click();

    // Enable public link sharing
    DashboardPage.goToControlCenter();
    ControlCenterPage.openFileUploadSettings();
    ControlCenterPage.toggleFileSharingViaPublicLink('Enabled');
    cy.get('input[type="submit"]').click();
    cy.contains('Your system configuration values have now been changed!');

    // Verify that "public link" is now shown
    DashboardPage.goToMyProjects();
    MyProjectsPage.openProjectByName('A.3.26.0100.100');
    ProjectPage.openFileRepository();
    FileRepositoryPage.clickShareIcon('testusers_bulkupload.csv');
    cy.contains('Send the file securely using Send-It').should('be.visible');
    cy.contains('Share a public link to view the file').should('be.visible');
    cy.get('.close-button').click();
  });
});
