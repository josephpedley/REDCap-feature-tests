import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes("Unexpected token '<'")) {
    return false;
  }
  if (err.message.includes('POPOVER: Option "title" provided type "undefined"')) {
    return false;
  }
  // Let other errors fail the test
});
