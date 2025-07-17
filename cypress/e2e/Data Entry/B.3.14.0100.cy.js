describe('Direct data entry with data collection instrument', () => {
    it(' Creating a Record and Entering Data: The system shall support the ability to create a record', () => {
         cy.loginAdmin();
         // Project Creation
        cy.contains('New Project').click();

        cy.get('input#app_title').type('B.3.15.0400.100');

        cy.get('select[name="purpose"]')
        .select('Practice / Just for fun');

        cy.contains('Upload a REDCap project XML file (CDISC ODM format)').click();

        cy.get('input[type="file"]').attachFile('Project_3.14.xml')
        cy.get('button.btn-primaryrc')
        .contains('Create Project')
        .click();
    })
})