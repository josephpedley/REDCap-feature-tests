class ReviewDraftedChangesPage{
    clickCompareButton() {
    cy.contains('button', 'Compare').click();
  }
}
export default new ReviewDraftedChangesPage;