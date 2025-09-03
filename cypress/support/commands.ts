// cypress\support\commands.ts
/// <reference types="cypress" />

import type {} from './commands';

const URL = 'https://norma.nomoreparties.space/api';

Cypress.Commands.add('mockLogin', (): void => {
  cy.intercept('POST', `/login`, { fixture: 'login' }).as('postLogin');
  cy.intercept('GET', `${URL}/auth/user`, { fixture: 'user' }).as('getUser');
  window.localStorage.setItem(
    'refreshToken',
    JSON.stringify('test-refreshToken')
  );
  cy.setCookie('accessToken', 'test-accessToken');
});

Cypress.Commands.add('clearMemory', (): void => {
  cy.clearLocalStorage();
  cy.clearCookies();
});


// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
