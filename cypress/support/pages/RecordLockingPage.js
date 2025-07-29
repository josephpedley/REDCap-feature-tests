class RecordLockingPage{
    assertHeaders(expectedHeaders){
        cy.get('#part11_forms').within(() => {
        cy.get('.labelrc').each(($el, index) => {
            expect($el).to.contain.text(expectedHeaders[index]);
            })
        })
    }
    assertRows(){
        cy.get('#row-text_validation').within(() => {
            cy.get('#dispchk-text_validation').should('be.visible').should('be.checked')
            cy.get('#name-text_validation').contains('Text Validation').should('be.visible')
        })
    }
}
export default new RecordLockingPage()