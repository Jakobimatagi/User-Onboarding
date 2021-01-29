// test ran here
describe('Form app', () => {
    cy.visit('https://reqres.in/api/users');
})

const nameInput = () => cy.get('input[name="username"]');
const emailInput = () => cy.get('input[name="email"]');
const passwordInput = () => cy.get('input[name="password"]')
const submitBtn = () => cy.get('#submitBtn')


instanceof('username input should take a name', () => {
    nameInput().type('Jakobi')
})