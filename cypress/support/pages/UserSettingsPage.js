class UserSettingsPage {
  selectMoveToProductionOption(optionText) {
    cy.get('select[name="superusers_only_move_to_prod"]').select(optionText);
  }

  clickSaveChanges() {
    cy.get('input[type="submit"][value="Save Changes"]').click();
  }

  verifySuccessMessage() {
    cy.get('.yellow')
      .should('be.visible')
      .and('contain.text', 'Your system configuration values have now been changed!');
  }
}

export default new UserSettingsPage();
