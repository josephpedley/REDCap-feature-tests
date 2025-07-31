import './commands'
import 'cypress-mochawesome-reporter/register';


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

  
  // Let other errors fail the test
});
