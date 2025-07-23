class ModulesServicesConfigPage{
    DisableSurveys(){
        cy.get('select[name="enable_projecttype_singlesurveyforms"]').select('0');
        cy.get('input[type="submit"][value="Save Changes"]').click();
        cy.contains(' Your system configuration values have now been changed!').should('be.visible');

    }
    EnableSurveys(){
        cy.get('select[name="enable_projecttype_singlesurveyforms"]').select('1');
        cy.get('input[type="submit"][value="Save Changes"]').click();
        cy.contains(' Your system configuration values have now been changed!').should('be.visible');

    }
}
export default new ModulesServicesConfigPage