class DataQualityRulesPage {
  addNewRule(ruleName, logicEdit) {
    cy.get('#input_rulename_id_0').type(ruleName);
    cy.get('#input_rulelogic_id_0').click();
    cy.wait(1000);

    cy.contains('Logic Editor').should('be.visible');

    cy.window().then((win) => {
      const editor = win.ace.edit('rc-ace-editor');
      editor.setValue(logicEdit, -1);
    });

    cy.contains('button', 'Update & Close Editor').click();
    cy.get('.btn-rcgreen').contains('Add').click();
  }

assertRuleRow(visibleRuleNumber, expectedName, expectedLogic, expectedExecutionValue = null) {
  cy.contains('div.rulenum', visibleRuleNumber)
    .closest('tr')
    .within(() => {
      cy.get('.editname').should('contain.text', expectedName);
      cy.get('.editlogic').should('contain.text', expectedLogic);

      // Grab internal rule ID
      cy.get('[id^="ruleid_"] span').invoke('text').then(ruleId => {
        const ruleExeSelector = `#ruleexe_${ruleId}`;

        cy.get(ruleExeSelector).then($cell => {
          const hasExecuteButton = $cell.find('button:contains("Execute")').length > 0;

          if (hasExecuteButton) {
            expect(expectedExecutionValue).to.be.null;
          } else {
            // Only assert if an expected value is passed
            expect(expectedExecutionValue).to.not.be.null;
            cy.wrap($cell).should('contain.text', expectedExecutionValue.toString());
          }
        });
      });
    });
}


  uploadRuleByCsv(fileName){
    cy.contains('button', 'Upload or download Data Quality Rules').click();
    cy.contains('a', 'Upload Data Quality Rule (CSV)').click()
    cy.get('input[name="file"]').attachFile(fileName);
    cy.get('.ok-button').contains('Upload').click();
    cy.contains('span', 'Upload Data Quality Rule (CSV) - Confirm');
    cy.wait(500)
    cy.get('.ok-button').contains('Upload').click({force:true});
    cy.wait(500)
    cy.contains('span', 'SUCCESS!').should('be.visible');
    cy.get('button.close-button').click()
    cy.contains('Data Quality Rules').should('be.visible')
  }
  executeRules(){
    cy.contains('button.execRuleBtn', 'All').click();
  }
  editExistingRule(ruleLabel, logicEdit){

    cy.get('div.editlogic')
  .contains(ruleLabel)
  .click();
  cy.wait(1000)
     cy.contains('Logic Editor').should('be.visible');

    cy.window().then((win) => {
      const editor = win.ace.edit('rc-ace-editor');
      editor.setValue(logicEdit, -1);
    });

    cy.contains('button', 'Update & Close Editor').click();
    cy.get('div.editlogic').find('button').contains('Save').click()
  }
  DeleteByRuleNumber(visibleRuleNumber) {
  cy.contains('div.rulenum', visibleRuleNumber)
    .closest('tr')
    .within(() => {
      cy.get('img[alt=""]').closest('a').click();
    });
    cy.get('.ok-button').contains('Delete').click();

}
  }


export default new DataQualityRulesPage();
