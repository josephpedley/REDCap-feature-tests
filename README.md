# REDCap Feature Tests

**Automated end-to-end tests for REDCap using Cypress, focused on direct data entry via the survey feature and other UI components.**

---

## Project Structure

- `cypress/e2e/` – Test specs  
- `cypress/support/` – Custom commands and page objects  
- `cypress.config.js` – Cypress configuration  
- `.env` – Environment variables (kept out of source control for security)  

---

## Prerequisites

- Node.js (v14 or above recommended)  
- Git  
- Cypress (installed via npm)  

---

## Setup

1. **Clone the repo:**  
   git clone https://github.com/yourusername/REDCap-feature-tests.git  
   cd REDCap-feature-tests

2. **Install dependencies:**  
   npm install --save-dev cypress-file-upload


3. **Ask me for the `.env` file and put it in the root directory**

---

## Running Tests

- **Open Cypress interactive test runner:**  
  npx cypress open

- **Run all tests headlessly:**  
  npx cypress run
  If you have access to this repo, you can just use the GitHub Actions workflow



---

## Test Highlights

- Automated login for admin and test users  
- Project creation, moving projects to production  
- Direct data entry via the survey feature  
- Page Object Model for clean and maintainable tests  

---

## Notes

Sensitive data is managed via `.env` and never committed.  
This is a project for my internship at Imperial Clinical Trials Unit.
