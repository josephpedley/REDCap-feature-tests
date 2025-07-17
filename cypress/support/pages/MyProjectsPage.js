class MyProjectsPage{
    openProjectByName(projectName) {
    cy.contains('a', projectName).click();
    }

}
export default new MyProjectsPage();