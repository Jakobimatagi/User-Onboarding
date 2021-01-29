// test ran here
describe('Form app', () => {
   beforeEach(() => {
       cy.visit('http://localhost:3000');
   }); 


const nameInput = () => cy.get('input[name="username"]');
const emailInput = () => cy.get('input[name="email"]');
const passwordInput = () => cy.get('input[name="password"]')
const submitBtn = () => cy.get('button[name="submitBtn"]')
const termsCheck = () => cy.get('input[name="terms"]')

it('username input should take a name', () => {
    nameInput().type('Jakobi');
    nameInput().should('have.value','Jakobi')

});


it('email input takes an email', () => {
    emailInput().type('jkmatagi@hotmail.com');
    emailInput().should('have.value','jkmatagi@hotmail.com')

})

it('password input takes a password', () =>{
    // nameInput().type('Jakobi');
    // emailInput().type('jkmatagi@hotmail.com');
    passwordInput().type('happyguy');
    passwordInput().should('have.value','happyguy');
})

it('terms box is clickable', () => {
    termsCheck().click()
    termsCheck().should('exist')
})

it('user can submit data', () => {
    nameInput().type('Jakobi')
    emailInput().type('jkmatagi@hotmail.com')
    passwordInput().type('howdyparter')
    termsCheck().click();
    submitBtn().click();
})
})