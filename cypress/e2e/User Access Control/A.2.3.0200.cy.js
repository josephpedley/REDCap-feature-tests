
import ControlCenterPage from '../../support/pages/ControlCenterPage';
import DashboardPage from '../../support/pages/DashboardPage';



describe('Assign administrators and account managers', () => {
    it('Assigns administrators and account managers', () => {
         cy.loginAdmin();
         DashboardPage.goToControlCenter()
         ControlCenterPage.openAdmininstratorPrivileges()
         cy.contains('Set administrator privileges').should('be.visible')
         cy.contains('Administrators').should('be.visible')
         cy.contains('td', 'Test_Admin (Admin Test)').should('be.visible');

         //Test Add administrator account no priveleges
         cy.get('#user_search').type('test_joe', { delay: 100 }).blur()
         cy.wait(1000); // Give REDCap time to validate
         cy.get('#add_admin_btn').click({ force: true })
         cy.get('#add_admin_btn').click({ force: true })
         cy.get('div.simpleDialog.ui-dialog-content.ui-widget-content')
         .contains('check one or more').should('be.visible')
         cy.get('button.close-button').click()

         cy.get('#user_search').clear().type('test_joe', {force:true

         });
         cy.get('#0-admin_rights').check()
         cy.get('#add_admin_btn').click()
         cy.get('h2.swal2-title')
        .should('contain.text', 'The user "test_joe" has now been granted one or more administrator privileges.')

        cy.get('button.swal2-confirm').click()
        cy.contains('Administrators').should('be.visible')
        cy.get('span.fs13.boldish.me-1')
        .contains('test_joe')
        .should('be.visible')

         cy.contains('Log out').click();
         cy.loginTestUser();
         DashboardPage.goToControlCenter()
         ControlCenterPage.openAdmininstratorPrivileges()
         cy.contains('Set administrator privileges').should('be.visible')
         cy.contains('Administrators').should('be.visible')
         cy.contains('td', 'test_joe').should('be.visible');
         cy.get('#80-admin_rights').should('be.checked')

         //Test Modify by Enable Administrator Priveleges
         cy.get('#80-super_user').check().should('be.checked')
         cy.get('#80-account_manager').check().should('be.checked')
         cy.get('#80-access_system_config').check().should('be.checked')
         cy.get('#80-access_system_upgrade').check().should('be.checked')
         cy.get('#80-access_external_module_install').check().should('be.checked')
         cy.get('#80-access_admin_dashboards').check().should('be.checked')
         cy.contains('td', 'test_joe').should('be.visible');

         //Verify 
         cy.get('a.nav-link[href="/redcap_v15.4.2/ControlCenter/index.php"]').click()
         cy.contains('a', 'Administrator Privileges').should('be.visible')
         cy.contains('a', 'Browse Project').should('be.visible')
         cy.contains('a', 'Edit Project Settings').should('be.visible')
         cy.contains('a', 'Add Users').should('be.visible')
         cy.contains('a', 'General Configuration').should('be.visible')
         cy.contains('a', 'User Settings').should('be.visible')

         //Test Disable Administrator Privileges
         cy.contains('a', 'Administrator Privileges').click()
         cy.contains('Set administrator privileges').should('be.visible')
         
         
         
         
        
         cy.get('#80-super_user').uncheck({force: true}).trigger('change', {force: true});
         cy.get('#80-account_manager').uncheck({force: true}).trigger('change', {force: true});
         cy.get('#80-access_system_config').uncheck({force: true}).trigger('change', {force: true});
         cy.get('#80-access_system_upgrade').uncheck({force: true}).trigger('change', {force: true});
         cy.get('#80-access_external_module_install').uncheck({force: true}).trigger('change', {force: true});
         cy.get('#80-access_admin_dashboards').uncheck({force: true}).trigger('change', {force: true});

         cy.get('#80-admin_rights').should('be.checked')
         cy.contains('test_joe').should('be.visible');
         

         cy.contains('Log out').click();

         //Verify
         cy.loginTestUser()
         DashboardPage.goToControlCenter()
         cy.contains('a', 'Administrator Privileges').should('be.visible')
         cy.contains('a', 'Browse Project').should('be.visible')
         cy.contains('a', 'General Configuration').should('be.visible')
         cy.contains('a', 'Edit Project Settings').should('not.exist')
         cy.contains('a', 'Add Users').should('not.exist')

         ControlCenterPage.openUserSettings()
         cy.contains('Because you have restricted admin privileges, this page is read-only, and no settings can be modified').should('be.visible')
         cy.contains('Log out').click()

         cy.loginAdmin()
        DashboardPage.goToControlCenter()
        ControlCenterPage.openAdmininstratorPrivileges()
        cy.get('#80-admin_rights').uncheck({force:true}).trigger('change', ({force:true}))
        cy.contains('button', 'Close').click()
        cy.contains('Set administrator priveleges').should('not.exist')
        cy.contains('test_joe').should('not.be.visible');
        cy.contains('Log out').click()

        cy.loginTestUser()
        cy.contains('Control Center').should('not.exist')










            





    })

})