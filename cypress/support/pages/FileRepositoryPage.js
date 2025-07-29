class FileRepositoryPage{
    uploadFile(fileName){
        cy.get('#file-repository-file-input').attachFile(fileName, { force: true }).trigger('change', { force: true });
    }
    assertFileUpload(fileName){
    cy.get('#file-repository-table tbody')
      .contains('td', fileName)
      .should('be.visible')
      .parent('tr')
      .within(() => {
        cy.get('td').eq(1).should('contain.text', fileName);
        cy.get('td').eq(3).invoke('text').should('match', /\d{2}-\d{2}-\d{4} \d{2}:\d{2}/); // e.g. 07-29-2025 14:34
        cy.get('td').eq(4).should('contain.text', 'Uploaded by test_admin.');
      });
        
    }
    clickShareIcon(fileName){
        cy.get('#file-repository-table tbody')
      .contains('td', fileName)
      .should('be.visible')
      .parent('tr')
      .within(() => {
        cy.get('td').eq(5).find('i.fa-arrow-up-from-bracket').click()
      });
    }
}
export default new FileRepositoryPage()