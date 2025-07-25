class RecordStatusDashboardPage {
  clickBubbleByIndex(recordId, formName, index) {
    cy.get('table#record_status_table tbody tr')
      .contains('td.rc-rsd-id-cell a', recordId)
      .parents('tr')
      .within(() => {
        cy.get('a').filter((i, el) => {
          const href = el.getAttribute('href') || '';
          return href.includes(formName);
        }).eq(index).click();
      });
  }
}

export default new RecordStatusDashboardPage;
