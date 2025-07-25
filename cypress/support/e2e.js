import './commands'


Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes("Unexpected token '<'")) {
    return false;
  }
  if (err.message.includes('POPOVER: Option "title" provided type "undefined"')) {
    return false;
  }

  if (err.message.includes("document.form.submit is not a function")) {
    return false;
  }
   if (err.message.includes(" cannot call methods on button prior to initialization")) {
    return false;
  }
 
  // Let other errors fail the test
});
